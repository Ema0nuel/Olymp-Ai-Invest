class i{constructor(e={}){this.options={title:e.title||"",content:e.content||"",actions:e.actions||[],showClose:e.showClose??!0,onClose:e.onClose||(()=>{})},this.element=null,this.createModal()}createModal(){const e=document.createElement("div");e.className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto py-4",e.innerHTML=`
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative w-full max-w-md mx-auto my-auto bg-brand-blue rounded-2xl shadow-xl 
                    border border-brand-primary/20 transform transition-all">
            <!-- Header -->
            ${this.options.title?`
                <div class="sticky top-0 px-6 py-4 border-b border-brand-primary/20 bg-brand-blue rounded-t-2xl">
                    <h3 class="text-lg font-medium text-white">${this.options.title}</h3>
                </div>
            `:""}
            
            <!-- Content -->
            <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">
                ${this.options.content}
            </div>

            <!-- Actions -->
            ${this.options.actions.length?`
                <div class="sticky bottom-0 px-6 py-4 border-t border-brand-primary/20 
                          flex justify-end gap-3 bg-brand-blue rounded-b-2xl">
                    ${this.options.actions.map(t=>`
                        <button class="px-4 py-2 rounded-xl transition-colors
                                   ${t.primary?"bg-brand-primary text-brand-blue hover:bg-opacity-90":"border border-brand-primary/30 text-white hover:bg-brand-primary/20"}"
                                data-action="${t.text}">
                            ${t.text}
                        </button>
                    `).join("")}
                </div>
            `:""}

            ${this.options.showClose?`
                <button class="absolute top-4 right-4 text-gray-400 hover:text-white 
                             transition-colors" data-close>
                    <i class="fas fa-times"></i>
                </button>
            `:""}
        </div>
    `,this.element=e,this.setupListeners()}setupListeners(){const e=this.element.querySelector("[data-close]");e&&e.addEventListener("click",()=>this.hide()),this.options.actions.forEach(t=>{const s=this.element.querySelector(`[data-action="${t.text}"]`);s&&s.addEventListener("click",()=>t.onClick(()=>this.hide()))}),this.element.querySelector(".absolute").addEventListener("click",t=>{t.target===t.currentTarget&&this.options.showClose&&this.hide()})}show(){document.body.appendChild(this.element),requestAnimationFrame(()=>{this.element.querySelector(".relative").style.opacity="0",this.element.querySelector(".relative").style.transform="scale(0.95)",requestAnimationFrame(()=>{this.element.querySelector(".relative").style.opacity="1",this.element.querySelector(".relative").style.transform="scale(1)"})})}hide(){const e=this.element.querySelector(".relative");e.style.opacity="0",e.style.transform="scale(0.95)",setTimeout(()=>{this.element.remove(),this.options.onClose()},150)}}export{i as M};
//# sourceMappingURL=Modal-jvk0lnFM.js.map
