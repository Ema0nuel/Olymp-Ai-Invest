import { loadPage } from '../routes/router'
import supabase from './supabaseClients'
import toastify from '../components/toastify'

export async function checkAuthSession(currentPage = '') {
    try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) throw error

        // If on login page and logged in, redirect to dashboard
        if (currentPage.toLowerCase() === 'login' && session) {
            loadPage('dashboard')
            return false
        }

        // If not on login page and not logged in, redirect to login
        if (currentPage.toLowerCase() !== 'login' && !session) {
            toastify({
                text: "Please login to continue",
                icon: "fas fa-lock",
                background: "bg-yellow-500/10",
                duration: 3000
            })
            loadPage('login')
            return false
        }

        // If session exists, fetch and cache user profile
        if (session) {
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

            if (profileError) throw profileError

            // Cache user data in localStorage
            localStorage.setItem('userProfile', JSON.stringify(profile))
        }

        return true
    } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('userProfile')

        if (currentPage.toLowerCase() !== 'login') {
            toastify({
                text: "Session expired. Please login again",
                icon: "fas fa-exclamation-circle",
                background: "bg-red-500/10",
                duration: 3000
            })
            loadPage('login')
        }
        return false
    }
}

// Helper to get cached user profile
export function getUserProfile() {
    try {
        return JSON.parse(localStorage.getItem('userProfile'))
    } catch {
        return null
    }
}

// Helper to clear auth data
export function clearAuth() {
    localStorage.removeItem('userProfile')
    supabase.auth.signOut()
}

export default {
    check: checkAuthSession,
    getProfile: getUserProfile,
    clear: clearAuth
}