import{s,a as h,v as y}from"./supabaseClients-CP3flIu-.js";import{l as p}from"./index-U9ehfUVP.js";import{M as f}from"./Modal-jvk0lnFM.js";import{W as b}from"./621506e9a1183737fff2f2b8_NFT's _ Metaverse-CtPoGJaq.js";import{s as w}from"./send-email-89Z52C2k.js";import{i as x,r as v}from"./webAuthnHelper-CFOYufXH.js";const a=({text:e="",background:t="bg-brand-blue/10",color:r="text-white",icon:i="",duration:n=5e3})=>{document.querySelectorAll(".Olymp AI-toast").forEach(c=>c.remove());const o=document.createElement("div");o.className=`Olymp AI-toast fixed top-8 right-8 z-[999999] px-6 py-4 rounded-xl 
        shadow-lg flex items-center gap-3 animate-fade-in-up 
        backdrop-blur-md border border-brand-primary/50 
        ${t} ${r} hover:border-brand-primary 
        transition-all duration-300`,o.innerHTML=`
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r 
            from-brand-primary/10 to-transparent opacity-50"></div>
        ${i?`<i class="${i} text-2xl relative z-10 text-brand-primary"></i>`:""}
        <span class="font-semibold relative z-10">${e}</span>
    `,document.body.appendChild(o),setTimeout(()=>{o.classList.add("animate-fade-out-down"),setTimeout(()=>o.remove(),500)},n)};async function k(e){const t=a({text:"Creating your account...",background:"bg-brand-primary/10",icon:"fas fa-spinner fa-spin",duration:0});try{const{error:r}=await s.from("trading_accounts").insert({user_id:e,account_type:"demo",balance:100,leverage:100});if(r)throw r;const{error:i}=await s.from("trading_accounts").insert({user_id:e,account_type:"live",balance:0,leverage:100});if(i)throw i;return t.remove(),!0}catch(r){return t.remove(),console.error("Error creating trading accounts:",r),!1}}async function G(e){const t=a({text:"Creating your account...",background:"bg-brand-primary/10",icon:"fas fa-spinner fa-spin",duration:0});try{const{success:r,error:i,otp:n,user:o}=await h(e);if(t.remove(),!r)return a({text:i,icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1;if(!n)return console.error("No OTP received from signUpUser"),a({text:"Error generating verification code",icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1;try{await w({to:e.email,subject:"Welcome to Olymp AI Invest - Verify Your Email",html:_(e.email,n)})}catch(d){console.error("Error sending welcome email:",d)}if(!await k(o.id))return a({text:"Failed to create trading accounts",icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1;await new Promise(d=>setTimeout(d,100));const l=await A(e.email,n);if(l.success){let d=!1;return await x()&&(d=await new Promise(u=>{new f({title:"Set Up Biometric Login?",content:`
                    <div class="space-y-4">
                        <p class="text-gray-400">
                            Would you like to enable biometric login (Face ID, fingerprint, or passkey) for faster and more secure sign-in?
                            <i class="fas fa-fingerprint text-brand-primary/90 ml-1"></i>
                        </p>
                    </div>
                `,actions:[{text:"Enable Biometrics",primary:!0,onClick:async g=>{g();const m=await v(o.id,e.email);m.success?(a({text:"Biometric login enabled!",icon:"fas fa-fingerprint",background:"bg-green-800"}),u(!0)):(a({text:"Biometric setup failed: "+m.error,icon:"fas fa-exclamation-circle",background:"bg-red-800"}),u(!1))}},{text:"Maybe Later",onClick:g=>{g(),u(!1)}}]}).show()})),await I(),a({text:"Account created successfully! Redirecting...",icon:"fas fa-check-circle",background:"bg-green-800",duration:3e3}),await new Promise(u=>setTimeout(u,2e3)),await p("login"),!0}else return a({text:l.error,icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1}catch(r){return a({text:r.message||"An unexpected error occurred",icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1}}async function I(){const e=new f({content:`
            <div class="text-center space-y-6 py-8">
                <img src="${b}" alt="Welcome" class="w-64 mx-auto">
                <h2 class="text-2xl font-bold text-white">Welcome to Olymp AI Invest!</h2>
                <p class="text-gray-400">Your account has been created successfully.</p>
            </div>
        `,showClose:!1});return e.show(),new Promise(t=>setTimeout(()=>{e.hide(),t()},2e3))}async function A(e,t){return new Promise(r=>{new f({title:"Verify Your Email",content:`
                <div class="space-y-4">
                    <p class="text-gray-400">
                        We've sent a verification code to <strong>${e}</strong>
                    </p>
                    <input type="text" 
                           id="otpInput"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all text-center text-2xl tracking-widest"
                           maxlength="6"
                           placeholder="000000">
                </div>
            `,actions:[{text:"Verify",primary:!0,onClick:async n=>{const o=document.querySelector('[data-action="Verify"]');o.disabled=!0,o.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Verifying...';const c=document.getElementById("otpInput").value,l=await y(e,c);l.success?(n(),r({success:!0})):(o.disabled=!1,o.innerHTML="Verify",a({text:l.error,icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}))}}]}).show(),setTimeout(()=>document.getElementById("otpInput").focus(),100)})}function _(e,t){return`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Olymp AI Invest</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center" style="padding: 40px 0;">
                        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <!-- Header -->
                            <tr>
                                <td align="center" style="padding: 40px 0;">
                                    <img src="https://www.Olymp AI Invest.com/assets/logo-Dw35zzZI.ico" alt="Olymp AI Invest Logo" width="150" style="display: block;">
                                </td>
                            </tr>
                            
                            <!-- Welcome Message -->
                            <tr>
                                <td style="padding: 0 40px;">
                                    <h1 style="color: #333; font-size: 24px; margin: 0 0 20px; text-align: center;">Welcome to Olymp AI Invest!</h1>
                                    <p style="color: #666; font-size: 16px; line-height: 24px; margin: 0 0 20px;">
                                        Thank you for choosing Olymp AI Invest. We're excited to have you join our trading community!
                                    </p>
                                </td>
                            </tr>

                            <!-- OTP Section -->
                            <tr>
                                <td style="padding: 30px 40px;">
                                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                                        <tr>
                                            <td align="center">
                                                <p style="color: #666; font-size: 16px; margin: 0 0 15px;">Your verification code is:</p>
                                                <p style="background-color: #e9ecef; color: #333; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 0; padding: 15px 25px; border-radius: 4px;">
                                                    ${t}
                                                </p>
                                                <p style="color: #999; font-size: 14px; margin: 15px 0 0;">
                                                    This code will expire in 10 minutes
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Security Notice -->
                            <tr>
                                <td style="padding: 0 40px 30px;">
                                    <p style="color: #666; font-size: 14px; line-height: 21px; margin: 0;">
                                        For security reasons, please do not share this code with anyone. If you didn't request this code, please ignore this email.
                                    </p>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f8f9fa; padding: 30px 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                                    <p style="color: #999; font-size: 14px; margin: 0; text-align: center;">
                                        &copy; ${new Date().getFullYear()} Olymp AI Invest. All rights reserved.<br>
                                        <a href="https://Olymp AI Invest.com" style="color: #f1d416; text-decoration: underline;">Olymp AI Invest</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `}async function L(){try{const{data:e,error:t}=await s.auth.signInWithOAuth({provider:"google",options:{queryParams:{access_type:"offline",prompt:"consent"},skipBrowserRedirect:!0}});if(t)throw t;const r=window.open(e?.url,"Olymp AI Google Login","width=500,height=600,left="+(window.screen.width/2-250)+",top="+(window.screen.height/2-300)+",noopener,noreferrer"),i=new BroadcastChannel("auth"),n=setInterval(async()=>{try{const{data:{session:o}}=await s.auth.getSession();if(o?.access_token){if(clearInterval(n),i.postMessage("auth_complete"),r)try{r.close()}catch{console.log("Window close blocked - expected")}i.close()}}catch(o){console.error("Auth check error:",o)}},1e3);return{success:!0}}catch(e){return console.error("Google sign-in error:",e),{success:!1,error:e}}}async function O(e){if(e)try{const{error:t}=await s.from("profiles").upsert({id:e.id,email:e.email,full_name:e.user_metadata?.full_name||"",avatar_url:e.user_metadata?.avatar_url||"",is_verified:!0,created_at:new Date().toISOString(),updated_at:new Date().toISOString()},{onConflict:"id",returning:"minimal"});if(t)throw t;try{await s.from("trading_accounts").insert({user_id:e.id,account_type:"demo",balance:100,leverage:100}),await s.from("trading_accounts").insert({user_id:e.id,account_type:"live",balance:0,leverage:100})}catch(r){console.error("Error creating trading accounts:",r)}window.location.hash&&window.history.pushState("",document.title,window.location.pathname),p("dashboard")}catch(t){console.error("Error handling Google user:",t)}}s.auth.onAuthStateChange(async(e,t)=>{e==="SIGNED_IN"&&t?.user&&await O(t.user)});async function B(){try{a({text:"Connecting to Google...",background:"bg-brand-primary/10",icon:"fas fa-spinner fa-spin"});const{data:e,error:t}=await s.auth.signInWithOAuth({provider:"google",options:{queryParams:{access_type:"offline",prompt:"consent"},skipBrowserRedirect:!0}});if(t)throw t;const r=window.open(e?.url,"Olymp AI Google Login","width=500,height=600,left="+(window.screen.width/2-250)+",top="+(window.screen.height/2-300)+",noopener,noreferrer"),i=setInterval(async()=>{try{const{data:{session:n}}=await s.auth.getSession();if(n?.access_token){if(clearInterval(i),r)try{r.close()}catch{console.log("Window close blocked - expected")}const{data:o}=await s.from("profiles").select("*").eq("id",n.user.id).single();o?(a({text:"Successfully signed in",background:"bg-green-500/10",icon:"fas fa-check-circle"}),p("dashboard")):(a({text:"Please complete registration",background:"bg-yellow-500/10",icon:"fas fa-exclamation-circle"}),p("signup"))}}catch(n){console.error("Auth check error:",n),a({text:"Login failed",background:"bg-red-500/10",icon:"fas fa-exclamation-circle"})}},1e3);return{success:!0}}catch(e){return console.error("Google login error:",e),a({text:"Failed to connect with Google",background:"bg-red-500/10",icon:"fas fa-exclamation-circle"}),{success:!1,error:e}}}export{G as a,k as c,_ as g,B as h,L as s};
//# sourceMappingURL=signupHandler-Dao3kgf9.js.map
