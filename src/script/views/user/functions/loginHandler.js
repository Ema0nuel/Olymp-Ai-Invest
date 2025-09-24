import spinner from '../../../utils/spinner'
import toastify from '../../../components/toastify'
import supabase from '../../../utils/supabaseClients'
import { loadPage } from '../../../routes/router'
import { handleTradeSession } from '../components/handleTrade';
import { loginWebAuthn, isWebAuthnAvailable } from "../../../utils/webAuthnHelper";

export async function loginHandler({ email, password }) {
    try {
        spinner.start()

        // Clear any existing sessions - with better error handling
        if (handleTradeSession.session) {
            try {
                await handleTradeSession.endSession('login');
            } catch (sessionError) {
                console.warn('Session end error:', sessionError);
                // Clear session manually if endSession fails
                handleTradeSession.session = null;
            }
        }

        // Always clear storage regardless of session status
        localStorage.removeItem('activeTradeSession');
        Object.keys(localStorage)
            .filter(key => key.startsWith('userBalance_'))
            .forEach(key => localStorage.removeItem(key));


        // If no email/password, try biometric login
        if ((!email || !password) && await isWebAuthnAvailable()) {
            // Prompt for email if not present
            let userId = null;
            if (!email) {
                // You may want to show a modal to ask for email, then fetch userId from Supabase
                toastify({
                    text: "Please enter your email for biometric login",
                    icon: "fas fa-exclamation-circle",
                    background: "bg-yellow-500"
                });
                spinner.stop();
                return false;
            }
            // Fetch userId from Supabase by email
            const { data: user, error } = await supabase
                .from('auth.users')
                .select('id')
                .eq('email', email)
                .single();
            if (error || !user) {
                spinner.stop();
                toastify({
                    text: "User not found for biometric login",
                    icon: "fas fa-exclamation-circle",
                    background: "bg-red-500"
                });
                return false;
            }
            userId = user.id;

            // Try biometric login
            const result = await loginWebAuthn(userId);
            spinner.stop();
            if (result.success) {
                toastify({
                    text: "Biometric login successful! Redirecting...",
                    icon: "fas fa-fingerprint",
                    background: "bg-green-500/10"
                });
                await loadPage('dashboard');
                return true;
            } else {
                toastify({
                    text: "Biometric login failed: " + result.error,
                    icon: "fas fa-exclamation-circle",
                    background: "bg-red-500"
                });
                return false;
            }
        }


        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) throw error

        // Get user profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single()

        if (profileError) throw profileError

        // Verify if user is verified
        if (!profile.is_verified) {
            spinner.stop()
            toastify({
                text: "Please verify your email first",
                icon: "fas fa-exclamation-circle",
                background: "bg-yellow-500",
                duration: 3000
            })

        }
        // Update last login timestamp for all user's trading accounts
        const { error: updateError } = await supabase
            .from('trading_accounts')
            .update({ last_login: new Date().toISOString() })
            .eq('user_id', data.user.id)

        if (updateError) {
            console.error('Error updating last login:', updateError)
            // Continue with login process despite error
        }

        spinner.stop()
        toastify({
            text: "Welcome back! Redirecting to dashboard...",
            icon: "fas fa-check-circle",
            background: "bg-green-500/10",
            duration: 2000
        })

        // Small delay for toast to be visible
        await new Promise(resolve => setTimeout(resolve, 1000))
        await loadPage('dashboard')
        return true

    } catch (error) {
        spinner.stop()
        toastify({
            text: error.message === 'Invalid login credentials'
                ? "Invalid email or password"
                : "An error occurred during login",
            icon: "fas fa-exclamation-circle",
            background: "bg-red-500",
            duration: 3000
        })
        return false
    }
}

export async function logoutHandler() {
    try {
        spinner.start();

        // Clear any active trading sessions
        if (handleTradeSession.session) {
            try {
                await handleTradeSession.endSession('logout');
            } catch (sessionError) {
                console.warn('Error ending trade session:', sessionError);
                // Continue with logout even if session end fails
            }
        }

        // Clear all storage regardless of session end success
        localStorage.removeItem('activeTradeSession');

        // Clear all user-related data from localStorage
        Object.keys(localStorage)
            .filter(key => key.startsWith('userBalance_') || key.startsWith('user'))
            .forEach(key => localStorage.removeItem(key));

        // Sign out from Supabase
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        spinner.stop();
        toastify({
            text: 'Logged out successfully',
            background: 'bg-green-500',
            duration: 2000
        });

        await loadPage('login');
        return true;

    } catch (error) {
        console.error('Logout error:', error);
        spinner.stop();

        // Ensure user is redirected to login even on error
        await loadPage('login');

        toastify({
            text: 'Error during logout, please refresh the page',
            background: 'bg-red-500',
            duration: 3000
        });
        return false;
    }
}