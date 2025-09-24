import { registerEvent, cleanup } from '../../utils/reset';
import Shape from '../../../images/assets/Shape.webp';
import Star from '../../../images/assets/Star-1.png';
import Vector from '../../../images/assets/vector.png';
import faqImage from '../../../images/assets/faq.png';


const FAQ_DATA = [
    {
        question: "What is trading?",
        answer: "Trading involves buying and selling financial instruments like stocks, bonds, and cryptocurrencies to potentially profit from market movements. It requires understanding market dynamics and risk management."
    },
    {
        question: "How can I get started with trading?",
        answer: "Start by educating yourself about financial markets, opening a trading account, practicing with a demo account, and developing a trading strategy that matches your goals and risk tolerance."
    },
    {
        question: "How can I stay updated on market news?",
        answer: "Stay informed through our real-time market updates, economic calendars, professional analysis tools, and comprehensive educational resources."
    },
    {
        question: "What are the different types of trading?",
        answer: "Common types include day trading, swing trading, position trading, and algorithmic trading. Each has its own strategies and time horizons."
    },
    {
        question: "Is trading suitable for everyone?",
        answer: "While anyone can learn to trade, successful trading requires dedication, emotional discipline, and proper risk management. It's important to understand your own risk tolerance."
    },
    {
        question: "How long does it usually take for my transfer to arrive?",
        answer: "That depends on your bank. On average, a transfer takes 1-3 working days."
    }
];

const faq = () => {
    function handleFaqClick(e) {
        const button = e.target.closest('button');
        if (!button) return;

        const item = button.parentElement;
        const content = button.nextElementSibling;
        const icon = button.querySelector('.faq-icon');
        const activeItem = document.querySelector('.faq-item.active');

        // If there's an active item and it's not the clicked one, close it
        if (activeItem && activeItem !== item) {
            const activeContent = activeItem.querySelector('.faq-content');
            const activeIcon = activeItem.querySelector('.faq-icon');

            activeContent.style.height = '0';
            activeItem.classList.remove('active');
            activeIcon.classList.remove('rotate-45');
        }

        // Toggle current item
        const isActive = item.classList.contains('active');
        content.style.height = isActive ? '0' : `${content.scrollHeight}px`;
        item.classList.toggle('active');
        icon.classList.toggle('rotate-45');
    }

    function pageEvents() {
        // Use event delegation instead of multiple listeners
        const faqList = document.querySelector('.faq-list');
        registerEvent('faq', faqList, 'click', handleFaqClick);

        return () => cleanup('faq');
    }

    return {
        html: /* html */`
        <section class="relative py-20 bg-brand-dark">
            <!-- Simplified Background -->
            <div class="fixed inset-0 pointer-events-none opacity-20">
                <img src="${Shape}" alt="" class="absolute top-0 left-0 w-96">
                <img src="${Star}" alt="" class="absolute top-20 right-20 w-16">
                <img src="${Vector}" alt="" class="absolute bottom-20 left-20 w-32">
            </div>

            <div class="container mx-auto px-4 relative">
                <!-- Section Header -->
                <div class="text-center mb-12">
                    <span class="text-brand-primary font-medium tracking-wider">FAQ's</span>
                    <h2 class="text-4xl font-bold text-white mt-2">
                        Frequently Asked Questions
                    </h2>
                </div>

                <!-- FAQ Grid -->
                <div class="grid lg:grid-cols-2 gap-8 items-start">
                    <!-- FAQ List -->
                    <div class="faq-list space-y-2">
                        ${FAQ_DATA.map(faq => `
                            <div class="faq-item bg-brand-blue/10 border border-brand-primary/10 
                                      rounded-xl overflow-hidden">
                                <button class="w-full p-4 flex items-center justify-between text-left">
                                    <span class="font-medium text-white pr-8">${faq.question}</span>
                                    <span class="faq-icon w-6 h-6 bg-brand-primary/20 rounded-full 
                                               flex items-center justify-center transition-transform 
                                               duration-200">
                                        <i class="fas fa-plus text-brand-primary text-xs"></i>
                                    </span>
                                </button>
                                <div class="faq-content h-0 overflow-hidden transition-[height] 
                                          duration-200 ease-out">
                                    <div class="p-4 pt-0 text-gray-400 text-sm">
                                        ${faq.answer}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- FAQ Image -->
                    <div class="relative block">
                        <div class="sticky top-8">
                            <div class="relative rounded-2xl overflow-hidden">
                                <div class="absolute inset-0 blur-xl">
                                </div>
                                <img src="${faqImage}" alt="FAQ Illustration" 
                                     class="relative w-full rounded-2xl"
                                     loading="lazy">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
        pageEvents
    };
};

export default faq;