import supabase from '../../../utils/supabaseClients'
import Modal from '../../../components/Modal'

export const NotificationsList = async (limit = 5) => {
    const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

    function getNotificationIcon(type) {
        switch (type) {
            case 'deposit':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9 1a1 1 0 10-2 0v6a1 1 0 102 0V6zm-4 1a1 1 0 10-2 0v4a1 1 0 102 0V7z"/></svg>'
            case 'withdrawal':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"/></svg>'
            case 'swap':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"/></svg>'
            default:
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>'
        }
    }

    return notifications?.map(notification => `
        <div class="p-4 bg-brand-black/50 backdrop-blur-xl rounded-xl border border-brand-primary/10 
                    hover:bg-brand-primary/5 transition-colors cursor-pointer"
             onclick="showNotificationDetails('${notification.id}')">
            <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg ${notification.type === 'deposit' ? 'bg-green-500/10 text-green-500' :
            notification.type === 'withdrawal' ? 'bg-red-500/10 text-red-500' :
                'bg-brand-primary/10 text-brand-primary'
        } flex items-center justify-center">
                    ${getNotificationIcon(notification.type)}
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="text-white font-medium truncate">${notification.title}</h4>
                    <p class="text-gray-400 text-sm truncate">${notification.message}</p>
                    <span class="text-xs text-gray-500">${new Date(notification.created_at).toLocaleString()}</span>
                </div>
                ${!notification.is_read ? `
                    <div class="w-2 h-2 rounded-full bg-brand-primary"></div>
                ` : ''}
            </div>
        </div>
    `).join('') || `
        <div class="text-center text-gray-400 py-8">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p>No notifications yet</p>
        </div>
    `
}