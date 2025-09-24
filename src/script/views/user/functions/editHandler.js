import supabase from '../../../utils/supabaseClients'
import toastify from '../../../components/toastify'
import spinner from '../../../utils/spinner'
import { loadPage } from '../../../routes/router'

export async function updateProfile(data) {
    try {
        spinner.start()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) throw new Error('Not authenticated')

        const updates = {
            id: user.id,
            updated_at: new Date(),
            ...data
        }

        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)

        if (error) throw error

        toastify({
            text: 'Profile updated successfully',
            background: 'bg-green-500'
        })

        await loadPage('settings')
        return true
    } catch (error) {
        console.error('Update error:', error)
        toastify({
            text: error.message,
            background: 'bg-red-500'
        })
        return false
    } finally {
        spinner.stop()
    }
}

export async function updateAvatar(file) {
    try {
        spinner.start()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) throw new Error('Not authenticated')

        const fileExt = file.name.split('.').pop()
        const filePath = `${user.id}/avatar.${fileExt}`

        // Upload image
        const { error: uploadError } = await supabase.storage
            .from('deposit-screenshots')
            .upload(filePath, file, {
                upsert: true
            })

        if (uploadError) throw uploadError

        // Get public URL
        const { data } = supabase.storage
            .from('deposit-screenshots')
            .getPublicUrl(filePath)

        // Update profile
        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                avatar_url: data.publicUrl,
                updated_at: new Date()
            })
            .eq('id', user.id)

        if (updateError) throw updateError

        toastify({
            text: 'Avatar updated successfully',
            background: 'bg-green-500'
        })

        await loadPage('settings')
        return data.publicUrl
    } catch (error) {
        console.error('Avatar update error:', error)
        toastify({
            text: error.message,
            background: 'bg-red-500'
        })
        return null
    } finally {
        spinner.stop()
    }
}

export async function updatePin(currentPin, newPin) {
    try {
        spinner.start()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) throw new Error('Not authenticated')

        // First verify current PIN
        const { data: profile } = await supabase
            .from('profiles')
            .select('pin')
            .eq('id', user.id)
            .single()

        if (profile.pin !== currentPin) {
            throw new Error('Current PIN is incorrect')
        }

        // Update PIN
        const { error } = await supabase
            .from('profiles')
            .update({
                pin: newPin,
                updated_at: new Date()
            })
            .eq('id', user.id)

        if (error) throw error

        toastify({
            text: 'PIN updated successfully',
            background: 'bg-green-500'
        })

        await loadPage('settings')
        return true
    } catch (error) {
        console.error('PIN update error:', error)
        toastify({
            text: error.message,
            background: 'bg-red-500'
        })
        return false
    } finally {
        spinner.stop()
    }
}