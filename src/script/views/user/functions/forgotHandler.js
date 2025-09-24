import spinner from '../../../utils/spinner'
import toastify from '../../../components/toastify'
import supabase from '../../../utils/supabaseClients'
import { loadPage } from '../../../routes/router'

export async function forgotHandler(email) {
    try {
        spinner.start()

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
        })

        if (error) throw error

        spinner.stop()
        toastify({
            text: "Password reset instructions sent to your email",
            icon: "fas fa-envelope",
            background: "bg-green-500/10",
            duration: 3000
        })

        // Delay redirect to show notification
        await new Promise(resolve => setTimeout(resolve, 2000))
        await loadPage('login')
        return true

    } catch (error) {
        spinner.stop()
        toastify({
            text: error.message || "Failed to send reset instructions",
            icon: "fas fa-exclamation-circle",
            background: "bg-red-500/10",
            duration: 3000
        })
        return false
    }
}