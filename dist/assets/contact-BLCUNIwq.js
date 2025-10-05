import{N as s,F as i}from"./Navbar-DHujhqfN.js";import{a as o,b as l}from"./reset-3f-UIG5W.js";import{t as d}from"./toastify-C88f8oFV.js";import{l as c}from"./index-Blc0Txpr.js";import{t as m}from"./analtics-CjlshyU7.js";import"./logo-9_xFcp4C.js";import"./supabaseClients-B0wRxRlI.js";const b="/assets/investor-CxC0XNjZ.png",p=[{name:"Facebook",icon:"fab fa-facebook-f"},{name:"Twitter",icon:"fab fa-twitter"},{name:"Youtube",icon:"fab fa-youtube"},{name:"Linkedin",icon:"fab fa-linkedin-in"},{name:"Instagram",icon:"fab fa-instagram"}],w=async()=>{o("Olymp AI Invests Trades"),l(),await m();const{html:a,pageEvents:t}=s();function r(){t();const e=document.getElementById("contactForm");e&&e.addEventListener("submit",async function(n){n.preventDefault(),d({text:"Your message has been sent successfully!",icon:"fas fa-paper-plane"}),e.reset(),setTimeout(async()=>await c("home"),2500)})}return{html:`
        ${a}
        <!-- Banner Section -->
        <section class="relative bg-cover bg-center py-20" style="background-image: url('https://softivus.com/wp/tradly/wp-content/uploads/2025/05/Breadcrumbs-Area-1-min.png')">
            <div class="absolute inset-0 bg-black/70"></div>
            <div class="container mx-auto px-4 relative z-10">
                <div class="text-center">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Contact</h2>
                    <nav aria-label="breadcrumb" class="flex justify-center mb-2">
                        <ol class="flex gap-2 text-gray-300 text-sm">
                            <li><a href="/" data-nav class="hover:text-brand-primary">Home</a></li>
                            <li>&gt;</li>
                            <li class="text-brand-primary">Contact</li>
                        </ol>
                    </nav>
                    <p class="text-lg text-gray-200 max-w-xl mx-auto mt-4">For business plan submissions or support, please use the form below or reach us directly.</p>
                </div>
            </div>
        </section>

        <!-- Contact Info & Socials -->
        <section class="py-16 bg-brand-blue/5">
            <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 class="text-2xl font-bold text-white mb-4">Business submissions</h3>
                    <p class="text-gray-300 mb-6">For business plan submissions. Please submit using this contact form or email us directly.</p>
                    <div class="flex items-center gap-6 mb-6">
                        <span class="inline-flex items-center gap-2 bg-brand-primary/20 rounded-full px-4 py-2 text-brand-primary font-semibold">
                            <i class="fas fa-envelope"></i> olympaiinvest@gmail.com
                        </span>
                        <span class="inline-flex items-center gap-2 bg-brand-primary/20 rounded-full px-4 py-2 text-brand-primary font-semibold">
                            <i class="fas fa-phone"></i> +12139160359
                        </span>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-3">Our social media</h3>
                    <div class="flex gap-4">
                        ${p.map(e=>`
                            <a data-nav class="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-brand-blue transition-all">
                                <i class="${e.icon} text-lg"></i>
                            </a>
                        `).join("")}
                    </div>
                </div>
                <div>
                    <img src="${b}" alt="Contact" class="w-full rounded-2xl shadow-lg border-2 border-brand-primary/30">
                </div>
            </div>
        </section>

        <!-- Contact Form -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <div class="max-w-2xl mx-auto rounded-2xl p-8">
                    <h3 class="text-2xl font-bold text-white mb-6">Enquiry Form</h3>
                    <form id="contactForm" autocomplete="off" class="grid grid-cols-1 gap-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" name="firstName" required maxlength="100" placeholder="First Name" class="px-4 py-3 rounded-xl bg-brand-black/80 text-white border border-brand-primary/30 focus:border-brand-primary outline-none transition-all" />
                            <input type="text" name="lastName" required maxlength="100" placeholder="Last Name" class="px-4 py-3 rounded-xl bg-brand-black/80 text-white border border-brand-primary/30 focus:border-brand-primary outline-none transition-all" />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="email" name="email" required maxlength="100" placeholder="Email" class="px-4 py-3 rounded-xl bg-brand-black/80 text-white border border-brand-primary/30 focus:border-brand-primary outline-none transition-all" />
                            <input type="tel" name="phone" required maxlength="20" placeholder="Phone" class="px-4 py-3 rounded-xl bg-brand-black/80 text-white border border-brand-primary/30 focus:border-brand-primary outline-none transition-all" />
                        </div>
                        <textarea name="message" rows="4" maxlength="400" required placeholder="Message" class="px-4 py-3 rounded-xl bg-brand-black/80 text-white border border-brand-primary/30 focus:border-brand-primary outline-none transition-all"></textarea>
                        <button type="submit" class="w-full py-4 rounded-xl bg-brand-primary text-brand-blue font-bold text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all">
                            Send Message <i class="ti ti-arrow-up-right"></i>
                        </button>
                    </form>
                </div>
            </div>
        </section>

        <!-- Map & CTA -->
        <section class="py-16 bg-brand-blue/5">
            <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <div class="overflow-hidden rounded-2xl shadow-lg border-2 border-brand-primary/30">
                        <iframe loading="lazy" src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&t=m&z=10&output=embed" title="London Eye, London, United Kingdom" aria-label="London Eye, London, United Kingdom" class="w-full h-64"></iframe>
                    </div>
                </div>
                <div>
                    <div class="rounded-2xl p-8 flex flex-col items-center">
                        <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Start earning with only $20</h2>
                        <p class="text-gray-300 mb-4">Try our super easy portal for free</p>
                        <a href="/login" data-nav 
                           class="hero-fade-in inline-flex items-center justify-center px-8 py-4 
                                  border-2 border-brand-primary text-brand-primary font-bold 
                                  rounded-xl hover:bg-brand-primary/10 transition-all 
                                  hover:translate-y-[-2px] active:translate-y-[0px] text-sm">
                            <i class="fas fa-play-circle mr-2"></i>
                            Learn from the best
                        </a>
                    </div>
                </div>
            </div>
        </section>
        ${i().html}
    `,pageEvents:r}};export{w as default};
//# sourceMappingURL=contact-BLCUNIwq.js.map
