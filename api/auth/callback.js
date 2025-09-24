import supabase from '../../src/script/utils/supabaseClients.js'
import { createTradingAccounts } from '../../src/script/views/user/functions/signupHandler.js'

export default async function handler(req, res) {
    try {
        const { code } = req.query

        if (!code) {
            return res.redirect('/login?error=no_code')
        }

        // Exchange code for session
        const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            console.error('Auth error:', error)
            return res.redirect('/login?error=auth_failed')
        }

        // First, try to create the profile
        const { error: insertError } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                email: user.email,
                full_name: user.user_metadata.full_name || '',
                avatar_url: user.user_metadata.avatar_url || '',
                is_verified: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'id',
                returning: 'minimal'
            })

        if (insertError) {
            console.error('Profile creation error:', insertError)
            return res.redirect('/login?error=profile_creation_failed')
        }

        // Now check if trading accounts exist
        const { data: accounts } = await supabase
            .from('trading_accounts')
            .select('id')
            .eq('user_id', user.id)
            .limit(1)

        // Create trading accounts if none exist
        if (!accounts || accounts.length === 0) {
            await createTradingAccounts(user.id)
        }

        // Successful login
        return res.redirect('/dashboard')
    } catch (error) {
        console.error('Callback error:', error)
        return res.redirect('/login?error=callback_failed')
    }
}