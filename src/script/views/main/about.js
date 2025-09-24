import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import reset, { cleanupAll } from "../../utils/reset"
import { animateValue } from "../../utils/animate"
import Test1 from '../../../images/assets/Image-3.webp'
import Test2 from '../../../images/assets/image__11__360.webp'
import Test3 from '../../../images/assets/image__10__360.webp'
import Test4 from '../../../images/assets/image__8__360.webp'
import { trackPageVisit } from '../../utils/analtics'

const about = async () => {
    reset('About Olymp AI Invest')
    cleanupAll()
    await trackPageVisit()

    const { html: navbar, pageEvents: navEvents } = Navbar()

    function pageEvents() {
        navEvents()

        // Video autoplay
        const videos = document.querySelectorAll('.video-player')
        videos.forEach(video => {
            video.play().catch(() => { })
        })

        // Stats animation
        const stats = [
            { el: '.crypto-traded', end: 2450000 },
            { el: '.countries-count', end: 195 },
            { el: '.users-count', end: 350000 },
            { el: '.daily-volume', end: 890000000 }
        ]

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stats.forEach(stat => {
                        const element = document.querySelector(stat.el)
                        if (element) {
                            animateValue(element, 0, stat.end, 2000)
                        }
                    })
                    observer.disconnect()
                }
            })
        }, { threshold: 0.5 })

        const statsSection = document.querySelector('.stats-section')
        if (statsSection) {
            observer.observe(statsSection)
        }

        // Testimonial Carousel
        let currentSlide = 0
        const testimonials = document.querySelectorAll('.testimonial-slide')
        const totalSlides = testimonials.length

        function showSlide(index) {
            testimonials.forEach((slide, i) => {
                slide.style.transform = `translateX(${100 * (i - index)}%)`
            })
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides
            showSlide(currentSlide)
        }

        setInterval(nextSlide, 5000)
        showSlide(0)

        // Mission card hover effects
        const missionCards = document.querySelectorAll('.mission-card')
        missionCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('scale-105')
            })
            card.addEventListener('mouseleave', () => {
                card.classList.remove('scale-105')
            })
        })
    }

    return ({
        html: /* html */`
        <main class="flex flex-col min-h-screen animate-fade-in-up">
            ${navbar}
            
            <!-- Hero Section -->
            <section class="relative pt-24 py-20 overflow-hidden bg-cover bg-center" style="background-image: url('https://softivus.com/wp/tradly/wp-content/uploads/2025/05/Breadcrumbs-Area-1-min.png')">
                <div class="container mx-auto px-4">
                    <div class="flex flex-col lg:flex-row items-center gap-12"> 
                        <div class="w-full lg:w-1/2">
                            <span class="text-brand-primary font-semibold uppercase tracking-wide hero-fade-in inline-block mb-4">
                                About Olymp AI Invest
                            </span>
                            <h1 class="text-4xl lg:text-6xl font-bold text-brand-white mb-6 leading-tight">
                                Pioneering the Future of <span class="text-brand-primary">Digital Finance</span>
                            </h1>
                            <p class="text-lg text-white mb-8 leading-relaxed">
                                Founded in 2020, Olymp AI Invest has revolutionized digital asset trading through cutting-edge technology, 
                                institutional-grade security, and an unwavering commitment to user experience. We serve millions of traders 
                                across the globe, processing billions in daily volume while maintaining the highest standards of transparency 
                                and reliability.
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4">
                                <a href="/register" data-nav 
                                   class="inline-flex items-center justify-center px-8 py-4 
                                          bg-brand-primary text-brand-blue font-bold rounded-xl 
                                          hover:opacity-90 transition-all hover:translate-y-[-2px] 
                                          hover:shadow-lg hover:shadow-brand-primary/20">
                                    Start Trading
                                    <i class="fas fa-arrow-right ml-2"></i>
                                </a>
                                <a href="/contact" data-nav 
                                   class="inline-flex items-center justify-center px-8 py-4 
                                          border-2 border-brand-primary text-brand-primary font-bold 
                                          rounded-xl hover:bg-brand-primary/10 transition-all">
                                    Contact Us
                                    <i class="fas fa-envelope ml-2"></i>
                                </a>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2">
                            <video 
                                class="w-full rounded-2xl video-player shadow-2xl"
                                autoplay
                                loop
                                muted
                                playsinline
                            >
                                <source src="https://assets.website-files.com/621506e9a1183766b5f2f1f7/621506e9a118376a43f2f289_About-us-video-transcode.mp4" type="video/mp4">
                            </video>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Stats Section -->
            <section class="py-20 stats-section">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        ${generateStats()}
                    </div>
                </div>
            </section>

            <!-- Mission Section -->
            <section class="py-20">
                <div class="container mx-auto px-4">
                    <div class="text-center mb-16">
                        <span class="text-brand-primary font-semibold uppercase tracking-wide mb-4 block">Our Mission</span>
                        <h2 class="text-3xl lg:text-5xl font-bold text-brand-white mb-4">Empowering Global Trade</h2>
                        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
                            We're on a mission to make digital asset trading accessible, secure, and efficient for everyone.
                        </p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${generateMissionCards()}
                    </div>
                </div>
            </section>

            <!-- Team Section -->
            <section class="py-20">
                <div class="container mx-auto px-4">
                    <div class="text-center mb-16">
                        <span class="text-brand-primary font-semibold uppercase tracking-wide mb-4 block">Our Team</span>
                        <h2 class="text-3xl lg:text-5xl font-bold text-brand-white mb-4">Meet Our Experts</h2>
                        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
                            Led by industry veterans with decades of combined experience in finance, technology, and security.
                        </p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${generateTeamMembers()}
                    </div>
                </div>
            </section>

            <!-- Testimonials Section -->
            <section class="py-20 bg-gradient-to-b from-transparent to-brand-blue/10">
                <div class="container mx-auto px-4">
                    <div class="text-center mb-16">
                        <span class="text-brand-primary font-semibold uppercase tracking-wide mb-4 block">Testimonials</span>
                        <h2 class="text-3xl lg:text-5xl font-bold text-brand-white mb-4">What Our Traders Say</h2>
                    </div>
                    <div class="relative overflow-hidden h-[400px]">
                        ${generateTestimonials()}
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="py-20 bg-black">
                <div class="container mx-auto px-4 text-center">
                    <div class="max-w-3xl mx-auto">
                        <h2 class="text-3xl lg:text-5xl font-bold text-brand-white mb-6">Ready to Start Trading?</h2>
                        <p class="text-xl text-gray-300 mb-8">Join millions of traders who have already chosen Olymp AI Invest</p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/register" data-nav 
                               class="inline-flex items-center justify-center px-8 py-4 
                                      bg-brand-primary text-brand-blue font-bold rounded-xl 
                                      hover:opacity-90 transition-all hover:translate-y-[-2px] 
                                      hover:shadow-lg hover:shadow-brand-primary/20">
                                Create Account
                                <i class="fas fa-user-plus ml-2"></i>
                            </a>
                            <a href="/demo" data-nav 
                               class="inline-flex items-center justify-center px-8 py-4 
                                      border-2 border-brand-primary text-brand-primary font-bold 
                                      rounded-xl hover:bg-brand-primary/10 transition-all">
                                Try Demo
                                <i class="fas fa-play-circle ml-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            ${Footer().html}
        </main>
        `,
        pageEvents
    })
}

// Add these helper functions after the main about component

function generateStats() {
    const stats = [
        {
            number: 2450000,
            label: "Trading Volume",
            suffix: "M+",
            icon: "chart-line",
            className: "crypto-traded"
        },
        {
            number: 195,
            label: "Countries Served",
            suffix: "+",
            icon: "globe",
            className: "countries-count"
        },
        {
            number: 3500000,
            label: "Active Users",
            suffix: "+",
            icon: "users",
            className: "users-count"
        },
        {
            number: 890000000,
            label: "Daily Volume",
            suffix: "$",
            icon: "dollar-sign",
            className: "daily-volume"
        }
    ];

    return stats.map(stat => `
        <div class="text-center p-6 rounded-xl border border-brand-blue/20">
            <div class="inline-flex items-center justify-center w-16 h-16 mb-4 
                        rounded-full bg-brand-primary/10 text-brand-primary">
                <i class="fas fa-${stat.icon} text-2xl"></i>
            </div>
            <div class="text-4xl font-bold text-brand-white mb-2">
                ${stat.suffix}<span class="${stat.className}">0</span>
            </div>
            <p class="text-gray-400">${stat.label}</p>
        </div>
    `).join('');
}

function generateMissionCards() {
    const missions = [
        {
            title: "Lightning Fast Execution",
            description: "Experience sub-millisecond trade execution with our advanced matching engine",
            icon: "bolt"
        },
        {
            title: "Bank-Grade Security",
            description: "Multi-signature wallets and 95% cold storage protection for your assets",
            icon: "shield-alt"
        },
        {
            title: "24/7 Support",
            description: "Round-the-clock customer support in multiple languages",
            icon: "headset"
        },
        {
            title: "Advanced Trading Tools",
            description: "Professional-grade charts, indicators, and trading features",
            icon: "chart-bar"
        },
        {
            title: "Global Liquidity",
            description: "Deep liquidity pools and competitive spreads across all pairs",
            icon: "water"
        },
        {
            title: "Regulatory Compliance",
            description: "Full compliance with global financial regulations and standards",
            icon: "check-circle"
        }
    ];

    return missions.map(mission => `
        <div class="mission-card p-6 rounded-xl border border-brand-blue/20 
                    transition-all duration-300 hover:border-brand-primary/50">
            <div class="inline-flex items-center justify-center w-12 h-12 mb-4 
                        rounded-full bg-brand-primary/10 text-brand-primary">
                <i class="fas fa-${mission.icon}"></i>
            </div>
            <h3 class="text-xl font-bold text-brand-white mb-3">${mission.title}</h3>
            <p class="text-gray-400">${mission.description}</p>
        </div>
    `).join('');
}

function generateTeamMembers() {
    const team = [
        {
            name: "Sarah Chen",
            role: "Chief Executive Officer",
            image: "621506e9a11837673cf2f28f_Christopher-Oster.jpg",
            icons: ["linkedin", "twitter"]
        },
        {
            name: "James Rodriguez",
            role: "Chief Technology Officer",
            image: "621506e9a118373739f2f29d_Patrick-Pöschl.jpg",
            icons: ["linkedin", "github"]
        },
        {
            name: "Elena Petrov",
            role: "Head of Trading",
            image: "621506e9a11837e7c2f2f295_Florian-Gschwandtner.jpg",
            icons: ["linkedin"]
        },
        {
            name: "Michael Chang",
            role: "Security Director",
            image: "621506e9a1183703a8f2f299_Frank-Westermann.jpg",
            icons: ["linkedin", "github"]
        },
        {
            name: "Laura Schmidt",
            role: "Product Manager",
            image: "621506e9a11837d6daf2f298_Johann.jpg",
            icons: ["linkedin", "twitter"]
        },
        {
            name: "David Kim",
            role: "Head of Operations",
            image: "621506e9a11837e7c1f2f297_High-Tech-Grunderfonds.jpg",
            icons: ["linkedin"]
        },
    ];

    return team.map(member => `
        <div class="rounded-xl overflow-hidden border border-brand-blue/20 transition-all duration-300 
                    hover:border-brand-primary/50 bg-gradient-to-b from-transparent to-brand-blue/5">
            <img src="https://assets.website-files.com/621506e9a1183766b5f2f1f7/${member.image}" 
                 alt="${member.name}" 
                 class="w-full h-48 object-cover"
            >
            <div class="p-6">
                <h3 class="text-xl font-bold text-brand-white mb-1">${member.name}</h3>
                <p class="text-gray-400 mb-4">${member.role}</p>
                <div class="flex gap-4">
                    ${member.icons.map(icon => `
                        <span class="text-brand-primary hover:text-brand-white cursor-pointer transition-colors">
                            <i class="fab fa-${icon} text-lg"></i>
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function generateTestimonials() {
    const testimonials = [
        {
            name: "Rachael L.",
            role: "Professional Trader",
            quote: "The execution speed and reliability of Olymp AI Invest is unmatched. It's become my go-to platform for all trading activities.",
            image: Test1
        },
        {
            name: "Sophie L.",
            role: "Institutional Investor",
            quote: "Outstanding security features and professional tools. The customer support team is exceptionally knowledgeable.",
            image: Test2
        },
        {
            name: "Robert K.",
            role: "Retail Trader",
            quote: "As a beginner, the platform's intuitive interface and educational resources helped me start trading with confidence.",
            image: Test3
        },
        {
            name: "James Carrier",
            role: "Institutional Lecturer",
            quote: "After so many efforts, finally found the best true path to financial freedom, creating a new path to change my life dynamically opening a route to success",
            image: Test4
        }
    ];

    return testimonials.map((testimonial, index) => /* html */`
        <div class="testimonial-slide absolute w-full transition-transform duration-500 ease-out">
            <div class="max-w-2xl mx-auto">
                <div class="flex flex-col items-center text-center p-6">
                    <img src="${testimonial.image}" 
                         alt="${testimonial.name}"
                         class="w-20 h-20 rounded-full mb-6 border-4 border-brand-primary"
                    >
                    <blockquote class="text-xl text-gray-300 mb-6">
                        "${testimonial.quote}"
                    </blockquote>
                    <cite class="text-brand-white font-bold block">${testimonial.name}</cite>
                    <span class="text-gray-400">${testimonial.role}</span>
                </div>
            </div>
        </div>
    `).join('');
}

export default about