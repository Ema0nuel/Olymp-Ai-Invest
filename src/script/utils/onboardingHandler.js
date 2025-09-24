import supabase from './supabaseClients'

export async function checkOnboardingStatus(userId) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('is_created, onboarding_step')
            .eq('id', userId)
            .single()

        if (error) throw error

        return {
            isComplete: data.is_created,
            currentStep: data.onboarding_step || 0
        }
    } catch (error) {
        console.error('Onboarding check failed:', error)
        return { isComplete: false, currentStep: 0 }
    }
}

export async function updateOnboardingStep(userId, step) {
    try {
        const { error } = await supabase
            .from('profiles')
            .update({ onboarding_step: step })
            .eq('id', userId)

        if (error) throw error
        return true
    } catch (error) {
        console.error('Failed to update onboarding step:', error)
        return false
    }
}