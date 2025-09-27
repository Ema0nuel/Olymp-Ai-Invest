
import supabase, {
    signUpUser,
    verifyOTP,
} from "../../../utils/supabaseClients";
import { loadPage } from "../../../routes/router";
import Modal from "../../../components/Modal";
import Welcome from "../../../../images/assets/blog/621506e9a1183737fff2f2b8_NFT's & Metaverse.png";
import { sendEmail } from "../../../utils/send-email";
import { registerWebAuthn, isWebAuthnAvailable } from "../../../utils/webAuthnHelper";

const toastify = ({
    text = "",
    background = "bg-brand-blue/10",
    color = "text-white",
    icon = "",
    duration = 5000
}) => {
    // Remove any existing toast
    document.querySelectorAll('.Olymp AI-toast').forEach(t => t.remove())
    const toast = document.createElement("div")
    toast.className = `Olymp AI-toast fixed top-8 right-8 z-[999999] px-6 py-4 rounded-xl 
        shadow-lg flex items-center gap-3 animate-fade-in-up 
        backdrop-blur-md border border-brand-primary/50 
        ${background} ${color} hover:border-brand-primary 
        transition-all duration-300`
    toast.innerHTML = `
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r 
            from-brand-primary/10 to-transparent opacity-50"></div>
        ${icon ? `<i class="${icon} text-2xl relative z-10 text-brand-primary"></i>` : ""}
        <span class="font-semibold relative z-10">${text}</span>
    `
    document.body.appendChild(toast)
    setTimeout(() => {
        toast.classList.add("animate-fade-out-down")
        setTimeout(() => toast.remove(), 500)
    }, duration)
}



export async function createTradingAccounts(userId) {
    try {
        // First check if accounts exist using a single query
        const { data: existingAccounts, error: checkError } = await supabase
            .from("trading_accounts")
            .select("account_type")
            .eq("user_id", userId);

        if (checkError) {
            console.error("Error checking existing accounts:", checkError);
            return false;
        }

        // Create a set of existing account types
        const existingTypes = new Set(existingAccounts?.map(acc => acc.account_type) || []);

        // Prepare accounts to be created
        const accountsToCreate = [];

        // Only add accounts that don't exist
        if (!existingTypes.has("demo")) {
            accountsToCreate.push({
                user_id: userId,
                account_type: "demo",
                balance: 100.0,
                leverage: 100,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
        }

        if (!existingTypes.has("live")) {
            accountsToCreate.push({
                user_id: userId,
                account_type: "live",
                balance: 0.0,
                leverage: 100,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
        }

        // If we have accounts to create, do it in one batch
        if (accountsToCreate.length > 0) {
            const { error: insertError } = await supabase
                .from("trading_accounts")
                .insert(accountsToCreate)
                .select();

            if (insertError) {
                console.error("Error creating accounts:", insertError);
                return false;
            }
        }

        // Return true even if no accounts needed to be created
        // (because existing accounts is still a valid state)
        return true;

    } catch (error) {
        console.error("Error managing trading accounts:", error);
        return false;
    }
}

export async function signupHandler(formData) {
    // Show loading toast instead of spinner
    const loadingToast = toastify({
        text: "Creating your account...",
        background: "bg-brand-primary/10",
        icon: "fas fa-spinner fa-spin",
        duration: 0 // Keep showing until manually closed
    });

    try {
        // Attempt signup
        const { success, error, otp, user } = await signUpUser(formData);

        loadingToast.remove(); // Stop spinner before showing any notifications

        if (!success) {
            toastify({
                text: error,
                icon: "fas fa-exclamation-circle",
                background: "bg-red-800",
                duration: 3000,
            });
            return false;
        }

        // Verify we have an OTP before sending email
        if (!otp) {
            console.error('No OTP received from signUpUser');
            toastify({
                text: "Error generating verification code",
                icon: "fas fa-exclamation-circle",
                background: "bg-red-800",
                duration: 3000,
            });
            return false;
        }

        // Send welcome email with OTP
        try {
            await sendEmail({
                to: formData.email,
                subject: "Welcome to Olymp AI Invest - Verify Your Email",
                html: generateWelcomeEmailTemplate(formData.email, otp),
            });
        } catch (emailError) {
            console.error("Error sending welcome email:", emailError);
            // Continue with signup process even if email fails
        }

        // Create trading accounts
        const accountsCreated = await createTradingAccounts(user.id);
        if (!accountsCreated) {
            toastify({
                text: "Failed to create trading accounts",
                icon: "fas fa-exclamation-circle",
                background: "bg-red-800",
                duration: 3000,
            });
            return false;
        }

        // Show OTP Modal after small delay to ensure clean UI
        await new Promise((resolve) => setTimeout(resolve, 100));
        const verificationResult = await showOTPModal(formData.email, otp);

        if (verificationResult.success) {
            let biometricSetupDone = false;
            if (await isWebAuthnAvailable()) {
                biometricSetupDone = await new Promise((resolve) => {
                    const modal = new Modal({
                        title: "Set Up Biometric Login?",
                        content: /* html */`
                    <div class="space-y-4">
                        <p class="text-gray-400">
                            Would you like to enable biometric login (Face ID, fingerprint, or passkey) for faster and more secure sign-in?
                            <i class="fas fa-fingerprint text-brand-primary/90 ml-1"></i>
                        </p>
                    </div>
                `,
                        actions: [
                            {
                                text: "Enable Biometrics",
                                primary: true,
                                onClick: async (close) => {
                                    close();
                                    const result = await registerWebAuthn(user.id, formData.email);
                                    if (result.success) {
                                        toastify({
                                            text: "Biometric login enabled!",
                                            icon: "fas fa-fingerprint",
                                            background: "bg-green-800"
                                        });
                                        resolve(true);
                                    } else {
                                        toastify({
                                            text: "Biometric setup failed: " + result.error,
                                            icon: "fas fa-exclamation-circle",
                                            background: "bg-red-800"
                                        });
                                        resolve(false);
                                    }
                                }
                            },
                            {
                                text: "Maybe Later",
                                onClick: (close) => {
                                    close();
                                    resolve(false);
                                }
                            }
                        ]
                    });
                    modal.show();
                });
            }

            // Now continue with welcome message and redirect
            await showWelcomeMessage();

            toastify({
                text: "Account created successfully! Redirecting...",
                icon: "fas fa-check-circle",
                background: "bg-green-800",
                duration: 3000,
            });

            await new Promise((resolve) => setTimeout(resolve, 2000));
            await loadPage("login");
            return true;
        } else {
            toastify({
                text: verificationResult.error,
                icon: "fas fa-exclamation-circle",
                background: "bg-red-800",
                duration: 3000,
            });
            return false;
        }
    } catch (error) { // Ensure spinner stops on error
        toastify({
            text: error.message || "An unexpected error occurred",
            icon: "fas fa-exclamation-circle",
            background: "bg-red-800",
            duration: 3000,
        });
        return false;
    }
}

// Update the showWelcomeMessage function timing
async function showWelcomeMessage() {
    const modal = new Modal({
        content: /* html */ `
            <div class="text-center space-y-6 py-8">
                <img src="${Welcome}" alt="Welcome" class="w-64 mx-auto">
                <h2 class="text-2xl font-bold text-white">Welcome to Olymp AI Invest!</h2>
                <p class="text-gray-400">Your account has been created successfully.</p>
            </div>
        `,
        showClose: false,
    });

    modal.show();
    return new Promise((resolve) =>
        setTimeout(() => {
            modal.hide();
            resolve();
        }, 2000)
    ); // Increased to 2 seconds for better visibility
}

// Update OTP modal to handle loading state
async function showOTPModal(email, otp) {
    return new Promise((resolve) => {
        const modal = new Modal({
            title: "Verify Your Email",
            content: /* html */ `
                <div class="space-y-4">
                    <p class="text-gray-400">
                        We've sent a verification code to <strong>${email}</strong>
                    </p>
                    <input type="text" 
                           id="otpInput"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all text-center text-2xl tracking-widest"
                           maxlength="6"
                           placeholder="000000">
                </div>
            `,
            actions: [
                {
                    text: "Verify",
                    primary: true,
                    onClick: async (close) => {
                        const verifyBtn = document.querySelector('[data-action="Verify"]');
                        verifyBtn.disabled = true;
                        verifyBtn.innerHTML =
                            '<i class="fas fa-spinner fa-spin mr-2"></i> Verifying...';

                        const code = document.getElementById("otpInput").value;
                        const result = await verifyOTP(email, code);

                        if (result.success) {
                            close();
                            resolve({ success: true });
                        } else {
                            verifyBtn.disabled = false;
                            verifyBtn.innerHTML = "Verify";
                            toastify({
                                text: result.error,
                                icon: "fas fa-exclamation-circle",
                                background: "bg-red-800",
                                duration: 3000,
                            });
                        }
                    },
                },
            ],
        });

        modal.show();
        // Auto-focus OTP input
        setTimeout(() => document.getElementById("otpInput").focus(), 100);
    });
}

// Add this function after the imports
export function generateWelcomeEmailTemplate(userEmail, otpCode) {
    return /* html */ `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Olymp AI Invest</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center" style="padding: 40px 0;">
                        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <!-- Header -->
                            <tr>
                                <td align="center" style="padding: 40px 0;">
                                    <img src="https://www.Olymp AI Invest.com/assets/logo-Dw35zzZI.ico" alt="Olymp AI Invest Logo" width="150" style="display: block;">
                                </td>
                            </tr>
                            
                            <!-- Welcome Message -->
                            <tr>
                                <td style="padding: 0 40px;">
                                    <h1 style="color: #333; font-size: 24px; margin: 0 0 20px; text-align: center;">Welcome to Olymp AI Invest!</h1>
                                    <p style="color: #666; font-size: 16px; line-height: 24px; margin: 0 0 20px;">
                                        Thank you for choosing Olymp AI Invest. We're excited to have you join our trading community!
                                    </p>
                                </td>
                            </tr>

                            <!-- OTP Section -->
                            <tr>
                                <td style="padding: 30px 40px;">
                                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                                        <tr>
                                            <td align="center">
                                                <p style="color: #666; font-size: 16px; margin: 0 0 15px;">Your verification code is:</p>
                                                <p style="background-color: #e9ecef; color: #333; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 0; padding: 15px 25px; border-radius: 4px;">
                                                    ${otpCode}
                                                </p>
                                                <p style="color: #999; font-size: 14px; margin: 15px 0 0;">
                                                    This code will expire in 10 minutes
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Security Notice -->
                            <tr>
                                <td style="padding: 0 40px 30px;">
                                    <p style="color: #666; font-size: 14px; line-height: 21px; margin: 0;">
                                        For security reasons, please do not share this code with anyone. If you didn't request this code, please ignore this email.
                                    </p>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f8f9fa; padding: 30px 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                                    <p style="color: #999; font-size: 14px; margin: 0; text-align: center;">
                                        &copy; ${new Date().getFullYear()} Olymp AI Invest. All rights reserved.<br>
                                        <a href="https://Olymp AI Invest.com" style="color: #f1d416; text-decoration: underline;">Olymp AI Invest</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
}

export async function signInWithGoogle() {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                skipBrowserRedirect: true
            }
        });

        if (error) throw error;

        // Open popup with proper attributes
        const authWindow = window.open(
            data?.url,
            'Olymp AI Google Login',
            'width=500,height=600,left=' +
            (window.screen.width / 2 - 250) +
            ',top=' + (window.screen.height / 2 - 300) +
            ',noopener,noreferrer'
        );

        // Use broadcast channel for cross-window communication
        const channel = new BroadcastChannel('auth');

        const checkAuth = setInterval(async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.access_token) {
                    clearInterval(checkAuth);
                    channel.postMessage('auth_complete');
                    if (authWindow) {
                        try {
                            authWindow.close();
                        } catch (e) {
                            console.log('Window close blocked - expected');
                        }
                    }
                    channel.close();
                }
            } catch (error) {
                console.error('Auth check error:', error);
            }
        }, 1000);

        return { success: true };
    } catch (error) {
        console.error('Google sign-in error:', error);
        return { success: false, error };
    }
}

async function handleGoogleUser(user) {
    if (!user) return;

    try {

        // Create new profile with upsert
        const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || '',
                avatar_url: user.user_metadata?.avatar_url || '',
                is_verified: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'id',
                returning: 'minimal'
            });

        if (profileError) throw profileError;

        // Create trading accounts without using toast
        try {
            // Create demo account
            await supabase
                .from("trading_accounts")
                .insert({
                    user_id: user.id,
                    account_type: "demo",
                    balance: 100.0,
                    leverage: 100,
                });

            // Create live account
            await supabase
                .from("trading_accounts")
                .insert({
                    user_id: user.id,
                    account_type: "live",
                    balance: 0.0,
                    leverage: 100,
                });

        } catch (accountError) {
            console.error("Error creating trading accounts:", accountError);
        }

        // Clear any URL fragments
        if (window.location.hash) {
            window.history.pushState('', document.title, window.location.pathname);
        }

        // Redirect to dashboard
        loadPage('dashboard');

    } catch (error) {
        console.error('Error handling Google user:', error);
    }
}

// Update the auth state listener
supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
        await handleGoogleUser(session.user);
    }
});


// Add this new function
export async function handleGoogleLogin() {
    try {
        toastify({
            text: "Connecting to Google...",
            background: "bg-brand-primary/10",
            icon: "fas fa-spinner fa-spin"
        });

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                skipBrowserRedirect: true
            }
        });

        if (error) throw error;

        // Open popup with proper attributes
        const authWindow = window.open(
            data?.url,
            'Olymp AI Google Login',
            'width=500,height=600,left=' +
            (window.screen.width / 2 - 250) +
            ',top=' + (window.screen.height / 2 - 300) +
            ',noopener,noreferrer'
        );

        // Check auth state periodically
        const checkAuth = setInterval(async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.access_token) {
                    clearInterval(checkAuth);
                    if (authWindow) {
                        try {
                            authWindow.close();
                        } catch (e) {
                            console.log('Window close blocked - expected');
                        }
                    }

                    // Check if user exists
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (profile) {
                        // Existing user - redirect to dashboard
                        toastify({
                            text: "Successfully signed in",
                            background: "bg-green-500/10",
                            icon: "fas fa-check-circle"
                        });
                        loadPage('dashboard');
                    } else {
                        // New user - need to create profile first
                        toastify({
                            text: "Please complete registration",
                            background: "bg-yellow-500/10",
                            icon: "fas fa-exclamation-circle"
                        });
                        // Redirect to signup with Google data
                        loadPage('signup');
                    }
                }
            } catch (error) {
                console.error('Auth check error:', error);
                toastify({
                    text: "Login failed",
                    background: "bg-red-500/10",
                    icon: "fas fa-exclamation-circle"
                });
            }
        }, 1000);

        return { success: true };
    } catch (error) {
        console.error('Google login error:', error);
        toastify({
            text: "Failed to connect with Google",
            background: "bg-red-500/10",
            icon: "fas fa-exclamation-circle"
        });
        return { success: false, error };
    }
}