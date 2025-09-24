import Author1 from '../../images/assets/author10.png'
import Author2 from '../../images/assets/author11.png'
import Author3 from '../../images/assets/author12.png'
import Author4 from '../../images/assets/author13.png'
import Author5 from '../../images/assets/author14.png'
import QuoteBg from '../../images/assets/quote_bg.png'

const TESTIMONIALS = [
    {
        quote: "Olymp AI Invest has transformed how I trade. Their platform is intuitive and their security measures give me peace of mind.",
        author: "Sarah Johnson",
        position: "Professional Trader",
        image: Author1
    },
    {
        quote: "The best trading platform I've used in years. Their customer support is exceptional and the interface is super clean.",
        author: "Michael Chang",
        position: "Investment Analyst",
        image: Author2
    },
    {
        quote: "Incredible platform for both beginners and professionals. The analysis tools are top-notch.",
        author: "Emma Williams",
        position: "Financial Advisor",
        image: Author3
    },
    {
        quote: "I live my dream life because Olymp AI specialist have me cover with an extraordinary way to make a living.",
        author: "Jerry Wells",
        position: "Institutional Lecturer",
        image: Author4
    },
    {
        quote: "With an amazing and improved system, I'm able to obtain more income from Olymp AI Invest establishing an ultra successful method to make money.",
        author: "Thomas Frank",
        position: "Tech Specialist",
        image: Author5
    },
]

export function initTestimonials() {
    let currentTestimonial = 0
    const testimonialContent = document.querySelector('.testimonial-content')

    if (testimonialContent) {
        const updateTestimonial = () => {
            const testimonial = TESTIMONIALS[currentTestimonial]
            testimonialContent.style.opacity = '0'
            testimonialContent.style.transform = 'translateY(20px)'

            setTimeout(() => {
                testimonialContent.innerHTML = `
                    <blockquote class="text-2xl lg:text-3xl text-white mb-6 leading-relaxed">
                        "${testimonial.quote}"
                    </blockquote>
                    <div class="flex items-center gap-4">
                        <img src="${testimonial.image}" alt="${testimonial.author}" 
                             class="w-12 h-12 rounded-full border-2 border-brand-primary/30">
                        <div>
                            <cite class="not-italic font-medium text-brand-primary">
                                ${testimonial.author}
                            </cite>
                            <p class="text-sm text-gray-400">${testimonial.position}</p>
                        </div>
                    </div>
                `
                requestAnimationFrame(() => {
                    testimonialContent.style.opacity = '1'
                    testimonialContent.style.transform = 'translateY(0)'
                })
            }, 500)

            currentTestimonial = (currentTestimonial + 1) % TESTIMONIALS.length
        }

        // Initial load with delay
        setTimeout(updateTestimonial, 100)
        // Set interval for subsequent updates
        setInterval(updateTestimonial, 10000)
    }
}

export function handleTestimony() {
    return /* html */ `
        <div class="relative z-10 flex items-center justify-center w-full p-12">
            <div class="max-w-xl">
                <img src='${QuoteBg}' alt="Quote" class="w-10 mb-4 transition-all duration-300">
                <div class="testimonial-content opacity-0 transition-all duration-500 ease-in-out">
                    <!-- Content will be injected by JavaScript -->
                </div>
            </div>
        </div>
    `
}