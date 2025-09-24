import spinner from '../../../utils/spinner'
import toastify from '../../../components/toastify'
import supabase from '../../../utils/supabaseClients'
import { loadPage } from '../../../routes/router'

export async function resetHandler({ password }) {
    try {
        spinner.start()

        const { error } = await supabase.auth.updateUser({
            password: password
        })

        if (error) throw error

        spinner.stop()
        toastify({
            text: "Password reset successful! Please login with your new password",
            icon: "fas fa-check-circle",
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
            text: error.message || "Failed to reset password",
            icon: "fas fa-exclamation-circle",
            background: "bg-red-500/10",
            duration: 3000
        })
        return false
    }
}