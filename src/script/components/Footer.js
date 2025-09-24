import Logo from '/src/images/logo.jpg'

const Footer = () => {
    return ({
        html: /* html */`
        <footer class="mt-auto pt-16 pb-8">
            <div class="container mx-auto px-4">
                <!-- Grid Layout -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <!-- Brand Section -->
                    <div class="space-y-4">
                        <a href="/" data-nav class="flex items-center gap-2">
                            <img src="${Logo}" alt="Olymp AI Invest" class="h-8 w-auto">
                            <span class="text-brand-primary font-bold text-xl">Olymp AI</span>
                        </a>
                        <p class="text-brand-white/70">Professional trading platform with advanced tools and real-time market data.</p>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="text-brand-primary font-bold mb-4">Quick Links</h4>
                        <div class="flex flex-col gap-3">
                            <a href="/markets" data-nav class="text-brand-white hover:text-brand-primary transition-colors">Markets</a>
                            <a href="/trading" data-nav class="text-brand-white hover:text-brand-primary transition-colors">Trading</a>
                            <a href="/about" data-nav class="text-brand-white hover:text-brand-primary transition-colors">About Us</a>
                        </div>
                    </div>

                    <!-- Support -->
                    <div>
                        <h4 class="text-brand-primary font-bold mb-4">Support</h4>
                        <div class="flex flex-col gap-3">
                            <a href="/help" data-nav class="text-brand-white hover:text-brand-primary transition-colors">Help Center</a>
                            <a href="/contact" data-nav class="text-brand-white hover:text-brand-primary transition-colors">Contact Us</a>
                            <a href="/faq" data-nav class="text-brand-white hover:text-brand-primary transition-colors">FAQ</a>
                        </div>
                    </div>

                    <!-- Legal -->
                    <div>
                        <h4 class="text-brand-primary font-bold mb-4">Legal</h4>
                        <div class="flex flex-col gap-3">
                            <a href="/privacy" data-nav class="text-brand-white hover:text-brand-primary transition-colors">Privacy Policy</a>
                            <a href="/terms" data-nav class="text-brand-white hover:text-brand-primary transition-colors">Terms of Service</a>
                            <a href="/security" data-nav class="text-brand-white hover:text-brand-primary transition-colors">Security</a>
                        </div>
                    </div>
                </div>

                <!-- Bottom Bar -->
                <div class="border-t border-brand-primary/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p class="text-brand-white/70 text-sm">&copy; ${new Date().getFullYear()} Olymp AI Invest. All rights reserved.</p>
                    
                    <!-- Social Links -->
                    <div class="flex items-center gap-6">
                        <a class="text-brand-white hover:text-brand-primary transition-colors">
                            <i class="fab fa-twitter text-xl"></i>
                        </a>
                        <a class="text-brand-white hover:text-brand-primary transition-colors">
                            <i class="fab fa-discord text-xl"></i>
                        </a>
                        <a class="text-brand-white hover:text-brand-primary transition-colors">
                            <i class="fab fa-telegram text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
        `
    })
}

export default Footer