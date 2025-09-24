import auth from '../../utils/auth'
import reset from '../../utils/reset'
import Navbar from './components/Navbar'
import { checkOnboardingStatus } from '../../utils/onboardingHandler'
import Onboarding from '../../components/Onboarding'
import Cards from './components/Cards'
import TradingWidget from './components/TradingWidget'
import TransactionList from './components/TransactionList'
import { trackPageVisit } from '../../utils/analtics'


const dashboard = async () => {
    const authCheck = await auth.check('dashboard')
    if (!authCheck) return { html: '', pageEvents: () => { } }

    reset('Olymp AI | Dashboard')
    await trackPageVisit()

    const profile = auth.getProfile()
    if (!profile) return { html: '', pageEvents: () => { } }

    const { isComplete, currentStep } = await checkOnboardingStatus(profile.id)

    const { html: navbar, pageEvents: navEvents } = Navbar()
    const cards = await Cards()
    const tradingWidget = TradingWidget()
    const transactions = await TransactionList()


    async function pageEvents() {
        if (!isComplete) {
            const onboarding = new Onboarding(profile.id, currentStep)
            onboarding.render()
        } else {
            navEvents()
            await cards.pageEvents()  // Call the async pageEvents
            tradingWidget.pageEvents()
        }
    }

    return {
        html: !isComplete ? /* html */`
            <div id="onboardingContainer"></div>
        ` : /* html */`
            ${navbar}
            <main class="main-scroll-view">
                <div class="p-4 md:p-8">
                    ${cards.html}
                    ${tradingWidget.html}
                    ${transactions.html}
                </div>
            </main>
        `,
        pageEvents,
    }
}


export default dashboard