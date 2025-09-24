import { generateRegistrationOptions } from '@simplewebauthn/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { userId, email } = req.body;

        if (!userId || !email) {
            return res.status(400).json({
                error: 'Missing required fields',
                details: 'userId and email are required'
            });
        }

        // Create service role client for bypassing RLS
        const serviceClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY // Add this to your Vercel env vars
        );

        // Use www.Olymp AI Invest.com as rpID
        const rpID = 'www.Olymp AI Invest.com';

        // Convert userId to Uint8Array
        const userIdBuffer = new TextEncoder().encode(userId);

        const options = await generateRegistrationOptions({
            rpName: 'Olymp AI Invest',
            rpID: rpID,
            userID: new TextEncoder().encode(userId),
            userName: email,
            timeout: 300000, // 5 minutes in milliseconds
            attestationType: 'none',
            authenticatorSelection: {
                authenticatorAttachment: 'platform',
                userVerification: 'preferred',
                residentKey: 'preferred',
            }
        });

        // Store challenge with longer expiry
        const { error: dbError } = await serviceClient
            .from('webauthn_challenges')
            .insert({
                user_id: userId,
                challenge: options.challenge,
                expires_at: new Date(Date.now() + 300000) // 5 minutes
            });

        if (dbError) {
            console.error('Database error:', dbError);
            throw dbError;
        }

        // Prepare options for client
        const publicKeyOptions = {
            ...options,
            challenge: Buffer.from(options.challenge).toString('base64'),
            user: {
                ...options.user,
                id: Buffer.from(userIdBuffer).toString('base64')  // Convert Uint8Array to base64
            }
        };

        return res.status(200).json(publicKeyOptions);

    } catch (error) {
        console.error('Registration options error:', error);
        return res.status(500).json({
            error: 'Failed to generate registration options',
            details: error.message
        });
    }
}