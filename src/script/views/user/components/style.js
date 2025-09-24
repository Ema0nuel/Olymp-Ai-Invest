export default function StyleUserPage() {
    const style = /* html */ `
        <style>
            /* Reset and Base Styles */
            :root {
                --nav-height: 4rem;
                --header-height: 4rem;
                --safe-area: env(safe-area-inset-bottom, 0px);
                --address-bar: var(--address-bar-height, 0px);--vh: 1vh;
                --brand-black: #242424;
                --brand-primary: #f1d416;
            }

            /* Layout & Viewport Fixes */
            body {
                margin: 0;
                padding: 0;
                height: 100vh;
                height: calc(var(--vh, 1vh) * 100);
                overflow: hidden;
                position: fixed;
                width: 100%;
                -webkit-text-size-adjust: none !important;
                overscroll-behavior-y: none;
                -webkit-overflow-scrolling: touch;
                -webkit-tap-highlight-color: transparent;
                background-color: var(--brand-black);
                font-family: "BankFont", system-ui, -apple-system, sans-serif;
            }

            /* Prevent Zoom on Inputs */
            input, textarea {
                font-size: 16px !important;
                max-height: 100%;
                -webkit-text-size-adjust: 100% !important;
                transform: translateZ(0);
            }
            /* Select element fixes */
            select {
                -webkit-appearance: none;
                appearance: none;
                position: relative;
                z-index: 3;
                background-color: var(--brand-black);
                border: 1px solid rgba(255,255,255,0.1);
            }

            /* Prevent select dropdown from disappearing */
            .select-wrapper {
                position: relative;
                z-index: 100;
            }

            /* Smooth Transitions */
            .page-transition {
                animation: fadeIn 0.3s ease-out;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            /* Layout Structure */
            .main-scroll-view {
                position: fixed;
                top: var(--header-height);
                left: 0;
                right: 0;
                bottom: 0;
                overflow: auto;
                -webkit-overflow-scrolling: touch;
                padding: 1rem;
                padding-bottom: calc(1rem + var(--safe-area));
                transition: all 0.3s ease;
                z-index: 1;
                transform: translate3d(0,0,0);
                -webkit-transform: translate3d(0,0,0);
            }

            .mobile-nav-menu {
                position: fixed !important;
                left: 0 !important;
                right: 0 !important;
                top: cal(100vh - 4rem - env(safe-area-inset-bottom, 0px)) !important;
                width: 100% !important;
                height: calc(var(--nav-height) + var(--safe-area)) !important;
                background-color: var(--brand-black) !important;
                padding-bottom: var(--safe-area) !important;
                transition: transform 0.3s ease;
            }
            
            .dropdown-container,
            #notificationDropdown {
                z-index: 9999 !important;
            }

            /* Fix for input focus issues */
            .input-wrapper {
                transform: translateZ(0);
                -webkit-transform: translate3d(0,0,0);
                backface-visibility: hidden;
                position: relative;
                z-index: 2;
            }

            /* Prevent content disappearing */
            .content-wrapper {
                transform: translateZ(0);
                -webkit-transform: translate3d(0,0,0);
                backface-visibility: hidden;
                contain: paint;
            }

            /* Mobile Specific (< 768px) */
            @media (max-width: 768px) {
                .main-scroll-view {
                    padding-top: 4rem !important;
                    height: calc((var(--vh, 1vh) * 100) - var(--header-height) - var(--safe-area));
                    -webkit-mask-image: -webkit-radial-gradient(white, black);
                }

                /* Force hardware acceleration */
                body * {
                    -webkit-transform: translateZ(0);
                    -moz-transform: translateZ(0);
                    -ms-transform: translateZ(0);
                    -o-transform: translateZ(0);
                    transform: translateZ(0);
                }
            }

            /* Tablet (769px - 1023px) */
            @media (min-width: 769px) and (max-width: 1023px) {
                .main-scroll-view {
                    padding-top: 4rem !important;
                    height: calc((var(--vh, 1vh) * 100) - var(--header-height) - var(--safe-area));
                    -webkit-mask-image: -webkit-radial-gradient(white, black);
                }
            }

            /* Desktop (> 1024px) */
            @media (min-width: 1024px) {
                .main-scroll-view {
                    left: 5rem;
                    right: 1rem;
                    padding: 2rem;
                    padding-top: 0;
                    height: calc(100vh - var(--header-height));
                }

                .mobile-nav-menu {
                    display: none !important;
                }
            }
        </style>

        <script>
            ${handleStyle()}
        </script>
    `;

    return style;
}


function handleStyle() {
    const root = document.documentElement;
    let resizeTimeout;

    function updateViewport() {
        const vh = window.innerHeight * 0.01;
        root.style.setProperty('--vh', `${vh}px`);
    }

    function handleSelectFix() {
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.addEventListener('focus', () => {
                // Prevent scroll position loss
                const scrollView = document.querySelector('.main-scroll-view');
                const scrollPos = scrollView.scrollTop;

                select.addEventListener('blur', () => {
                    setTimeout(() => {
                        scrollView.scrollTop = scrollPos;
                    }, 0);
                }, { once: true });
            });
        });
    }

    // Initial setup
    updateViewport();
    handleSelectFix();

    // Event listeners
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateViewport, 100);
    }, { passive: true });

    window.addEventListener('orientationchange', () => {
        setTimeout(updateViewport, 100);
    }, { passive: true });

    // Re-run select fix when content changes
    const observer = new MutationObserver(handleSelectFix);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return '';
}