import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function base64UrlToBuffer(base64url) {
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const pad = '='.repeat((4 - (base64.length % 4)) % 4);
    const binary = atob(base64 + pad);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) buffer[i] = binary.charCodeAt(i);
    return buffer.buffer;
}

export default async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();
    const { userId, credential } = req.body;

    // Get challenge
    const { data: challengeRow } = await supabase
        .from('webauthn_challenges')
        .select('challenge,expires_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (!challengeRow || new Date() > new Date(challengeRow.expires_at)) {
        return res.status(400).json({ error: 'Challenge expired' });
    }

    // Get credential
    const { data: credRow } = await supabase
        .from('webauthn_credentials')
        .select('*')
        .eq('user_id', userId)
        .single();

    // Normalize credential for verification
    const normalizedCredential = {
        id: credential.id,
        type: credential.type,
        rawId: base64UrlToBuffer(credential.rawId),
        response: {
            clientDataJSON: base64UrlToBuffer(credential.response.clientDataJSON),
            authenticatorData: base64UrlToBuffer(credential.response.authenticatorData),
            signature: base64UrlToBuffer(credential.response.signature),
            userHandle: credential.response.userHandle
                ? base64UrlToBuffer(credential.response.userHandle)
                : undefined
        }
    };

    const verification = await verifyAuthenticationResponse({
        response: normalizedCredential,
        expectedChallenge: challengeRow.challenge,
        expectedOrigin: 'https://www.Olymp AI Invest.com',
        expectedRPID: 'www.Olymp AI Invest.com',
        authenticator: {
            credentialID: base64UrlToBuffer(credRow.credential_id),
            credentialPublicKey: Buffer.from(credRow.public_key, 'base64'),
            counter: credRow.counter
        }
    });

    if (!verification.verified) return res.status(400).json({ error: 'Verification failed' });

    // Update counter
    await supabase.from('webauthn_credentials')
        .update({ counter: verification.authenticationInfo.newCounter })
        .eq('user_id', userId);

    res.status(200).json({ verified: true });
};