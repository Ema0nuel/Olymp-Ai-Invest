import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

/**
 * Register a new WebAuthn credential for the user.
 * @param {string} userId - The user's Supabase user ID.
 * @param {string} email - The user's email (for display).
 * @returns {Promise<{success: boolean, error?: string}>}
 */
function bufferToBase64Url(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function registerWebAuthn(userId, email) {
    try {
        console.log('Starting WebAuthn registration for:', { userId, email });

        const optionsRes = await fetch('/api/webauthn/register/options', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, email })
        });

        if (!optionsRes.ok) {
            const err = await optionsRes.text();
            throw new Error('Failed to get registration options: ' + err);
        }

        const options = await optionsRes.json();

        if (!options || !options.challenge) {
            console.error('Invalid options received:', options);
            throw new Error('Server did not return valid registration options');
        }

        console.log('Creating credential with options:', {
            rpName: options.rp.name,
            rpID: options.rp.id,
            userID: email
        });

        const credential = await navigator.credentials.create({
            publicKey: {
                ...options,
                challenge: Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0)),
                user: {
                    ...options.user,
                    id: Uint8Array.from(atob(options.user.id), c => c.charCodeAt(0))
                }
            }
        });

        const payload = {
            id: credential.id,
            rawId: bufferToBase64Url(credential.rawId),
            response: {
                clientDataJSON: bufferToBase64Url(credential.response.clientDataJSON),
                attestationObject: bufferToBase64Url(credential.response.attestationObject)
            },
            type: credential.type
        };

        console.log('Sending credential for verification:', {
            credentialId: payload.id,
            hasRawId: !!payload.rawId,
            hasClientData: !!payload.response.clientDataJSON,
            hasAttestation: !!payload.response.attestationObject
        });

        const verifyRes = await fetch('/api/webauthn/register/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                credential: payload
            })
        });

        if (!verifyRes.ok) {
            const errorText = await verifyRes.text();
            console.error('Verification response error:', errorText);
            throw new Error('Failed to verify registration: ' + errorText);
        }

        const verifyData = await verifyRes.json();
        return { success: verifyData.verified };

    } catch (error) {
        console.error('WebAuthn registration error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Helper functions for encoding/decoding
function bufferToBase64url(buffer) {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Authenticate a user with WebAuthn.
 * @param {string} userId - The user's Supabase user ID.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function loginWebAuthn(userId) {
    try {
        // 1. Get authentication options from server
        const optionsRes = await fetch('/api/webauthn/login/options', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });
        if (!optionsRes.ok) throw new Error('Failed to get authentication options');
        const options = await optionsRes.json();

        // 2. Get assertion from browser
        const assertion = await startAuthentication(options);

        // 3. Send assertion to server for verification
        const verifyRes = await fetch('/api/webauthn/login/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, credential: assertion })
        });
        if (!verifyRes.ok) throw new Error('Failed to verify authentication');
        const verifyData = await verifyRes.json();

        return { success: verifyData.verified };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Check if WebAuthn is supported in the current browser.
 * @returns {Promise<boolean>}
 */
export async function isWebAuthnAvailable() {
    if (!window.PublicKeyCredential) return false;
    try {
        return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
        return false;
    }
}