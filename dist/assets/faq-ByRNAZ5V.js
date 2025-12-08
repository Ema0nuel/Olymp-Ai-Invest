import{N as p,F as m}from"./Navbar-DHujhqfN.js";import{a as u,b as h}from"./reset-3f-UIG5W.js";import{a as v,S as y,V as f,f as b}from"./faq-CvIMHR63.js";import{B as w}from"./Brands-BMDLwDUL.js";import{t as g}from"./analtics-D3HxoDr9.js";import"./logo-9_xFcp4C.js";import"./index-DJYm-znp.js";import"./supabaseClients-BL8TJKO9.js";const x={general:[{question:"How does Olymp AI Invest work?",answer:"We help you to invest in the cryptocurrency market like a professional. Simply select a smart portfolio and get started straight away."},{question:"How much does Olymp AI Invest charge?",answer:"The management fee is 2% per year including VAT. Transaction fees of 1% apply to purchases and sales. Fees can be viewed at any time in your transaction history."},{question:"Who can invest?",answer:"You need to be over 18 and live in a country that is part of the European Union or the European Economic Area (Switzerland, Liechtenstein, Norway, Iceland)."},{question:"Can companies invest?",answer:"Yes, we already have several corporate clients. The minimum investment for corporate accounts is €5,000. Please send us a request to support@olympaiinvest.com and we will take care of it."}],deposit:[{question:"What is the minimum deposit?",answer:"The minimum deposit is €50."},{question:"How long does it usually take for my transfer to arrive?",answer:"That depends on your bank. On average, a transfer takes 1-3 working days."},{question:"How can I set up a savings plan?",answer:"After you have transferred your first deposit, you can easily set up a savings plan in your dashboard. The minimum monthly investment is €10."}],withdrawal:[{question:"How/when can I withdraw?",answer:"You can withdraw at any time on your dashboard."},{question:"Is there a minimum term?",answer:"No, you can withdraw at any time."},{question:"In which currencies can I withdraw?",answer:"Withdrawals are possible at any time and are currently exclusively in euros."}],portfolios:[{question:"What is the difference between the Olymp AI Invest portfolios?",answer:"Each portfolio has a unique allocation. The crypto market part of the portfolios is invested in high potential cryptocurrencies, while the fixed income part generates a consistent income stream for you and decreases your portfolio's risk."},{question:"In which cryptocurrencies does Olymp AI Invest invest for me?",answer:"We have strict selection criteria for the cryptocurrencies that are included in your portfolio."}],taxes:[{question:"How can I take care of the taxation?",answer:"Generally, taxation depends on the legal situation in your country. Olymp AI Invest gives you the possibility to download all transactions directly on the platform."}]},r=[{id:"general",label:"General"},{id:"deposit",label:"Deposit"},{id:"withdrawal",label:"Withdrawal"},{id:"portfolios",label:"Portfolios & Cryptocurrencies"},{id:"taxes",label:"Taxes"}],T=async()=>{u("Olymp AI Invest FAQ"),h(),await g();const{html:o,pageEvents:l}=p();function c(){l();const a=document.querySelectorAll("[data-tab]"),s=document.querySelectorAll("[data-content]");a.forEach(t=>{t.addEventListener("click",()=>{a.forEach(e=>e.classList.remove("active","bg-brand-primary/20")),t.classList.add("active","bg-brand-primary/20"),s.forEach(e=>{e.classList.add("hidden"),e.dataset.content===t.dataset.tab&&e.classList.remove("hidden")})})}),document.querySelectorAll(".accordion-single .header-area").forEach(t=>{t.addEventListener("click",()=>{const e=t.parentElement,i=e.querySelector(".content-area"),d=e.classList.contains("active");e.parentElement.querySelectorAll(".accordion-single").forEach(n=>{n.classList.remove("active"),n.querySelector(".content-area").style.maxHeight="0px"}),d||(e.classList.add("active"),i.style.maxHeight=i.scrollHeight+"px")})})}return{html:`
        ${o}
        <!-- Banner Section -->
        <section class="relative bg-cover bg-center py-20" 
                 style="background-image: url('https://softivus.com/wp/tradly/wp-content/uploads/2025/05/Breadcrumbs-Area-1-min.png')">
            <div class="absolute inset-0 bg-black/70"></div>
            <div class="container mx-auto px-4 relative z-10">
                <div class="text-center">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">FAQ</h2>
                    <nav aria-label="breadcrumb" class="flex justify-center">
                        <ol class="flex gap-2 text-gray-300">
                            <li><a href="/" data-nav class="hover:text-brand-primary">Home</a></li>
                            <li>&gt;</li>
                            <li class="text-brand-primary">FAQ</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="relative py-20 bg-brand-dark">
            <div class="absolute inset-0 pointer-events-none opacity-20">
                <img src="${v}" alt="" class="absolute top-0 left-0 w-96">
                <img src="${y}" alt="" class="absolute top-20 right-20 w-16">
                <img src="${f}" alt="" class="absolute bottom-20 left-20 w-32">
            </div>

            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <span class="text-brand-primary font-medium">FAQ's</span>
                    <h2 class="text-3xl md:text-4xl font-bold text-white mt-2">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div class="grid lg:grid-cols-2 gap-12 items-start">
                    <!-- FAQ Content -->
                    <div>
                        <!-- Tabs -->
                        <div class="faq-tabs flex flex-wrap gap-3 mb-10">
                            ${r.map((a,s)=>`
                                <button data-tab="${a.id}" 
                                        class="px-6 py-3 rounded-xl text-white hover:bg-brand-primary/20 
                                               transition-all ${s===0?"active bg-brand-primary/20":""}">
                                    ${a.label}
                                </button>
                            `).join("")}
                        </div>

                        <!-- Accordion -->
                        ${r.map((a,s)=>`
                            <div data-content="${a.id}" class="${s===0?"":"hidden"}">
                                <div class="accordion-section flex flex-col gap-6">
                                    ${x[a.id].map(t=>`
                                        <div class="accordion-single bg-brand-blue/10 border border-brand-primary/10 
                                                    rounded-xl overflow-hidden transition-all">
                                            <h5 class="header-area cursor-pointer">
                                                <button class="w-full p-4 flex items-center justify-between text-white">
                                                    <span class="font-medium pr-8">${t.question}</span>
                                                    <span class="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center">
                                                        <i class="fas fa-plus text-brand-primary text-xs"></i>
                                                    </span>
                                                </button>
                                            </h5>
                                            <div class="content-area transition-all duration-300" style="max-height: 0px;">
                                                <div class="p-4 text-gray-400">
                                                    ${t.answer}
                                                </div>
                                            </div>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
                        `).join("")}
                    </div>

                    <!-- FAQ Image -->
                    <div class="relative hidden lg:block">
                        <div class="sticky top-8">
                            <img src="${b}" alt="FAQ" class="w-full rounded-2xl">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        ${w()}
        ${m().html}
        `,pageEvents:c}};export{T as default};
//# sourceMappingURL=faq-ByRNAZ5V.js.map
