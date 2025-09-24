

const PROCESS_STEPS = [
    {
        number: '01',
        icon: 'fa-user-shield',
        title: 'Create Account',
        description: 'Quick and secure registration process with advanced encryption.'
    },
    {
        number: '02',
        icon: 'fa-atom',
        title: 'Start Trading',
        description: 'Access real-time markets with professional trading tools.'
    },
    {
        number: '03',
        icon: 'fa-money-bill-trend-up',
        title: 'Earn Profits',
        description: 'Execute trades and manage your portfolio efficiently.'
    }
];

const process = () => {
    function initializeAnimations() {
        // Only animate decorative elements, not the cards
        anime({
            targets: '.decor-element',
            translateY: [-10, 10],
            duration: 2000,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutQuad'
        });
    }

    return {
        html: /* html */`
        <section class="relative py-16 bg-[#0a0a0a]">
            <!-- Decorative Elements -->
            <div class="absolute inset-0 pointer-events-none opacity-20">
                <div class="decor-element absolute top-10 left-10 w-20 h-20 bg-primary/10"></div>
                <div class="decor-element absolute top-10 right-10 w-20 h-20 bg-primary/10"></div>
            </div>

            <!-- Header -->
            <div class="text-center max-w-3xl mx-auto mb-16">
                    <span class="inline-block text-brand-primary font-semibold uppercase tracking-wider mb-3">
                        <i class="fas fa-bolt mr-2"></i> Trading Process
                    </span>
                    <h2 class="text-4xl md:text-5xl font-bold text-brand-white mb-6">
                        How It Works
                    </h2>
                    <p class="text-brand-white/70">
                        Experience seamless trading with our streamlined process
                    </p>
            </div>

            <!-- Process Steps -->
            <div class="container mx-auto px-4 mb-20">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    ${PROCESS_STEPS.map(step => `
                        <div class="relative overflow-hidden rounded-xl bg-[#111] p-8 
                             transition-colors duration-200 hover:bg-[#f1d416]/5 group">
                            <!-- Large Background Number -->
                            <div class="absolute inset-0 flex items-center justify-center text-[200px] 
                                 font-bold text-white/5 pointer-events-none select-none">
                                ${step.number}
                            </div>
                            <!-- Content -->
                            <div class="relative z-10">
                                <i class="fa-solid ${step.icon} text-3xl text-[#f1d416] mb-4"></i>
                                <h3 class="text-xl font-bold text-white mb-3">${step.title}</h3>
                                <p class="text-gray-400">${step.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Trading View Section -->
            <div class="container mx-auto px-4">
                <div class="text-center mb-10">
                    <h3 class="text-3xl font-bold text-white">
                        Low spreads on more than 150 instruments
                    </h3>
                </div>
                
                <div class="rounded-xl overflow-hidden bg-[#111] h-[700px]">
                    <iframe 
                        class="w-full h-full"
                        scrolling="no" 
                        allowtransparency="true" 
                        frameborder="0"
                        src="https://www.tradingview-widget.com/embed-widget/forex-heat-map/?locale=in#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A700%2C%22currencies%22%3A%5B%22EUR%22%2C%22USD%22%2C%22JPY%22%2C%22GBP%22%2C%22CHF%22%2C%22AUD%22%2C%22CAD%22%2C%22NZD%22%2C%22CNY%22%5D%2C%22isTransparent%22%3Afalse%2C%22colorTheme%22%3A%22dark%22%2C%22utm_source%22%3A%22shiningstarmarkets.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22forex-heat-map%22%7D">
                    </iframe>
                </div>
            </div>

            <style>
                .group:hover {
                    box-shadow: inset 0 0 0 1px rgba(26, 251, 145, 0.1);
                }
                
                @media (max-width: 768px) {
                    .group div:first-child {
                        font-size: 150px;
                    }
                }
            </style>
        </section>
        `,
        pageEvents: () => {
            initializeAnimations();
        }
    };
};

export default process;


