import{s as c,a as h,v as y}from"./supabaseClients-DZSCHltC.js";import{l as p}from"./index-Ct12iCQQ.js";import{M as f}from"./Modal-jvk0lnFM.js";import{W as b}from"./621506e9a1183737fff2f2b8_NFT's _ Metaverse-CtPoGJaq.js";import{s as w}from"./send-email-89Z52C2k.js";import{i as x,r as v}from"./webAuthnHelper-CFOYufXH.js";const n=({text:e="",background:t="bg-brand-blue/10",color:a="text-white",icon:i="",duration:o=5e3})=>{document.querySelectorAll(".Olymp AI-toast").forEach(s=>s.remove());const r=document.createElement("div");r.className=`Olymp AI-toast fixed top-8 right-8 z-[999999] px-6 py-4 rounded-xl 
        shadow-lg flex items-center gap-3 animate-fade-in-up 
        backdrop-blur-md border border-brand-primary/50 
        ${t} ${a} hover:border-brand-primary 
        transition-all duration-300`,r.innerHTML=`
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r 
            from-brand-primary/10 to-transparent opacity-50"></div>
        ${i?`<i class="${i} text-2xl relative z-10 text-brand-primary"></i>`:""}
        <span class="font-semibold relative z-10">${e}</span>
    `,document.body.appendChild(r),setTimeout(()=>{r.classList.add("animate-fade-out-down"),setTimeout(()=>r.remove(),500)},o)};async function I(e){try{const{data:t,error:a}=await c.from("trading_accounts").select("account_type").eq("user_id",e);if(a)return console.error("Error checking existing accounts:",a),!1;const i=new Set(t?.map(r=>r.account_type)||[]),o=[];if(i.has("demo")||o.push({user_id:e,account_type:"demo",balance:100,leverage:100,created_at:new Date().toISOString(),updated_at:new Date().toISOString()}),i.has("live")||o.push({user_id:e,account_type:"live",balance:0,leverage:100,created_at:new Date().toISOString(),updated_at:new Date().toISOString()}),o.length>0){const{error:r}=await c.from("trading_accounts").insert(o).select();if(r)return console.error("Error creating accounts:",r),!1}return!0}catch(t){return console.error("Error managing trading accounts:",t),!1}}async function G(e){const t=n({text:"Creating your account...",background:"bg-brand-primary/10",icon:"fas fa-spinner fa-spin",duration:0});try{const{success:a,error:i,otp:o,user:r}=await h(e);if(t.remove(),!a)return n({text:i,icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1;if(!o)return console.error("No OTP received from signUpUser"),n({text:"Error generating verification code",icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1;try{await w({to:e.email,subject:"Welcome to Olymp AI Invest - Verify Your Email",html:A(e.email,o)})}catch(d){console.error("Error sending welcome email:",d)}if(!await I(r.id))return n({text:"Failed to create trading accounts",icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1;await new Promise(d=>setTimeout(d,100));const l=await _(e.email,o);if(l.success){let d=!1;return await x()&&(d=await new Promise(u=>{new f({title:"Set Up Biometric Login?",content:`
                    <div class="space-y-4">
                        <p class="text-gray-400">
                            Would you like to enable biometric login (Face ID, fingerprint, or passkey) for faster and more secure sign-in?
                            <i class="fas fa-fingerprint text-brand-primary/90 ml-1"></i>
                        </p>
                    </div>
                `,actions:[{text:"Enable Biometrics",primary:!0,onClick:async g=>{g();const m=await v(r.id,e.email);m.success?(n({text:"Biometric login enabled!",icon:"fas fa-fingerprint",background:"bg-green-800"}),u(!0)):(n({text:"Biometric setup failed: "+m.error,icon:"fas fa-exclamation-circle",background:"bg-red-800"}),u(!1))}},{text:"Maybe Later",onClick:g=>{g(),u(!1)}}]}).show()})),await k(),n({text:"Account created successfully! Redirecting...",icon:"fas fa-check-circle",background:"bg-green-800",duration:3e3}),await new Promise(u=>setTimeout(u,2e3)),await p("login"),!0}else return n({text:l.error,icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1}catch(a){return n({text:a.message||"An unexpected error occurred",icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1}}async function k(){const e=new f({content:`
            <div class="text-center space-y-6 py-8">
                <img src="${b}" alt="Welcome" class="w-64 mx-auto">
                <h2 class="text-2xl font-bold text-white">Welcome to Olymp AI Invest!</h2>
                <p class="text-gray-400">Your account has been created successfully.</p>
            </div>
        `,showClose:!1});return e.show(),new Promise(t=>setTimeout(()=>{e.hide(),t()},2e3))}async function _(e,t){return new Promise(a=>{new f({title:"Verify Your Email",content:`
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
            `,actions:[{text:"Verify",primary:!0,onClick:async o=>{const r=document.querySelector('[data-action="Verify"]');r.disabled=!0,r.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Verifying...';const s=document.getElementById("otpInput").value,l=await y(e,s);l.success?(o(),a({success:!0})):(r.disabled=!1,r.innerHTML="Verify",n({text:l.error,icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}))}}]}).show(),setTimeout(()=>document.getElementById("otpInput").focus(),100)})}function A(e,t){return`
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
    `}async function L(){try{const{data:e,error:t}=await c.auth.signInWithOAuth({provider:"google",options:{queryParams:{access_type:"offline",prompt:"consent"},skipBrowserRedirect:!0}});if(t)throw t;const a=window.open(e?.url,"Olymp AI Google Login","width=500,height=600,left="+(window.screen.width/2-250)+",top="+(window.screen.height/2-300)+",noopener,noreferrer"),i=new BroadcastChannel("auth"),o=setInterval(async()=>{try{const{data:{session:r}}=await c.auth.getSession();if(r?.access_token){if(clearInterval(o),i.postMessage("auth_complete"),a)try{a.close()}catch{console.log("Window close blocked - expected")}i.close()}}catch(r){console.error("Auth check error:",r)}},1e3);return{success:!0}}catch(e){return console.error("Google sign-in error:",e),{success:!1,error:e}}}async function O(e){if(e)try{const{error:t}=await c.from("profiles").upsert({id:e.id,email:e.email,full_name:e.user_metadata?.full_name||"",avatar_url:e.user_metadata?.avatar_url||"",is_verified:!0,created_at:new Date().toISOString(),updated_at:new Date().toISOString()},{onConflict:"id",returning:"minimal"});if(t)throw t;try{await c.from("trading_accounts").insert({user_id:e.id,account_type:"demo",balance:100,leverage:100}),await c.from("trading_accounts").insert({user_id:e.id,account_type:"live",balance:0,leverage:100})}catch(a){console.error("Error creating trading accounts:",a)}window.location.hash&&window.history.pushState("",document.title,window.location.pathname),p("dashboard")}catch(t){console.error("Error handling Google user:",t)}}c.auth.onAuthStateChange(async(e,t)=>{e==="SIGNED_IN"&&t?.user&&await O(t.user)});async function B(){try{n({text:"Connecting to Google...",background:"bg-brand-primary/10",icon:"fas fa-spinner fa-spin"});const{data:e,error:t}=await c.auth.signInWithOAuth({provider:"google",options:{queryParams:{access_type:"offline",prompt:"consent"},skipBrowserRedirect:!0}});if(t)throw t;const a=window.open(e?.url,"Olymp AI Google Login","width=500,height=600,left="+(window.screen.width/2-250)+",top="+(window.screen.height/2-300)+",noopener,noreferrer"),i=setInterval(async()=>{try{const{data:{session:o}}=await c.auth.getSession();if(o?.access_token){if(clearInterval(i),a)try{a.close()}catch{console.log("Window close blocked - expected")}const{data:r}=await c.from("profiles").select("*").eq("id",o.user.id).single();r?(n({text:"Successfully signed in",background:"bg-green-500/10",icon:"fas fa-check-circle"}),p("dashboard")):(n({text:"Please complete registration",background:"bg-yellow-500/10",icon:"fas fa-exclamation-circle"}),p("signup"))}}catch(o){console.error("Auth check error:",o),n({text:"Login failed",background:"bg-red-500/10",icon:"fas fa-exclamation-circle"})}},1e3);return{success:!0}}catch(e){return console.error("Google login error:",e),n({text:"Failed to connect with Google",background:"bg-red-500/10",icon:"fas fa-exclamation-circle"}),{success:!1,error:e}}}export{G as a,I as c,A as g,B as h,L as s};
//# sourceMappingURL=signupHandler-Ij0mYrLW.js.map
