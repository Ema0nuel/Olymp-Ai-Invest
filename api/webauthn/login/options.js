import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();
    const { userId } = req.body;

    // Get credentials for user
    const { data: creds } = await supabase
        .from('webauthn_credentials')
        .select('credential_id')
        .eq('user_id', userId);

    // Convert credential IDs to base64url for client
    const allowCredentials = (creds || []).map(c => ({
        id: c.credential_id,
        type: 'public-key'
    }));

    const options = generateAuthenticationOptions({
        rpID: 'www.Olymp AI Invest.com',
        userVerification: 'preferred',
        allowCredentials
    });

    // Store challenge
    await supabase.from('webauthn_challenges').insert({
        user_id: userId,
        challenge: options.challenge,
        expires_at: new Date(Date.now() + 5 * 60 * 1000)
    });

    // Convert challenge to base64url for client
    options.challenge = Buffer.from(options.challenge).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    res.status(200).json(options);
};