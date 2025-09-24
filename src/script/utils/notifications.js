import supabase from './supabaseClients'
import auth from './auth'

export async function fetchUserNotifications() {
    try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError || !session) {
            throw new Error('Not authenticated')
        }

        const userId = session.user.id

        // Fetch notifications with proper error handling
        const { data, error } = await supabase
            .from('notifications')
            .select(`
                id,
                title,
                message,
                type,
                is_read,
                created_at
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (error) throw error

        return { data, error: null }
    } catch (error) {
        console.error('Fetch notifications error:', error)
        return { data: null, error: error.message }
    }
}

export async function markNotificationAsRead(notificationId) {
    try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError || !session) {
            throw new Error('Not authenticated')
        }

        const userId = session.user.id

        // Update notification with safety checks
        const { data, error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .match({
                id: notificationId,
                user_id: userId
            })
            .select()
            .single()

        if (error) throw error

        return { data, error: null }
    } catch (error) {
        console.error('Mark notification error:', error)
        return { error: error.message }
    }
}

export async function createNotification(userId, type, title, message) {
    try {
        if (!['deposit', 'withdrawal', 'swap', 'system'].includes(type)) {
            throw new Error('Invalid notification type')
        }

        const { data, error } = await supabase
            .from('notifications')
            .insert({
                user_id: userId,
                type,
                title,
                message,
                is_read: false
            })
            .select()
            .single()

        if (error) throw error

        return { data, error: null }
    } catch (error) {
        console.error('Create notification error:', error)
        return { error: error.message }
    }
}

export async function deleteNotification(notificationId) {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError || !session) {
            throw new Error('Not authenticated')
        }

        const userId = session.user.id

        const { error } = await supabase
            .from('notifications')
            .delete()
            .match({
                id: notificationId,
                user_id: userId
            })

        if (error) throw error

        return { error: null }
    } catch (error) {
        console.error('Delete notification error:', error)
        return { error: error.message }
    }
}