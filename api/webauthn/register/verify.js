import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { createClient } from '@supabase/supabase-js';

const serviceClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

function base64UrlToBuffer(base64url) {
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const pad = '='.repeat((4 - (base64.length % 4)) % 4);
    const binary = atob(base64 + pad);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) buffer[i] = binary.charCodeAt(i);
    return buffer.buffer;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { userId, credential } = req.body;

        // Get challenge
        const { data: challengeData, error: challengeError } = await serviceClient
            .from('webauthn_challenges')
            .select('challenge, expires_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (challengeError || !challengeData)
            return res.status(400).json({ error: 'Challenge not found' });

        if (new Date() > new Date(challengeData.expires_at))
            return res.status(400).json({ error: 'Challenge expired' });

        // Normalize credential
        const normalizedCredential = {
            id: credential.id,
            type: credential.type,
            rawId: base64UrlToBuffer(credential.rawId),
            response: {
                clientDataJSON: base64UrlToBuffer(credential.response.clientDataJSON),
                attestationObject: base64UrlToBuffer(credential.response.attestationObject)
            }
        };

        const verification = await verifyRegistrationResponse({
            response: normalizedCredential,
            expectedChallenge: challengeData.challenge,
            expectedOrigin: 'https://www.Olymp AI Invest.com',
            expectedRPID: 'www.Olymp AI Invest.com'
        });

        if (verification.verified) {
            const { error: credError } = await serviceClient
                .from('webauthn_credentials')
                .insert({
                    user_id: userId,
                    credential_id: credential.rawId, // Store as base64url string
                    public_key: Buffer.from(verification.registrationInfo.credentialPublicKey).toString('base64'),
                    counter: verification.registrationInfo.counter
                });

            if (credError)
                return res.status(500).json({ error: 'Failed to store credential' });

            await serviceClient
                .from('webauthn_challenges')
                .delete()
                .eq('user_id', userId);

            return res.status(200).json({ verified: true });
        }

        return res.status(400).json({ error: 'Verification failed' });
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to verify registration',
            details: error.message
        });
    }
}