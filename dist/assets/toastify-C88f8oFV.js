const n=({text:a="",background:r="bg-brand-blue/10",color:o="text-white",icon:t="",duration:d=5e3})=>{document.querySelectorAll(".Olymp AI-toast").forEach(i=>i.remove());const e=document.createElement("div");e.className=`Olymp AI-toast fixed top-8 right-8 z-[999999] px-6 py-4 rounded-xl 
        shadow-lg flex items-center gap-3 animate-fade-in-up 
        backdrop-blur-md border border-brand-primary/50 
        ${r} ${o} hover:border-brand-primary 
        transition-all duration-300`,e.innerHTML=`
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r 
            from-brand-primary/10 to-transparent opacity-50"></div>
        ${t?`<i class="${t} text-2xl relative z-10 text-brand-primary"></i>`:""}
        <span class="font-semibold relative z-10">${a}</span>
    `,document.body.appendChild(e),setTimeout(()=>{e.classList.add("animate-fade-out-down"),setTimeout(()=>e.remove(),500)},d)};export{n as t};
//# sourceMappingURL=toastify-C88f8oFV.js.map
