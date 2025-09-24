import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import reset, { cleanupAll } from "../../utils/reset"
import Author1 from '../../../images/assets/author10.png'
import Author2 from '../../../images/assets/author12.png'
import Author3 from '../../../images/assets/author11.png'
import Assets0 from '../../../images/assets/quote_bg.png'
import Assets1 from '../../../images/assets/collage.png'
import { trackPageVisit } from '../../utils/analtics'


const customerStats = [
    { label: "Investor engaged", value: "35,200", icon: "ti ti-send" },
    { label: "Business launch", value: "4,700", icon: "ti ti-user" }
]

const customerFeatures = [
    "Charts trading",
    "Supreme Authority",
    "Worldly Power",
    "Global Dominance"
]

const testimonials = [
    {
        name: "Brooklyn Simmons",
        role: "Marketing Director",
        img: Author1,
        quote: "Trading has always been a passion, but it wasn't until I focused on risk management that I began to see consistent profits. The journey was not without its ups and downs, but the lessons I learned along the way have been invaluable."
    },
    {
        name: "Chris Moore",
        role: "President of Sales",
        img: Author2,
        quote: "Olymp AI Invest's support team is always available and helpful. Their platform is intuitive and the analytics are top-notch. I feel confident trading here."
    },
    {
        name: "Balogh Imre",
        role: "Account Executive",
        img: Author3,
        quote: "The customer service at Olymp AI Invest is unmatched. Fast responses and real solutions. Highly recommended for both beginners and professionals."
    }
]

const help = async () => {
    reset('Olymp AI Invest Support')
    cleanupAll()
    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar()
    function pageEvents() {
        navEvents()
        // Animate counters
        document.querySelectorAll('.odometer').forEach(el => {
            el.textContent = el.dataset.odometerFinal
        })
    }
    return ({
        html: /* html */`
        ${navbar}
        <!-- Banner Section -->
        <section class="relative bg-cover bg-center py-20" style="background-image: url('https://softivus.com/wp/tradly/wp-content/uploads/2025/05/Breadcrumbs-Area-1-min.png')">
            <div class="absolute inset-0 bg-black/70"></div>
            <div class="container mx-auto px-4 relative z-10">
                <div class="text-center">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Support</h2>
                    <nav aria-label="breadcrumb" class="flex justify-center mb-2">
                        <ol class="flex gap-2 text-gray-300 text-sm">
                            <li><a href="/" data-nav class="hover:text-brand-primary">Home</a></li>
                            <li>&gt;</li>
                            <li class="text-brand-primary">Support</li>
                        </ol>
                    </nav>
                    <p class="text-lg text-gray-200 max-w-xl mx-auto mt-4">Anytime Support from our team. We're constantly improving our trading platform, trying to make it the best on the market.</p>
                </div>
            </div>
        </section>

        <!-- Customer Section -->
        <section class="relative py-20 bg-brand-blue/5">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 class="text-3xl font-bold text-white mb-4">We help our customers.</h3>
                        <p class="text-gray-300 mb-6">The rise of cryptocurrencies has opened up new trading opportunities. Olymp AI Invest demystifies the world of digital currencies and empowers traders globally.</p>
                        <ul class="flex flex-wrap gap-4 mb-8">
                            ${customerFeatures.map(f => `
                                <li class="flex items-center gap-2 text-brand-primary font-medium">
                                    <i class="ti ti-circle-check"></i> ${f}
                                </li>
                            `).join('')}
                        </ul>
                        <div class="border-t border-brand-primary/30 pt-6 mt-6 flex gap-10">
                            ${customerStats.map(stat => `
                                <div class="flex flex-col items-center">
                                    <span class="bg-brand-primary/20 rounded-full p-4 mb-2">
                                        <i class="${stat.icon} text-brand-primary text-xl"></i>
                                    </span>
                                    <span class="odometer text-2xl font-bold text-brand-primary" data-odometer-final="${stat.value}">0</span>
                                    <span class="text-gray-300 mt-2">${stat.label}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="mt-10">
                            <a href="/login" data-nav 
                           class="hero-fade-in inline-flex items-center justify-center px-8 py-4 
                                  border-2 border-brand-primary text-brand-primary font-bold 
                                  rounded-xl hover:bg-brand-primary/10 transition-all 
                                  hover:translate-y-[-2px] active:translate-y-[0px] text-sm">
                            <i class="fas fa-play-circle mr-2"></i>
                            Start Earning now
                        </a>
                        </div>
                    </div>
                    <div>
                        <img src="${Assets1}" alt="Customers" class="w-full rounded-2xl shadow-lg border-2 border-brand-primary/30">
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="relative py-20 bg-brand-black">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <span class="text-brand-primary font-semibold text-lg">Testimonial</span>
                    <h3 class="text-3xl md:text-4xl font-bold text-white mt-2">What people say</h3>
                </div>
                <div class="swiper common-slider1 flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    ${testimonials.map(t => /* html */`
                        <div class="bg-brand-blue/10 rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md mx-auto transition-all duration-300 hover:scale-105 hover:border-brand-primary border border-transparent">
                            <img src="${t.img}" alt="${t.name}" class="w-20 h-20 rounded-full mb-4 border-2 border-brand-primary/30 object-cover">
                            <img src="${Assets0}" alt="Quote" class="w-8 mb-4">
                            <p class="text-gray-200 mb-4 italic">"${t.quote}"</p>
                            <h5 class="text-brand-primary font-bold text-lg">${t.name}</h5>
                            <span class="text-gray-400 text-sm mt-1">${t.role}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ${Footer().html}
        `,
        pageEvents
    })
}

export default help