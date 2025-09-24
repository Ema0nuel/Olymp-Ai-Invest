let t=null;function n(){if(t)return;const e=document.createElement("div");e.className="fixed inset-0 z-[99999] flex items-center justify-center bg-brand-dark/80 backdrop-blur-sm",e.innerHTML=`
        <div class="relative flex items-center justify-center transform-gpu">
            <!-- Outer ring -->
            <div class="absolute w-16 h-16 rounded-full border-2 border-brand-primary/20 border-t-brand-primary 
                        transform-gpu will-change-transform"
                 style="animation: spinnerRotate 1s linear infinite">
            </div>
            
            <!-- Inner ring -->
            <div class="absolute w-10 h-10 rounded-full border-2 border-brand-primary/20 border-t-brand-primary 
                        transform-gpu will-change-transform"
                 style="animation: spinnerRotateReverse 0.8s linear infinite">
            </div>
            
            <!-- Center dot -->
            <div class="w-2 h-2 rounded-full bg-brand-primary transform-gpu"
                 style="animation: spinnerPulse 1s ease-in-out infinite">
            </div>
        </div>
    `;const r=document.createElement("style");r.textContent=`
        @keyframes spinnerRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes spinnerRotateReverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
        }
        
        @keyframes spinnerPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
        }
    `,document.head.appendChild(r),e.style.opacity="0",e.style.transition="opacity 0.2s ease-in-out",e.style.transform="translateZ(0)",e.style.webkitTransform="translate3d(0,0,0)",e.style.backfaceVisibility="hidden",document.body.appendChild(e),t=e,e.offsetHeight,e.style.opacity="1"}function s(){t&&(t.style.opacity="0",setTimeout(()=>{t?.remove(),t=null},200))}const a={start:n,stop:s};export{a as s};
//# sourceMappingURL=spinner-DaVCJ9xF.js.map
