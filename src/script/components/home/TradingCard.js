import CardShape from '../../../images/assets/Card-Shape.png';
import TradeOn from '../../../images/assets/trade_on2.png';
import Star3 from '../../../images/assets/star3.png';
import Vector from '../../../images/assets/vector.png';
import Vector3 from '../../../images/assets/Vector-3.png';

const features = [
    "Charts trading",
    "Understanding Trading Strategies",
    "Risk Management in Trading",
    "Technical vs. Fundamental Analysis"
];


const TradingCard = () => {
    function pageEvents() {
        // Animate the card float and highlight on scroll
        const card = document.querySelector('.trading-card-float');
        if (card) {
            let lastScrollY = window.scrollY;
            let ticking = false;
            function onScroll() {
                lastScrollY = window.scrollY;
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        card.style.transform = `translateY(${lastScrollY * 0.05}px) scale(1.01)`;
                        ticking = false;
                    });
                    ticking = true;
                }
            }
            window.addEventListener('scroll', onScroll, { passive: true });
        }
        // Button ripple effect
        document.querySelectorAll('.trading-signup-btn').forEach(btn => {
            btn.addEventListener('mousedown', e => {
                btn.classList.add('active');
            });
            btn.addEventListener('mouseup', e => {
                btn.classList.remove('active');
            });
            btn.addEventListener('mouseleave', e => {
                btn.classList.remove('active');
            });
        });
    }

    return ({
        html: /* html */
            `
        <!-- Container -->
        <div class="mt-10 px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-6xl">
                <!-- Card -->
                <div class="rounded-2xl backdrop-blur transition-shadow">
                <!-- Responsive SVG frame (keeps 800x330 = 41.25% aspect) -->
                <div class="relative w-full">
                    <div class="pt-[41.25%]"></div>
                    <!-- Your SVG fills the frame -->
                    <svg
                    class="absolute inset-0 h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 800 330"
                    preserveAspectRatio="xMidYMid meet"
                    >
                    <defs>
                        <!-- Gradients for chart background -->
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#f0f9ff" stop-opacity="0.8"></stop>
                        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.2"></stop>
                        </linearGradient>

                        <!-- Line gradient with enhanced colors -->
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#4364F7"></stop>
                        <stop offset="33%" stop-color="#6FB1FC"></stop>
                        <stop offset="66%" stop-color="#3D84FF"></stop>
                        <stop offset="100%" stop-color="#4364F7"></stop>
                        <animate attributeName="x1" values="0%;20%;0%" dur="20s" repeatCount="indefinite"></animate>
                        <animate attributeName="x2" values="100%;80%;100%" dur="20s" repeatCount="indefinite"></animate>
                        </linearGradient>

                        <!-- Buy zone gradient with animation -->
                        <linearGradient id="buyZoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#4CAF50" stop-opacity="0.05"></stop>
                        <stop offset="100%" stop-color="#4CAF50" stop-opacity="0.2"></stop>
                        <animate attributeName="stop-opacity" values="0.05;0.1;0.05" dur="5s" repeatCount="indefinite" begin="0s"></animate>
                        </linearGradient>

                        <!-- Sell zone gradient with animation -->
                        <linearGradient id="sellZoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#F44336" stop-opacity="0.05"></stop>
                        <stop offset="100%" stop-color="#F44336" stop-opacity="0.2"></stop>
                        <animate attributeName="stop-opacity" values="0.05;0.1;0.05" dur="5s" repeatCount="indefinite" begin="2.5s"></animate>
                        </linearGradient>

                        <!-- Drop shadow -->
                        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"></feGaussianBlur>
                        <feOffset dx="1" dy="2"></feOffset>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3"></feFuncA>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode></feMergeNode>
                            <feMergeNode in="SourceGraphic"></feMergeNode>
                        </feMerge>
                        </filter>

                        <!-- Entry/Exit/TP glows -->
                        <filter id="entryGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="blurred"></feGaussianBlur>
                        <feFlood flood-color="#4CAF50" result="glowColor"></feFlood>
                        <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow"></feComposite>
                        <feMerge>
                            <feMergeNode in="softGlow"></feMergeNode>
                            <feMergeNode in="SourceGraphic"></feMergeNode>
                        </feMerge>
                        </filter>
                        <filter id="exitGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="blurred"></feGaussianBlur>
                        <feFlood flood-color="#F44336" result="glowColor"></feFlood>
                        <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow"></feComposite>
                        <feMerge>
                            <feMergeNode in="softGlow"></feMergeNode>
                            <feMergeNode in="SourceGraphic"></feMergeNode>
                        </feMerge>
                        </filter>
                        <filter id="tpGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="blurred"></feGaussianBlur>
                        <feFlood flood-color="#FFA000" result="glowColor"></feFlood>
                        <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow"></feComposite>
                        <feMerge>
                            <feMergeNode in="softGlow"></feMergeNode>
                            <feMergeNode in="SourceGraphic"></feMergeNode>
                        </feMerge>
                        </filter>

                        <!-- Moving average path & sparkle (kept as-is for your animations) -->
                        <path id="movingAveragePath" d="M50,140 L100,145 L150,155 L200,150 L250,145 L300,140 L350,135 L400,125 L450,120 L500,115 L550,105 L600,110 L650,100 L700,95 L750,90"></path>
                        <filter id="sparkle" x="-50%" y="-50%" width="200%" height="200%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="1" seed="1" result="noise"></feTurbulence>
                        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" result="coloredNoise"></feColorMatrix>
                        <feComposite operator="in" in="coloredNoise" in2="SourceGraphic"></feComposite>
                        </filter>
                    </defs>

                    <!-- Chart background -->
                    <rect x="50" y="30" width="700" height="250" fill="url(#chartGradient)" rx="5" ry="5" fill-opacity="0.4">
                        <animate attributeName="opacity" values="1;0.9;1" dur="10s" repeatCount="indefinite"></animate>
                    </rect>

                    <!-- Zones -->
                    <rect x="50" y="198" width="700" height="82" fill="url(#sellZoneGradient)" opacity="0.5">
                        <animate attributeName="y" values="198;208;203;198" dur="20s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="82;72;77;82" dur="20s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.5;0.6;0.5" dur="8s" repeatCount="indefinite"></animate>
                    </rect>
                    <rect x="50" y="70" width="700" height="60" fill="url(#buyZoneGradient)" opacity="0.5">
                        <animate attributeName="y" values="70;75;65;70" dur="20s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="60;55;65;60" dur="20s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.5;0.6;0.5" dur="8s" repeatCount="indefinite"></animate>
                    </rect>

                    <!-- SL/ENTRY lines + labels -->
                    <path d="M50,198 L750,198" stroke="#F44336" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.8">
                        <animate attributeName="d" values="M50,198 L750,198;M50,208 L750,208;M50,203 L750,203;M50,198 L750,198" dur="20s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-dasharray" values="5,3;6,4;5,3" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="5s" repeatCount="indefinite"></animate>
                    </path>
                    <text x="755" y="198" fill="#F44336" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="start">
                        SL
                        <animate attributeName="y" values="198;208;203;198" dur="20s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite"></animate>
                    </text>

                    <path d="M50,90 L750,90" stroke="#4CAF50" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.8">
                        <animate attributeName="d" values="M50,90 L750,90;M50,95 L750,95;M50,85 L750,85;M50,90 L750,90" dur="20s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-dasharray" values="5,3;6,4;5,3" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="5s" repeatCount="indefinite"></animate>
                    </path>
                    <text x="755" y="90" fill="#4CAF50" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="start">
                        ENTRY
                        <animate attributeName="y" values="90;95;85;90" dur="20s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite"></animate>
                    </text>

                    <!-- Grid -->
                    <g stroke="#e0e0e0" stroke-width="0.5" opacity="0.5">
                        <line x1="50" y1="70" x2="750" y2="70">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite"></animate>
                        </line>
                        <line x1="50" y1="110" x2="750" y2="110">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="1s"></animate>
                        </line>
                        <line x1="50" y1="150" x2="750" y2="150">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="2s"></animate>
                        </line>
                        <line x1="50" y1="190" x2="750" y2="190">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="3s"></animate>
                        </line>
                        <line x1="50" y1="230" x2="750" y2="230">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="4s"></animate>
                        </line>
                        <line x1="50" y1="270" x2="750" y2="270">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="5s"></animate>
                        </line>

                        <line x1="120" y1="30" x2="120" y2="280">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="0.5s"></animate>
                        </line>
                        <line x1="190" y1="30" x2="190" y2="280">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="1.5s"></animate>
                        </line>
                        <line x1="260" y1="30" x2="260" y2="280">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="2.5s"></animate>
                        </line>
                        <line x1="330" y1="30" x2="330" y2="280">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="3.5s"></animate>
                        </line>
                        <line x1="400" y1="30" x2="400" y2="280">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="4.5s"></animate>
                        </line>
                        <line x1="470" y1="30" x2="470" y2="280">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="5.5s"></animate>
                        </line>
                        <line x1="540" y1="30" x2="540" y2="280">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="6.5s"></animate>
                        </line>
                        <line x1="610" y1="30" x2="610" y2="280">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="7.5s"></animate>
                        </line>
                        <line x1="680" y1="30" x2="680" y2="280">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="15s" repeatCount="indefinite" begin="8.5s"></animate>
                        </line>
                    </g>

                    <!-- Moving average -->
                    <path d="M50,140 L100,145 L150,155 L200,150 L250,145 L300,140 L350,135 L400,125 L450,120 L500,115 L550,105 L600,110 L650,100 L700,95 L750,90" fill="none" stroke="#FFA000" stroke-width="2.5" stroke-dasharray="5,3" opacity="0.9">
                        <animate attributeName="d" values="M50,140 L100,145 L150,155 L200,150 L250,145 L300,140 L350,135 L400,125 L450,120 L500,115 L550,105 L600,110 L650,100 L700,95 L750,90;
                                        M50,145 L100,150 L150,160 L200,155 L250,150 L300,145 L350,140 L400,130 L450,125 L500,120 L550,110 L600,115 L650,105 L700,100 L750,95;
                                        M50,135 L100,140 L150,150 L200,145 L250,140 L300,135 L350,130 L400,120 L450,115 L500,110 L550,100 L600,105 L650,95 L700,90 L750,85;
                                        M50,140 L100,145 L150,155 L200,150 L250,145 L300,140 L350,135 L400,125 L450,120 L500,115 L550,105 L600,110 L650,100 L700,95 L750,90" dur="35s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-dasharray" values="5,3;6,2;5,3" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.9;0.7;0.9" dur="7s" repeatCount="indefinite"></animate>
                    </path>

                    <!-- Main line -->
                    <path d="M50,180 L100,150 L150,170 L200,130 L250,140 L300,110 L350,130 L400,80 L450,110 L500,90 L550,70 L600,90 L650,60 L700,80 L750,50" fill="none" stroke="url(#lineGradient)" stroke-width="3" filter="url(#dropShadow)">
                        <animate attributeName="d" values="M50,180 L100,150 L150,170 L200,130 L250,140 L300,110 L350,130 L400,80 L450,110 L500,90 L550,70 L600,90 L650,60 L700,80 L750,50;
                                        M50,170 L100,160 L150,150 L200,140 L250,120 L300,130 L350,100 L400,110 L450,90 L500,110 L550,80 L600,100 L650,70 L700,100 L750,60;
                                        M50,190 L100,140 L150,180 L200,120 L250,150 L300,100 L350,140 L400,70 L450,120 L500,80 L550,60 L600,80 L650,50 L700,90 L750,40;
                                        M50,170 L100,155 L150,165 L200,135 L250,145 L300,105 L350,135 L400,75 L450,105 L500,85 L550,65 L600,85 L650,55 L700,85 L750,45;
                                        M50,180 L100,150 L150,170 L200,130 L250,140 L300,110 L350,130 L400,80 L450,110 L500,90 L550,70 L600,90 L650,60 L700,80 L750,50" dur="40s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-width" values="3;3.5;3" dur="8s" repeatCount="indefinite"></animate>
                    </path>

                    <!-- Filled area -->
                    <path d="M50,180 L100,150 L150,170 L200,130 L250,140 L300,110 L350,130 L400,80 L450,110 L500,90 L550,70 L600,90 L650,60 L700,80 L750,50 L750,280 L50,280 Z" fill="url(#chartGradient)" fill-opacity="0.3">
                        <animate attributeName="d" values="M50,180 L100,150 L150,170 L200,130 L250,140 L300,110 L350,130 L400,80 L450,110 L500,90 L550,70 L600,90 L650,60 L700,80 L750,50 L750,280 L50,280 Z;
                                        M50,170 L100,160 L150,150 L200,140 L250,120 L300,130 L350,100 L400,110 L450,90 L500,110 L550,80 L600,100 L650,70 L700,100 L750,60 L750,280 L50,280 Z;
                                        M50,190 L100,140 L150,180 L200,120 L250,150 L300,100 L350,140 L400,70 L450,120 L500,80 L550,60 L600,80 L650,50 L700,90 L750,40 L750,280 L50,280 Z;
                                        M50,170 L100,155 L150,165 L200,135 L250,145 L300,105 L350,135 L400,75 L450,105 L500,85 L550,65 L600,85 L650,55 L700,85 L750,45 L750,280 L50,280 Z;
                                        M50,180 L100,150 L150,170 L200,130 L250,140 L300,110 L350,130 L400,80 L450,110 L500,90 L550,70 L600,90 L650,60 L700,80 L750,50 L750,280 L50,280 Z" dur="40s" repeatCount="indefinite"></animate>
                        <animate attributeName="fill-opacity" values="0.3;0.2;0.4;0.3" dur="15s" repeatCount="indefinite"></animate>
                    </path>

                    <!-- Candles (green/red), entry/exit, TP markers, axis labels, volume bars, title -->
                    <!-- (All your original elements preserved below) -->
                    <!-- Green candles -->
                    <g class="candlestick green">
                        <rect x="80" y="170" width="10" height="30" fill="#4CAF50" opacity="0.9">
                        <animate attributeName="y" values="170;165;175;168;170" dur="8s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="30;35;25;32;30" dur="8s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite"></animate>
                        </rect>
                        <line x1="85" y1="160" x2="85" y2="210" stroke="#4CAF50" stroke-width="1.5">
                        <animate attributeName="y1" values="160;155;165;158;160" dur="8s" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" values="210;215;205;212;210" dur="8s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-width" values="1.5;2;1.5" dur="4s" repeatCount="indefinite"></animate>
                        </line>
                    </g>

                    <g class="candlestick green">
                        <rect x="150" y="140" width="10" height="40" fill="#4CAF50" opacity="0.9">
                        <animate attributeName="y" values="140;135;145;138;140" dur="12s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="40;45;35;42;40" dur="12s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="6s" repeatCount="indefinite"></animate>
                        </rect>
                        <line x1="155" y1="130" x2="155" y2="190" stroke="#4CAF50" stroke-width="1.5">
                        <animate attributeName="y1" values="130;125;135;128;130" dur="12s" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" values="190;195;185;192;190" dur="12s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-width" values="1.5;2;1.5" dur="6s" repeatCount="indefinite"></animate>
                        </line>
                    </g>

                    <g class="candlestick green">
                        <rect x="220" y="150" width="10" height="25" fill="#4CAF50" opacity="0.9">
                        <animate attributeName="y" values="150;145;155;148;150" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="25;30;20;27;25" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="5s" repeatCount="indefinite"></animate>
                        </rect>
                        <line x1="225" y1="140" x2="225" y2="180" stroke="#4CAF50" stroke-width="1.5">
                        <animate attributeName="y1" values="140;135;145;138;140" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" values="180;185;175;182;180" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-width" values="1.5;2;1.5" dur="5s" repeatCount="indefinite"></animate>
                        </line>
                    </g>

                    <g class="candlestick green">
                        <rect x="290" y="120" width="10" height="35" fill="#4CAF50" opacity="0.9">
                        <animate attributeName="y" values="120;115;125;118;120" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="35;40;30;37;35" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="4.5s" repeatCount="indefinite"></animate>
                        </rect>
                        <line x1="295" y1="110" x2="295" y2="160" stroke="#4CAF50" stroke-width="1.5">
                        <animate attributeName="y1" values="110;105;115;108;110" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" values="160;165;155;162;160" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-width" values="1.5;2;1.5" dur="4.5s" repeatCount="indefinite"></animate>
                        </line>
                    </g>

                    <g class="candlestick green">
                        <rect x="430" y="90" width="10" height="30" fill="#4CAF50" opacity="0.9">
                        <animate attributeName="y" values="90;85;95;88;90" dur="11s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="30;35;25;32;30" dur="11s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="5.5s" repeatCount="indefinite"></animate>
                        </rect>
                        <line x1="435" y1="80" x2="435" y2="130" stroke="#4CAF50" stroke-width="1.5">
                        <animate attributeName="y1" values="80;75;85;78;80" dur="11s" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" values="130;135;125;132;130" dur="11s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-width" values="1.5;2;1.5" dur="5.5s" repeatCount="indefinite"></animate>
                        </line>
                    </g>

                    <g class="candlestick green">
                        <rect x="570" y="80" width="10" height="35" fill="#4CAF50" opacity="0.9">
                        <animate attributeName="y" values="80;75;85;78;80" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="35;40;30;37;35" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="5s" repeatCount="indefinite"></animate>
                        </rect>
                        <line x1="575" y1="70" x2="575" y2="125" stroke="#4CAF50" stroke-width="1.5">
                        <animate attributeName="y1" values="70;65;75;68;70" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" values="125;130;120;127;125" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-width" values="1.5;2;1.5" dur="5s" repeatCount="indefinite"></animate>
                        </line>
                    </g>

                    <g class="candlestick green">
                        <rect x="710" y="90" width="10" height="25" fill="#4CAF50" opacity="0.9">
                        <animate attributeName="y" values="90;85;95;88;90" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="25;30;20;27;25" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="4.5s" repeatCount="indefinite"></animate>
                        </rect>
                        <line x1="715" y1="80" x2="715" y2="125" stroke="#4CAF50" stroke-width="1.5">
                        <animate attributeName="y1" values="80;75;85;78;80" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" values="125;130;120;127;125" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-width" values="1.5;2;1.5" dur="4.5s" repeatCount="indefinite"></animate>
                        </line>
                    </g>

                    <!-- Red candles -->
                    <g class="candlestick red">
                        <rect x="360" y="120" width="10" height="30" fill="#F44336" opacity="0.9">
                        <animate attributeName="y" values="120;115;125;118;120" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="30;35;25;32;30" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="5s" repeatCount="indefinite"></animate>
                        </rect>
                        <line x1="365" y1="110" x2="365" y2="160" stroke="#F44336" stroke-width="1.5">
                        <animate attributeName="y1" values="110;105;115;108;110" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" values="160;165;155;162;160" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-width" values="1.5;2;1.5" dur="5s" repeatCount="indefinite"></animate>
                        </line>
                    </g>

                    <g class="candlestick red">
                        <rect x="500" y="110" width="10" height="35" fill="#F44336" opacity="0.9">
                        <animate attributeName="y" values="110;105;115;108;110" dur="11s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="35;40;30;37;35" dur="11s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="5.5s" repeatCount="indefinite"></animate>
                        </rect>
                        <line x1="505" y1="100" x2="505" y2="155" stroke="#F44336" stroke-width="1.5">
                        <animate attributeName="y1" values="100;95;105;98;100" dur="11s" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" values="155;160;150;157;155" dur="11s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-width" values="1.5;2;1.5" dur="5.5s" repeatCount="indefinite"></animate>
                        </line>
                    </g>

                    <g class="candlestick red">
                        <rect x="640" y="70" width="10" height="30" fill="#F44336" opacity="0.9">
                        <animate attributeName="y" values="70;65;75;68;70" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="height" values="30;35;25;32;30" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="4.5s" repeatCount="indefinite"></animate>
                        </rect>
                        <line x1="645" y1="60" x2="645" y2="110" stroke="#F44336" stroke-width="1.5">
                        <animate attributeName="y1" values="60;55;65;58;60" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" values="110;115;105;112;110" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-width" values="1.5;2;1.5" dur="4.5s" repeatCount="indefinite"></animate>
                        </line>
                    </g>

                    <!-- Entry / Exit -->
                    <circle cx="170" cy="90" r="6" fill="#4CAF50" stroke="#FFFFFF" stroke-width="1.5" filter="url(#entryGlow)">
                        <animate attributeName="r" values="6;7;6" dur="3s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite"></animate>
                    </circle>
                    <text x="170" y="80" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#4CAF50" text-anchor="middle">
                        ENTRY
                        <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite"></animate>
                    </text>

                    <circle cx="575" cy="60" r="6" fill="#F44336" stroke="#FFFFFF" stroke-width="1.5" filter="url(#exitGlow)">
                        <animate attributeName="r" values="6;7;6" dur="3s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite"></animate>
                    </circle>
                    <text x="575" y="50" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#F44336" text-anchor="middle">
                        EXIT
                        <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite"></animate>
                    </text>

                    <!-- TP points -->
                    <circle cx="400" cy="70" r="6" fill="#FFA000" stroke="#FFFFFF" stroke-width="1.5" filter="url(#tpGlow)">
                        <animate attributeName="r" values="6;7;6" dur="3s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite"></animate>
                    </circle>
                    <text x="400" y="60" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#FFA000" text-anchor="middle">
                        TP1
                        <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite"></animate>
                    </text>

                    <circle cx="640" cy="50" r="6" fill="#FFA000" stroke="#FFFFFF" stroke-width="1.5" filter="url(#tpGlow)">
                        <animate attributeName="r" values="6;7;6" dur="3s" repeatCount="indefinite"></animate>
                        <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite"></animate>
                    </circle>
                    <text x="640" y="40" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#FFA000" text-anchor="middle">
                        TP2
                        <animate attributeName="opacity" values="1;0.8;1" dur="3s" repeatCount="indefinite"></animate>
                    </text>

                    <!-- Axis labels -->
                    <text x="50" y="300" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666">
                        Apr 15
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite"></animate>
                    </text>
                    <text x="190" y="300" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666">
                        Apr 22
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite" begin="0.5s"></animate>
                    </text>
                    <text x="330" y="300" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666">
                        Apr 29
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite" begin="1s"></animate>
                    </text>
                    <text x="470" y="300" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666">
                        May 6
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite" begin="1.5s"></animate>
                    </text>
                    <text x="610" y="300" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666">
                        May 13
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite" begin="2s"></animate>
                    </text>
                    <text x="750" y="300" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666">
                        May 20
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite" begin="2.5s"></animate>
                    </text>

                    <!-- Price labels -->
                    <text x="30" y="70" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666" text-anchor="end">
                        1.0850
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite"></animate>
                    </text>
                    <text x="30" y="110" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666" text-anchor="end">
                        1.0800
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite" begin="0.5s"></animate>
                    </text>
                    <text x="30" y="150" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666" text-anchor="end">
                        1.0750
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite" begin="1s"></animate>
                    </text>
                    <text x="30" y="190" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666" text-anchor="end">
                        1.0700
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite" begin="1.5s"></animate>
                    </text>
                    <text x="30" y="230" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666" text-anchor="end">
                        1.0650
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite" begin="2s"></animate>
                    </text>
                    <text x="30" y="270" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#666666" text-anchor="end">
                        1.0600
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite" begin="2.5s"></animate>
                    </text>

                    <!-- Title -->
                    <text x="400" y="20" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#fff" text-anchor="middle">
                        We are Expert in Trading
                        <animate attributeName="opacity" values="1;0.8;1" dur="5s" repeatCount="indefinite"></animate>
                    </text>

                    <!-- Volume bars -->
                    <g transform="translate(0, 250)">
                        <rect x="80" y="5" width="10" height="15" fill="#4CAF50" opacity="0.6">
                        <animate attributeName="height" values="15;18;15" dur="8s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" values="5;2;5" dur="8s" repeatCount="indefinite"></animate>
                        </rect>
                        <rect x="150" y="2" width="10" height="18" fill="#4CAF50" opacity="0.6">
                        <animate attributeName="height" values="18;22;18" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" values="2;-2;2" dur="9s" repeatCount="indefinite"></animate>
                        </rect>
                        <rect x="220" y="8" width="10" height="12" fill="#4CAF50" opacity="0.6">
                        <animate attributeName="height" values="12;15;12" dur="7s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" values="8;5;8" dur="7s" repeatCount="indefinite"></animate>
                        </rect>
                        <rect x="290" y="3" width="10" height="17" fill="#4CAF50" opacity="0.6">
                        <animate attributeName="height" values="17;20;17" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" values="3;0;3" dur="10s" repeatCount="indefinite"></animate>
                        </rect>
                        <rect x="360" y="10" width="10" height="10" fill="#F44336" opacity="0.6">
                        <animate attributeName="height" values="10;13;10" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" values="10;7;10" dur="9s" repeatCount="indefinite"></animate>
                        </rect>
                        <rect x="430" y="4" width="10" height="16" fill="#4CAF50" opacity="0.6">
                        <animate attributeName="height" values="16;19;16" dur="8s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" values="4;1;4" dur="8s" repeatCount="indefinite"></animate>
                        </rect>
                        <rect x="500" y="9" width="10" height="11" fill="#F44336" opacity="0.6">
                        <animate attributeName="height" values="11;14;11" dur="7s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" values="9;6;9" dur="7s" repeatCount="indefinite"></animate>
                        </rect>
                        <rect x="570" y="5" width="10" height="15" fill="#4CAF50" opacity="0.6">
                        <animate attributeName="height" values="15;18;15" dur="9s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" values="5;2;5" dur="9s" repeatCount="indefinite"></animate>
                        </rect>
                        <rect x="640" y="6" width="10" height="14" fill="#F44336" opacity="0.6">
                        <animate attributeName="height" values="14;17;14" dur="8s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" values="6;3;6" dur="8s" repeatCount="indefinite"></animate>
                        </rect>
                        <rect x="710" y="4" width="10" height="16" fill="#4CAF50" opacity="0.6">
                        <animate attributeName="height" values="16;19;16" dur="10s" repeatCount="indefinite"></animate>
                        <animate attributeName="y" values="4;1;4" dur="10s" repeatCount="indefinite"></animate>
                        </rect>
                    </g>
                    </svg>
                </div>
                </div>
            </div>
        </div>
        <!-- Card Highlight -->
        <section class="relative py-20 lg:py-28 overflow-hidden">
            <div class="absolute inset-0 -z-10 pointer-events-none select-none">
                <img src="${Star3}" alt="star" class="absolute top-5 right-5 animate-float hidden 2xl:block w-12 h-12" />
                <img src="${Vector}" alt="vector" class="absolute top-10 left-5 animate-float hidden 2xl:block w-16" />
                <img src="${Vector3}" alt="vector3" class="absolute bottom-0 right-0 animate-float hidden lg:block w-40" />
            </div>
            <div class="container mx-auto px-4">
                <div class="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                    <div class="flex justify-center lg:justify-end w-full lg:w-1/2">
                        <img src="${TradeOn}" alt="Trading platform" class="max-w-full rounded-xl animate-float" />
                    </div>
                    <div class="w-full lg:w-1/2 space-y-6">
                        <span class="text-brand-primary text-sm font-semibold uppercase tracking-wide">Trade On Our</span>
                        <h3 class="text-3xl lg:text-4xl font-bold leading-tight text-brand-black dark:text-brand-white">World Class Platform</h3>
                        <p class="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                            Trading in financial markets involves a wide range of strategies that traders employ 
                            to make informed decisions. From day trading to swing trading and long-term investing, 
                            each strategy has its own set of principles and risk factors.
                        </p>
                        <ul class="space-y-4 mt-6">
                            ${features.map(f => `
                                <li class="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
                                    <i class="fas fa-circle-check text-brand-primary text-xl"></i>
                                    ${f}
                                </li>
                            `).join('')}
                        </ul>
                        <a href="/signup" data-nav class="trading-signup-btn inline-flex items-center gap-2 bg-brand-primary text-brand-blue font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-brand-primary/90 transition-all mt-6 active:scale-95"
                            style="transition: box-shadow 0.2s, background 0.2s;">
                            Sign Up Now
                            <i class="fas fa-arrow-right text-lg"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <style>
            .animate-float {
                animation: float 5s ease-in-out infinite;
            }
            @keyframes float {
                0%,100% { transform: translateY(0px);}
                50% { transform: translateY(-12px);}
            }
            .trading-signup-btn.active {
                box-shadow: 0 0 0 4px #f1d41633;
                background: linear-gradient(90deg,#f1d416 60%,#4364F7 100%);
            }
            .trading-card-float {
                transition: transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s;
            }
        </style>
    `,
        pageEvents
    })
}

export default TradingCard