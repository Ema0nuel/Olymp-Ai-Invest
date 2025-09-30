import{N as g,F as x}from"./Navbar-DHujhqfN.js";import{a as h,b as v}from"./reset-3f-UIG5W.js";import{t as y}from"./analtics-7M16VRr7.js";import"./logo-9_xFcp4C.js";import"./supabaseClients-Fr4pJEim.js";import"./index-BXoOFHK0.js";function w(t,e,i,u){let n=null;const r=o=>{n||(n=o);const s=Math.min((o-n)/u,1),l=S(s),d=Math.floor(l*(i-e)+e);t.textContent=d.toLocaleString(),s<1&&window.requestAnimationFrame(r)};window.requestAnimationFrame(r)}function S(t){return t===1?1:1-Math.pow(2,-10*t)}const k="/assets/Image-3-NzSJC7gb.webp",T="/assets/image__11__360-CDvSYtDb.webp",$="/assets/image__10__360-CfMmeyaz.webp",A="/assets/image__8__360--MAjqdZ7.webp",D=async()=>{h("About Olymp AI Invest"),v(),await y();const{html:t,pageEvents:e}=g();function i(){e(),document.querySelectorAll(".video-player").forEach(a=>{a.play().catch(()=>{})});const n=[{el:".crypto-traded",end:245e4},{el:".countries-count",end:195},{el:".users-count",end:35e4},{el:".daily-volume",end:89e7}],r=new IntersectionObserver(a=>{a.forEach(m=>{m.isIntersecting&&(n.forEach(c=>{const f=document.querySelector(c.el);f&&w(f,0,c.end,2e3)}),r.disconnect())})},{threshold:.5}),o=document.querySelector(".stats-section");o&&r.observe(o);let s=0;const l=document.querySelectorAll(".testimonial-slide"),d=l.length;function p(a){l.forEach((m,c)=>{m.style.transform=`translateX(${100*(c-a)}%)`})}function b(){s=(s+1)%d,p(s)}setInterval(b,5e3),p(0),document.querySelectorAll(".mission-card").forEach(a=>{a.addEventListener("mouseenter",()=>{a.classList.add("scale-105")}),a.addEventListener("mouseleave",()=>{a.classList.remove("scale-105")})})}return{html:`
        <main class="flex flex-col min-h-screen animate-fade-in-up">
            ${t}
            
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
                        ${j()}
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
                        ${_()}
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
                        ${C()}
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
                        ${I()}
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

            ${x().html}
        </main>
        `,pageEvents:i}};function j(){return[{number:245e4,label:"Trading Volume",suffix:"M+",icon:"chart-line",className:"crypto-traded"},{number:195,label:"Countries Served",suffix:"+",icon:"globe",className:"countries-count"},{number:35e5,label:"Active Users",suffix:"+",icon:"users",className:"users-count"},{number:89e7,label:"Daily Volume",suffix:"$",icon:"dollar-sign",className:"daily-volume"}].map(e=>`
        <div class="text-center p-6 rounded-xl border border-brand-blue/20">
            <div class="inline-flex items-center justify-center w-16 h-16 mb-4 
                        rounded-full bg-brand-primary/10 text-brand-primary">
                <i class="fas fa-${e.icon} text-2xl"></i>
            </div>
            <div class="text-4xl font-bold text-brand-white mb-2">
                ${e.suffix}<span class="${e.className}">0</span>
            </div>
            <p class="text-gray-400">${e.label}</p>
        </div>
    `).join("")}function _(){return[{title:"Lightning Fast Execution",description:"Experience sub-millisecond trade execution with our advanced matching engine",icon:"bolt"},{title:"Bank-Grade Security",description:"Multi-signature wallets and 95% cold storage protection for your assets",icon:"shield-alt"},{title:"24/7 Support",description:"Round-the-clock customer support in multiple languages",icon:"headset"},{title:"Advanced Trading Tools",description:"Professional-grade charts, indicators, and trading features",icon:"chart-bar"},{title:"Global Liquidity",description:"Deep liquidity pools and competitive spreads across all pairs",icon:"water"},{title:"Regulatory Compliance",description:"Full compliance with global financial regulations and standards",icon:"check-circle"}].map(e=>`
        <div class="mission-card p-6 rounded-xl border border-brand-blue/20 
                    transition-all duration-300 hover:border-brand-primary/50">
            <div class="inline-flex items-center justify-center w-12 h-12 mb-4 
                        rounded-full bg-brand-primary/10 text-brand-primary">
                <i class="fas fa-${e.icon}"></i>
            </div>
            <h3 class="text-xl font-bold text-brand-white mb-3">${e.title}</h3>
            <p class="text-gray-400">${e.description}</p>
        </div>
    `).join("")}function C(){return[{name:"Sarah Chen",role:"Chief Executive Officer",image:"621506e9a11837673cf2f28f_Christopher-Oster.jpg",icons:["linkedin","twitter"]},{name:"James Rodriguez",role:"Chief Technology Officer",image:"621506e9a118373739f2f29d_Patrick-Pöschl.jpg",icons:["linkedin","github"]},{name:"Elena Petrov",role:"Head of Trading",image:"621506e9a11837e7c2f2f295_Florian-Gschwandtner.jpg",icons:["linkedin"]},{name:"Michael Chang",role:"Security Director",image:"621506e9a1183703a8f2f299_Frank-Westermann.jpg",icons:["linkedin","github"]},{name:"Laura Schmidt",role:"Product Manager",image:"621506e9a11837d6daf2f298_Johann.jpg",icons:["linkedin","twitter"]},{name:"David Kim",role:"Head of Operations",image:"621506e9a11837e7c1f2f297_High-Tech-Grunderfonds.jpg",icons:["linkedin"]}].map(e=>`
        <div class="rounded-xl overflow-hidden border border-brand-blue/20 transition-all duration-300 
                    hover:border-brand-primary/50 bg-gradient-to-b from-transparent to-brand-blue/5">
            <img src="https://assets.website-files.com/621506e9a1183766b5f2f1f7/${e.image}" 
                 alt="${e.name}" 
                 class="w-full h-48 object-cover"
            >
            <div class="p-6">
                <h3 class="text-xl font-bold text-brand-white mb-1">${e.name}</h3>
                <p class="text-gray-400 mb-4">${e.role}</p>
                <div class="flex gap-4">
                    ${e.icons.map(i=>`
                        <span class="text-brand-primary hover:text-brand-white cursor-pointer transition-colors">
                            <i class="fab fa-${i} text-lg"></i>
                        </span>
                    `).join("")}
                </div>
            </div>
        </div>
    `).join("")}function I(){return[{name:"Rachael L.",role:"Professional Trader",quote:"The execution speed and reliability of Olymp AI Invest is unmatched. It's become my go-to platform for all trading activities.",image:k},{name:"Sophie L.",role:"Institutional Investor",quote:"Outstanding security features and professional tools. The customer support team is exceptionally knowledgeable.",image:T},{name:"Robert K.",role:"Retail Trader",quote:"As a beginner, the platform's intuitive interface and educational resources helped me start trading with confidence.",image:$},{name:"James Carrier",role:"Institutional Lecturer",quote:"After so many efforts, finally found the best true path to financial freedom, creating a new path to change my life dynamically opening a route to success",image:A}].map((e,i)=>`
        <div class="testimonial-slide absolute w-full transition-transform duration-500 ease-out">
            <div class="max-w-2xl mx-auto">
                <div class="flex flex-col items-center text-center p-6">
                    <img src="${e.image}" 
                         alt="${e.name}"
                         class="w-20 h-20 rounded-full mb-6 border-4 border-brand-primary"
                    >
                    <blockquote class="text-xl text-gray-300 mb-6">
                        "${e.quote}"
                    </blockquote>
                    <cite class="text-brand-white font-bold block">${e.name}</cite>
                    <span class="text-gray-400">${e.role}</span>
                </div>
            </div>
        </div>
    `).join("")}export{D as default};
//# sourceMappingURL=about-D0efTM94.js.map
