import CryptoJS from 'crypto-js';
import toastify from '../../../components/toastify';
import { loadPage } from '../../../routes/router';

const ADMIN_EMAIL = 'olympaiinvest@gmail.com';
const ADMIN_HASH = '23a0f5670db762e769016f5f7e3eebe5780bccc6fc035c468e3efc910d11bc4d';
const SESSION_KEY = 'OlYMP_AI_ADMIN_SECRET';

export async function adminLoginHandler(formData) {
    try {
        await new Promise(resolve => setTimeout(resolve, 800));

        const inputEmail = formData.email?.trim().toLowerCase();
        const inputPassword = formData.password || '';
        const inputHash = CryptoJS.SHA256(inputPassword.trim()).toString();

        if (inputEmail !== ADMIN_EMAIL || inputHash !== ADMIN_HASH) {
            throw new Error('Invalid credentials');
        }

        const sessionToken = CryptoJS.SHA256(Date.now() + Math.random().toString()).toString();
        const adminSession = {
            token: sessionToken,
            timestamp: Date.now(),
            expiresAt: Date.now() + 24 * 60 * 60 * 1000,
            email: ADMIN_EMAIL
        };

        const encryptedSession = CryptoJS.AES.encrypt(
            JSON.stringify(adminSession),
            SESSION_KEY
        ).toString();
        localStorage.setItem('adminSession', encryptedSession);

        toastify({
            text: 'Welcome back, Admin!',
            background: 'bg-green-500',
            duration: 4000,
        });

        setTimeout(async () => await loadPage("adminDashboard"), 2000)
        return true;

    } catch (error) {
        toastify({
            text: 'Invalid credentials',
            background: 'bg-red-500'
        });
        return false;
    }
}

export function checkAdminAuth() {
    try {
        const encryptedSession = localStorage.getItem('adminSession');
        if (!encryptedSession) return false;

        const decrypted = CryptoJS.AES.decrypt(encryptedSession, SESSION_KEY).toString(CryptoJS.enc.Utf8);
        if (!decrypted) return false;

        const session = JSON.parse(decrypted);
        if (Date.now() > session.expiresAt) {
            localStorage.removeItem('adminSession');
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

export async function logoutAdmin() {
    localStorage.removeItem('adminSession');
    toastify({
        text: 'Successfully Logged Out!',
        icon: "fas fa-check-circle",
        duration: 4000,
    });
    setTimeout(async () => await loadPage("adminLogin"), 2000)
}