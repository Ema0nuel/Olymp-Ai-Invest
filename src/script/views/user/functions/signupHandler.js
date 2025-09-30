import supabase from "../../../utils/supabaseClients";
import { loadPage } from "../../../routes/router";
import Modal from "../../../components/Modal";
import Welcome from "../../../../images/assets/blog/621506e9a1183737fff2f2b8_NFT's & Metaverse.png";
import { sendEmail } from "../../../utils/send-email";
import { registerWebAuthn, isWebAuthnAvailable } from "../../../utils/webAuthnHelper";

// Toast notification utility
const toastify = ({
    text = "",
    background = "bg-brand-blue/10",
    color = "text-white",
    icon = "",
    duration = 5000
}) => {
    // Remove existing toasts
    document.querySelectorAll('.olymp-toast').forEach(t => t.remove());

    const toast = document.createElement("div");
    toast.className = `olymp-toast fixed top-8 right-8 z-[999999] px-6 py-4 rounded-xl 
        shadow-lg flex items-center gap-3 animate-fade-in-up 
        backdrop-blur-md border border-brand-primary/50 
        ${background} ${color} hover:border-brand-primary 
        transition-all duration-300`;

    toast.innerHTML = `
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r 
            from-brand-primary/10 to-transparent opacity-50"></div>
        ${icon ? `<i class="${icon} text-2xl relative z-10 text-brand-primary"></i>` : ""}
        <span class="font-semibold relative z-10">${text}</span>
    `;

    document.body.appendChild(toast);

    if (duration > 0) {
        setTimeout(() => {
            toast.classList.add("animate-fade-out-down");
            setTimeout(() => toast.remove(), 500);
        }, duration);
    }

    return toast;
};

// Trading accounts creation with conflict prevention
export async function createTradingAccounts(userId) {
    try {
        const { data: existingAccounts, error: checkError } = await supabase
            .from("trading_accounts")
            .select("account_type")
            .eq("user_id", userId);

        if (checkError) throw checkError;

        const existingTypes = new Set(existingAccounts?.map(acc => acc.account_type) || []);
        const accountsToCreate = [];

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

        if (accountsToCreate.length > 0) {
            const { error: insertError } = await supabase
                .from("trading_accounts")
                .insert(accountsToCreate);

            if (insertError) throw insertError;
        }

        return true;
    } catch (error) {
        console.error("Trading accounts error:", error);
        return false;
    }
}

// Email/Password signup handler
export async function signupHandler(formData) {
    const loadingToast = toastify({
        text: "Creating your account...",
        background: "bg-brand-primary/10",
        icon: "fas fa-spinner fa-spin",
        duration: 0
    });

    try {
        // Check existing user
        const { data: existingUser } = await supabase
            .from("profiles")
            .select("auth_type")
            .eq("email", formData.email)
            .single();

        if (existingUser) {
            loadingToast.remove();
            toastify({
                text: existingUser.auth_type === 'google'
                    ? "This email is registered with Google. Please use Google Sign In."
                    : "This email is already registered. Please sign in instead.",
                icon: "fas fa-exclamation-circle",
                background: "bg-red-800",
                duration: 3000
            });
            return false;
        }

        // Sign up new user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password
        });

        if (authError) throw authError;

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Create profile
        const { error: profileError } = await supabase
            .from("profiles")
            .insert({
                id: authData.user.id,
                email: formData.email,
                full_name: formData.fullName || '',
                phone_number: formData.phone || '',
                country: formData.country || '',
                auth_type: 'email',
                verification_code: otp,
                verification_expiry: otpExpiry,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

        if (profileError) throw profileError;

        // Send welcome email with OTP
        try {
            await sendEmail({
                to: formData.email,
                subject: "Welcome to Olymp AI Invest - Verify Your Email",
                html: generateWelcomeEmailTemplate(formData.email, otp)
            });
        } catch (emailError) {
            console.error("Email error:", emailError);
        }

        loadingToast.remove();

        // Show OTP verification modal
        const verificationResult = await showOTPModal(formData.email, otp);

        if (!verificationResult.success) {
            toastify({
                text: verificationResult.error || "Verification failed",
                icon: "fas fa-exclamation-circle",
                background: "bg-red-800",
                duration: 3000
            });
            return false;
        }

        // Create trading accounts
        const accountsCreated = await createTradingAccounts(authData.user.id);
        if (!accountsCreated) {
            toastify({
                text: "Warning: Trading accounts setup incomplete",
                icon: "fas fa-exclamation-triangle",
                background: "bg-yellow-800",
                duration: 3000
            });
        }

        // Optional: Biometric setup
        if (await isWebAuthnAvailable()) {
            const biometricSetup = await new Promise(resolve => {
                const modal = new Modal({
                    title: "Enable Biometric Login",
                    content: `
                        <div class="space-y-4">
                            <p class="text-gray-400">
                                Would you like to enable biometric login for faster and more secure access?
                            </p>
                        </div>
                    `,
                    actions: [
                        {
                            text: "Enable",
                            primary: true,
                            onClick: async (close) => {
                                close();
                                const result = await registerWebAuthn(authData.user.id, formData.email);
                                resolve(result.success);
                            }
                        },
                        {
                            text: "Skip",
                            onClick: (close) => {
                                close();
                                resolve(false);
                            }
                        }
                    ]
                });
                modal.show();
            });

            if (biometricSetup) {
                toastify({
                    text: "Biometric login enabled",
                    icon: "fas fa-fingerprint",
                    background: "bg-green-800",
                    duration: 3000
                });
            }
        }

        // Show welcome message
        await showWelcomeMessage();

        toastify({
            text: "Account created successfully! Redirecting...",
            icon: "fas fa-check-circle",
            background: "bg-green-800",
            duration: 3000
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        await loadPage("login");
        return true;

    } catch (error) {
        loadingToast.remove();
        toastify({
            text: error.message || "Failed to create account",
            icon: "fas fa-exclamation-circle",
            background: "bg-red-800",
            duration: 3000
        });
        return false;
    }
}

// Google sign-in handler
export async function handleGoogleLogin() {
    const loadingToast = toastify({
        text: "Connecting to Google...",
        background: "bg-brand-primary/10",
        icon: "fas fa-spinner fa-spin",
        duration: 0
    });

    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent'
                },
                skipBrowserRedirect: true
            }
        });

        if (error) throw error;

        const authWindow = window.open(
            data?.url,
            'Olymp AI Google Login',
            `width=500,height=600,left=${window.screen.width / 2 - 250},top=${window.screen.height / 2 - 300}`
        );

        const checkAuth = setInterval(async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.access_token) {
                    clearInterval(checkAuth);
                    loadingToast.remove();
                    if (authWindow) authWindow.close();

                    // Check/create profile
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (!profile) {
                        // Create new profile
                        const { error: profileError } = await supabase
                            .from('profiles')
                            .insert({
                                id: session.user.id,
                                email: session.user.email,
                                full_name: session.user.user_metadata?.full_name || '',
                                auth_type: 'google',
                                is_verified: true,
                                created_at: new Date().toISOString(),
                                updated_at: new Date().toISOString()
                            });

                        if (profileError) throw profileError;

                        // Create trading accounts for new user
                        await createTradingAccounts(session.user.id);
                        await showWelcomeMessage();
                    }

                    toastify({
                        text: profile ? "Signed in successfully!" : "Account created successfully!",
                        icon: "fas fa-check-circle",
                        background: "bg-green-800",
                        duration: 3000
                    });

                    await loadPage('dashboard');
                }
            } catch (error) {
                clearInterval(checkAuth);
                loadingToast.remove();
                console.error('Auth error:', error);
                toastify({
                    text: error.message || "Authentication failed",
                    icon: "fas fa-exclamation-circle",
                    background: "bg-red-800",
                    duration: 3000
                });
            }
        }, 1000);

    } catch (error) {
        loadingToast.remove();
        toastify({
            text: error.message || "Failed to connect with Google",
            icon: "fas fa-exclamation-circle",
            background: "bg-red-800",
            duration: 3000
        });
    }
}

// Welcome message modal
async function showWelcomeMessage() {
    return new Promise(resolve => {
        const modal = new Modal({
            content: `
                <div class="text-center space-y-6 py-8">
                    <img src="${Welcome}" alt="Welcome" class="w-64 mx-auto">
                    <h2 class="text-2xl font-bold text-white">Welcome to Olymp AI Invest!</h2>
                    <p class="text-gray-400">Your account has been created successfully.</p>
                </div>
            `,
            showClose: false
        });
        modal.show();
        setTimeout(() => {
            modal.hide();
            resolve();
        }, 2000);
    });
}

// OTP verification modal
async function showOTPModal(email, otp) {
    return new Promise(resolve => {
        const modal = new Modal({
            title: "Verify Your Email",
            content: `
                <div class="space-y-4">
                    <p class="text-gray-400">
                        Please enter the verification code sent to <strong>${email}</strong>
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
                        verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Verifying...';

                        const code = document.getElementById("otpInput").value;

                        // Verify OTP
                        const { data: profile, error } = await supabase
                            .from('profiles')
                            .select('verification_code, verification_expiry')
                            .eq('email', email)
                            .single();

                        if (error || !profile) {
                            verifyBtn.disabled = false;
                            verifyBtn.innerHTML = "Verify";
                            resolve({ success: false, error: "Verification failed" });
                            return;
                        }

                        if (profile.verification_code !== code) {
                            verifyBtn.disabled = false;
                            verifyBtn.innerHTML = "Verify";
                            resolve({ success: false, error: "Invalid verification code" });
                            return;
                        }

                        if (new Date(profile.verification_expiry) < new Date()) {
                            verifyBtn.disabled = false;
                            verifyBtn.innerHTML = "Verify";
                            resolve({ success: false, error: "Verification code expired" });
                            return;
                        }

                        // Mark as verified
                        const { error: updateError } = await supabase
                            .from('profiles')
                            .update({
                                is_verified: true,
                                verification_code: null,
                                verification_expiry: null,
                                updated_at: new Date().toISOString()
                            })
                            .eq('email', email);

                        if (updateError) {
                            verifyBtn.disabled = false;
                            verifyBtn.innerHTML = "Verify";
                            resolve({ success: false, error: "Failed to verify account" });
                            return;
                        }

                        close();
                        resolve({ success: true });
                    }
                }
            ]
        });

        modal.show();
        setTimeout(() => document.getElementById("otpInput")?.focus(), 100);
    });
}

// Generate welcome email template
export function generateWelcomeEmailTemplate(email, otp) {
    return /* html */`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Welcome to Olymp AI Invest</title>
        </head>
        <body style="margin:0;padding:40px 0;background:#f4f4f4;font-family:Arial,sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <table width="600" border="0" cellspacing="0" cellpadding="0" 
                               style="background:#ffffff;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
                            <tr>
                                <td align="center" style="padding:40px 0;">
                                    <img src="https://olymp-ai-invest.com/logo.png" alt="Logo" width="150">
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0 40px;">
                                    <h1 style="color:#333;font-size:24px;margin:0 0 20px;text-align:center;">
                                        Welcome to Olymp AI Invest!
                                    </h1>
                                    <p style="color:#666;font-size:16px;line-height:24px;margin:0 0 20px;">
                                        Thank you for choosing Olymp AI Invest. Please verify your email to get started.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:30px 40px;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
                                           style="background:#f8f9fa;border-radius:8px;padding:20px;">
                                        <tr>
                                            <td align="center">
                                                <p style="color:#666;font-size:16px;margin:0 0 15px;">
                                                    Your verification code is:
                                                </p>
                                                <p style="background:#e9ecef;color:#333;font-size:32px;font-weight:bold;
                                                          letter-spacing:8px;margin:0;padding:15px 25px;border-radius:4px;">
                                                    ${otp}
                                                </p>
                                                <p style="color:#999;font-size:14px;margin:15px 0 0;">
                                                    This code will expire in 10 minutes
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0 40px 30px;">
                                    <p style="color:#666;font-size:14px;line-height:21px;margin:0;">
                                        If you didn't request this code, please ignore this email.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background:#f8f9fa;padding:30px 40px;border-radius:0 0 8px 8px;">
                                    <p style="color:#999;font-size:14px;margin:0;text-align:center;">
                                        &copy; ${new Date().getFullYear()} Olymp AI Invest. All rights reserved.
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