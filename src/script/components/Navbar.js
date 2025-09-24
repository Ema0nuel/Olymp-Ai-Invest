import Logo from '/src/images/logo.jpg'

const Navbar = () => {
    function pageEvents() {
        const navbar = {
            menu: document.querySelector('[data-mobile-menu]'),
            button: document.querySelector('[data-menu-button]'),
            icon: document.querySelector('[data-menu-icon]'),
            backdrop: document.querySelector('[data-backdrop]')
        }

        // Toggle mobile menu states
        const toggleMenu = (isOpen) => {
            navbar.button.setAttribute('aria-expanded', isOpen)
            navbar.menu.classList.toggle('translate-y-0', isOpen)
            navbar.backdrop.classList.toggle('opacity-0', !isOpen)
            navbar.backdrop.classList.toggle('pointer-events-none', !isOpen)
            navbar.icon.classList.toggle('rotate-180', isOpen)
        }

        // Handle menu button click
        navbar.button?.addEventListener('click', () => {
            const isExpanded = navbar.button.getAttribute('aria-expanded') === 'true'
            toggleMenu(!isExpanded)
        })

        // Close menu on backdrop click
        navbar.backdrop?.addEventListener('click', () => toggleMenu(false))
    }

    return ({
        html: /* html */`
        <header class="navbar-h top-0 left-0 w-full z-50">
            <!-- Navbar Backdrop -->
            <div class="absolute inset-0 backdrop-blur-2xl"></div>
            
            <!-- Main Navigation -->
            <nav class="container mx-auto px-4 py-4 relative">
                <div class="flex items-center justify-between">
                    <!-- Brand Logo -->
                    <a href="/" data-nav class="flex items-center gap-3 group">
                        <img src="${Logo}" alt="Olymp AI Invest" class="h-8 w-auto transition-transform group-hover:scale-110">
                        <span class="text-brand-primary font-bold text-xl">Olymp AI</span>
                    </a>

                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex items-center gap-8">
                        <a href="/" data-nav 
                           class="text-brand-white hover:text-brand-primary transition-all hover:translate-y-[-2px]">
                           Home
                        </a>
                        <a href="/markets" data-nav 
                           class="text-brand-white hover:text-brand-primary transition-all hover:translate-y-[-2px]">
                           Markets
                        </a>
                        <a href="/trading" data-nav 
                           class="text-brand-white hover:text-brand-primary transition-all hover:translate-y-[-2px]">
                           Trading
                        </a>
                        <a href="/about" data-nav 
                           class="text-brand-white hover:text-brand-primary transition-all hover:translate-y-[-2px]">
                           About
                        </a>
                        <a href="/education" data-nav 
                           class="text-brand-white hover:text-brand-primary transition-all hover:translate-y-[-2px]">
                           Education
                        </a>
                    </div>

                    <!-- Auth Buttons -->
                    <div class="hidden md:flex items-center gap-4">
                        <a href="/login" data-nav 
                           class="text-brand-primary font-semibold hover:opacity-80 transition-all hover:translate-y-[-2px]">
                           Login
                        </a>
                        <a href="/register" data-nav 
                           class="bg-brand-primary text-brand-blue px-6 py-2.5 rounded-xl font-semibold 
                            hover:opacity-90 transition-all hover:translate-y-[-2px] hover:shadow-lg 
                            hover:shadow-brand-primary/20 active:translate-y-[0px]">
                           Register
                        </a>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button data-menu-button 
                            aria-expanded="false"
                            class="md:hidden relative z-50 p-2 text-brand-white hover:text-brand-primary transition-colors"
                            aria-label="Toggle menu">
                        <svg data-menu-icon 
                             class="w-6 h-6 transition-transform duration-300"
                             fill="none" 
                             stroke="currentColor" 
                             viewBox="0 0 24 24">
                            <path stroke-linecap="round" 
                                  stroke-linejoin="round"
                                  stroke-width="2" 
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>

                <!-- Mobile Menu Overlay -->
                <div data-backdrop 
                     class="fixed inset-0 backdrop-blur-2xl bg-[#ffffff] opacity-0 
                            pointer-events-none transition-all duration-300 md:hidden"
                     style="z-index: 40;">
                </div>

                <!-- Mobile Menu Content -->
                <div data-mobile-menu 
                     class="fixed inset-x-0 -top-[10px] -translate-y-full transition-transform 
                            duration-300 ease-out bg-[#ffffff] md:hidden nav-mobile"
                     style="z-index: 45;">
                    <div class="container mx-auto px-4 py-8">
                        <div class="flex flex-col gap-6">
                            <a href="/" data-nav 
                               class="text-md font-medium text-brand-white hover:text-brand-primary 
                                      transition-all hover:translate-x-2">
                               Home
                            </a>
                            <a href="/markets" data-nav 
                               class="text-md font-medium text-brand-white hover:text-brand-primary 
                                      transition-all hover:translate-x-2">
                               Markets
                            </a>
                            <a href="/trading" data-nav 
                               class="text-md font-medium text-brand-white hover:text-brand-primary 
                                      transition-all hover:translate-x-2">
                               Trading
                            </a>
                            <a href="/about" data-nav 
                               class="text-md font-medium text-brand-white hover:text-brand-primary 
                                      transition-all hover:translate-x-2">
                               About
                            </a>
                            <a href="/education" data-nav 
                               class="text-md font-medium text-brand-white hover:text-brand-primary 
                                      transition-all hover:translate-x-2">
                               Education
                            </a>
                       <a href="/login" data-nav 
                                   class="text-md text-brand-primary font-semibold hover:opacity-80 
                                          transition-all hover:translate-x-2">
                                   Login
                                </a>
                                <a href="/register" data-nav 
                                   class="bg-brand-primary text-brand-blue px-6 py-4 rounded-xl 
                                          font-semibold hover:opacity-90 transition-all hover:translate-x-2 
                                          text-center text-md active:translate-x-0">
                                   Register
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        `,
        pageEvents
    })
}

export default Navbar