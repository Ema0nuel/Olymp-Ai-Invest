import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import reset, { cleanupAll } from "../../utils/reset"
import Brands from "../../components/Brands"
import { trackPageVisit } from '../../utils/analtics'


const TERMS_SECTIONS = [
    {
        title: "Agreement to Terms",
        content: `
            <p class="mt-3">These Terms and Conditions constitute a legally binding agreement made between you and Olymp AI Invest. By accessing our platform and using our services, you agree to be bound by these Terms and Conditions.</p>
            <p class="mt-3">Olymp AI Invest is a leading online trading platform registered and operating under applicable laws and regulations. Our primary purpose is to provide sophisticated trading solutions and portfolio management services.</p>
            <p class="mt-3">We reserve the right to make changes to these Terms and Conditions at any time. We will notify you of any changes by posting the new Terms and Conditions on this page and updating the "Last Updated" date.</p>
        `
    },
    {
        title: "User Representations",
        content: `
            <p class="mt-4 mb-5">By using our services, you represent and warrant that:</p>
            <ul class="list-disc pl-6 space-y-3 text-gray-300">
                <li>You are at least 18 years of age</li>
                <li>You have the legal capacity to enter into these Terms and Conditions</li>
                <li>You will use our platform for legitimate purposes only</li>
                <li>You will provide accurate and up-to-date information</li>
                <li>You understand the risks associated with cryptocurrency trading</li>
            </ul>
            <p class="mt-5">Your access to our services may be terminated without warning if we believe you have violated these terms.</p>
        `
    },
    {
        title: "Trading Services",
        content: `
            <p class="mt-3">Olymp AI Invest offers various trading services including:</p>
            <ul class="list-disc pl-6 space-y-3 text-gray-300 mt-4">
                <li>Cryptocurrency trading</li>
                <li>Portfolio management</li>
                <li>Market analysis tools</li>
                <li>Real-time trading data</li>
            </ul>
            <p class="mt-4">Trading cryptocurrencies involves substantial risk of loss and is not suitable for all investors. The high degree of leverage can work against you as well as for you.</p>
        `
    },
    {
        title: "Fees and Charges",
        content: `
            <p class="mt-3">Our fee structure is transparent and includes:</p>
            <ul class="list-disc pl-6 space-y-3 text-gray-300 mt-4">
                <li>2% annual management fee (charged monthly)</li>
                <li>1% transaction fee on trades</li>
                <li>No hidden charges or commissions</li>
            </ul>
            <p class="mt-4">All fees are automatically calculated and deducted from your account. A detailed breakdown is available in your dashboard.</p>
        `
    }
]

const terms = async () => {
    reset('Olymp AI Invests Terms & Conditions')
    cleanupAll()
    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar()

    function pageEvents() {
        navEvents()
    }

    return ({
        html: /* html */`
        ${navbar}
        <!-- Banner Section -->
        <section class="relative bg-cover bg-center py-20" 
                 style="background-image: url('https://softivus.com/wp/tradly/wp-content/uploads/2025/05/Breadcrumbs-Area-1-min.png')">
            <div class="absolute inset-0 bg-black/70"></div>
            <div class="container mx-auto px-4 relative z-10">
                <div class="text-center">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Terms & Conditions</h2>
                    <nav aria-label="breadcrumb" class="flex justify-center">
                        <ol class="flex gap-2 text-gray-300">
                            <li><a href="/" data-nav class="hover:text-brand-primary">Home</a></li>
                            <li>&gt;</li>
                            <li class="text-brand-primary">Terms & Conditions</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <!-- Terms Content -->
        <section class="py-20 bg-brand-dark">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <div class="bg-brand-blue/10 rounded-2xl p-8 md:p-12 border border-brand-primary/20">
                        <!-- Header -->
                        <div class="text-center mb-12">
                            <h2 class="text-2xl md:text-3xl font-bold text-white">
                                Olymp AI Invest Terms & Conditions
                            </h2>
                            <p class="text-gray-400 mt-4">
                                Last updated: August 21, 2025
                            </p>
                        </div>

                        <!-- Terms Sections -->
                        <div class="space-y-12">
                            ${TERMS_SECTIONS.map(section => `
                                <div class="term-section">
                                    <h3 class="text-xl font-bold text-brand-primary mb-6">
                                        ${section.title}
                                    </h3>
                                    <div class="text-gray-300 space-y-4">
                                        ${section.content}
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Footer Note -->
                        <div class="mt-12 pt-8 border-t border-brand-primary/20">
                            <p class="text-gray-400 text-sm">
                                By using Olymp AI Invest's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. For questions about these terms, please contact our support team.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        ${Brands()}
        ${Footer().html}
        `,
        pageEvents
    })
}

export default terms