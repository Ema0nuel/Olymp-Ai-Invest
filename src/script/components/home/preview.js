import { registerEvent, cleanup } from '../../utils/reset';
import Shape from '../../../images/assets/Shape.webp';
import CardShape from '../../../images/assets/Card-Shape.png';
import WhyTrade from '../../../images/assets/why_trade.png';
import Vector3 from '../../../images/assets/Vector-3.png';
import Planet1 from '../../../images/assets/planet-1.png';
import Star from '../../../images/assets/Star-1.png';
import Element from '../../../images/assets/Element.png';
import Shape2 from '../../../images/assets/Shape2.png';

const preview = () => {
    function pageEvents() {
        // Simplified card hover effects
        const cards = document.querySelectorAll('.feature-card');
        cards.forEach(card => {
            registerEvent('preview', card, 'mouseenter', () => {
                card.classList.add('hover');
            });
            registerEvent('preview', card, 'mouseleave', () => {
                card.classList.remove('hover');
            });
        });

        return () => cleanup('preview');
    }

    return {
        html: /* html */`
        <section class="relative py-20 bg-brand-dark overflow-hidden">
            <!-- Optimized Background Elements -->
            <div class="absolute inset-0 pointer-events-none opacity-20">
                <div class="absolute top-20 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-20 right-10 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl"></div>
                <img src="${Element}" alt="" class="absolute top-10 right-10 w-20">
                <img src="${Star}" alt="" class="absolute top-1/2 left-20 w-16">
            </div>

            <!-- Main Content -->
            <div class="container mx-auto px-4">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <span class="inline-block text-brand-primary font-medium tracking-wider mb-3">
                        SUSTAINABLE TRADING
                    </span>
                    <h2 class="text-4xl md:text-5xl font-bold text-brand-white mb-4">
                        CO2-neutral & Free Tax Report
                    </h2>
                    <p class="text-brand-white/70 max-w-2xl mx-auto">
                        Trade sustainably while keeping your taxes in check
                    </p>
                </div>

                <!-- Features Grid -->
                <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-start mb-20">
                    <!-- CO2 Feature -->
                    <div class="feature-card group">
                        <div class="relative overflow-hidden rounded-2xl bg-brand-blue/10 
                                  backdrop-blur-sm border border-brand-primary/10 p-8 
                                  transition-all duration-200">
                            <div class="relative z-10">
                                <div class="flex items-start gap-4 mb-6">
                                    <span class="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-primary/10 
                                               flex items-center justify-center">
                                        <i class="fas fa-leaf text-brand-primary text-xl"></i>
                                    </span>
                                    <div>
                                        <h3 class="text-xl font-bold text-white mb-2">
                                            CO2-neutral Portfolios
                                        </h3>
                                        <p class="text-white/70 text-sm leading-relaxed">
                                            We keep all portfolios CO2-neutral through our partnership 
                                            with Offsetra, making your investments eco-friendly.
                                        </p>
                                    </div>
                                </div>
                                <img src="${Shape2}" alt="CO2 Neutral" 
                                     class="w-full h-48 object-cover rounded-xl mb-6">
                                <a href="/markets" data-nav class="inline-flex items-center gap-2 text-brand-primary 
                                          hover:gap-3 transition-all text-sm">
                                    Learn about our green initiative
                                    <i class="fas fa-arrow-right text-sm"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Tax Feature -->
                    <div class="feature-card group">
                        <div class="relative overflow-hidden rounded-2xl bg-brand-blue/10 
                                  backdrop-blur-sm border border-brand-primary/10 p-8 
                                  transition-all duration-200">
                            <div class="relative z-10">
                                <div class="flex items-start gap-4 mb-6">
                                    <span class="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-primary/10 
                                               flex items-center justify-center">
                                        <i class="fas fa-file-invoice-dollar text-brand-primary text-xl"></i>
                                    </span>
                                    <div>
                                        <h3 class="text-xl font-bold text-white mb-2">
                                            Automated Tax Reports
                                        </h3>
                                        <p class="text-white/70 text-sm leading-relaxed">
                                            Get instant, accurate tax reports for all your trading 
                                            activities with our automated system.
                                        </p>
                                    </div>
                                </div>
                                <img src="${Shape}" alt="Tax Reports" 
                                     class="w-full h-48 object-cover rounded-xl mb-6">
                                <a href="/help" data-nav class="inline-flex items-center gap-2 text-brand-primary 
                                          hover:gap-3 transition-all text-sm">
                                    View sample report
                                    <i class="fas fa-arrow-right text-sm"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Why Trade Section -->
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div class="relative">
                        <div class="relative z-10 rounded-2xl overflow-hidden">
                            <img src="${WhyTrade}" alt="Trading Platform" class="w-72 mx-auto">
                        </div>
                        <img src="${Vector3}" alt="" class="absolute -bottom-10 -left-10 w-32 opacity-20">
                        <img src="${CardShape}" alt="" class="absolute -top-10 -right-10 w-40 opacity-20">
                    </div>

                    <div class="space-y-8">
                        <div>
                            <span class="text-brand-primary text-sm font-semibold uppercase tracking-wider">
                                Why Choose Us
                            </span>
                            <h3 class="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
                                Professional Trading Platform
                            </h3>
                            <p class="text-white/70">
                                Access global markets with institutional-grade infrastructure and 
                                advanced trading features designed for both beginners and professionals.
                            </p>
                        </div>

                        <a href="/about" data-nav 
                           class="hero-fade-in inline-flex items-center justify-center px-8 py-4 
                                  border-2 border-brand-primary text-brand-primary font-bold 
                                  rounded-xl hover:bg-brand-primary/10 transition-all 
                                  hover:translate-y-[-2px] active:translate-y-[0px] text-sm">
                            <i class="fas fa-play-circle mr-2"></i>
                            Learn more
                        </a>
                    </div>
                </div>
            </div>

            <style>
                .feature-card .relative {
                    transform: translateY(0);
                    transition: transform 0.2s ease-out;
                }
                .feature-card.hover .relative {
                    transform: translateY(-4px);
                }
            </style>
        </section>
        `,
        pageEvents
    };
};

export default preview;