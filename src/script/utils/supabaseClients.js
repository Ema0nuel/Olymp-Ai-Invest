import { createClient as supabaseCreate } from "@supabase/supabase-js";

const supabaseUrl = "https://ezdabfeiajfpzyoqiqcc.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6ZGFiZmVpYWpmcHp5b3FpcWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MjE3MzAsImV4cCI6MjA3NDI5NzczMH0.UxJ32Fps3FVi74s_5mE4UCCZ6Xh1pWBmsVZuAntghj0";

const supabase = supabaseCreate(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
    headers: {
        "Content-Type": "application/json",
        Prefer: "return=minimal",
    },
});

export async function signUpUser({
    email,
    password,
    fullname,
    phone,
    country,
}) {
    try {
        // Sign up the user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) throw authError;

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Create profile with OTP
        const { error: profileError } = await supabase.from("profiles").upsert({
            id: authData.user.id,
            email,
            full_name: fullname,
            phone_number: phone,
            country,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            verification_code: otp,
            verification_expiry: expiryTime,
        }, {
            onConflict: 'id',
            returning: 'minimal'  // Don't return the row
        });

        if (profileError) throw profileError;

        return { success: true, otp: otp, user: authData.user, error: null };
    } catch (error) {
        return { success: false, error: error.message, user: null, otp: null };
    }
}

export async function verifyOTP(email, code) {
    try {
        const { data, error } = await supabase
            .from("profiles")
            .select("verification_code, verification_expiry")
            .eq("email", email)
            .single();

        if (error) throw error;

        if (!data) throw new Error("User not found");

        if (new Date() > new Date(data.verification_expiry)) {
            throw new Error("OTP has expired");
        }

        if (data.verification_code !== code) {
            throw new Error("Invalid OTP");
        }

        // Update verification status
        const { error: updateError } = await supabase
            .from("profiles")
            .update({
                is_verified: true,
                verification_code: null,
                verification_expiry: null,
            })
            .eq("email", email);

        if (updateError) throw updateError;

        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Add a connection test function
export async function testConnection() {
    try {
        const { data, error } = await supabase
            .from("profiles")
            .select("count")
            .limit(1);
        if (error) throw error;
        console.log("Supabase connection successful");
        return true;
    } catch (error) {
        console.error("Supabase connection error:", error);
        return false;
    }
}

export default supabase;
