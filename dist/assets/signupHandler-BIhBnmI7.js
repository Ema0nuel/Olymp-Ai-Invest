import{s}from"./supabaseClients-Fr4pJEim.js";import{l as y}from"./index-BXoOFHK0.js";import{M as f}from"./Modal-jvk0lnFM.js";import{W as w}from"./621506e9a1183737fff2f2b8_NFT's _ Metaverse-CtPoGJaq.js";import{s as v}from"./send-email-89Z52C2k.js";import{i as _,r as I}from"./webAuthnHelper-CFOYufXH.js";const n=({text:t="",background:r="bg-brand-blue/10",color:a="text-white",icon:o="",duration:i=5e3})=>{document.querySelectorAll(".olymp-toast").forEach(l=>l.remove());const e=document.createElement("div");return e.className=`olymp-toast fixed top-8 right-8 z-[999999] px-6 py-4 rounded-xl 
        shadow-lg flex items-center gap-3 animate-fade-in-up 
        backdrop-blur-md border border-brand-primary/50 
        ${r} ${a} hover:border-brand-primary 
        transition-all duration-300`,e.innerHTML=`
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r 
            from-brand-primary/10 to-transparent opacity-50"></div>
        ${o?`<i class="${o} text-2xl relative z-10 text-brand-primary"></i>`:""}
        <span class="font-semibold relative z-10">${t}</span>
    `,document.body.appendChild(e),i>0&&setTimeout(()=>{e.classList.add("animate-fade-out-down"),setTimeout(()=>e.remove(),500)},i),e};async function h(t){try{const{data:r,error:a}=await s.from("trading_accounts").select("account_type").eq("user_id",t);if(a)throw a;const o=new Set(r?.map(e=>e.account_type)||[]),i=[];if(o.has("demo")||i.push({user_id:t,account_type:"demo",balance:100,leverage:100,created_at:new Date().toISOString(),updated_at:new Date().toISOString()}),o.has("live")||i.push({user_id:t,account_type:"live",balance:0,leverage:100,created_at:new Date().toISOString(),updated_at:new Date().toISOString()}),i.length>0){const{error:e}=await s.from("trading_accounts").insert(i);if(e)throw e}return!0}catch(r){return console.error("Trading accounts error:",r),!1}}async function V(t){const r=n({text:"Creating your account...",background:"bg-brand-primary/10",icon:"fas fa-spinner fa-spin",duration:0});try{const{data:a}=await s.from("profiles").select("auth_type").eq("email",t.email).single();if(a)return r.remove(),n({text:a.auth_type==="google"?"This email is registered with Google. Please use Google Sign In.":"This email is already registered. Please sign in instead.",icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1;const{data:o,error:i}=await s.auth.signUp({email:t.email,password:t.password});if(i)throw i;const e=Math.floor(1e5+Math.random()*9e5).toString(),l=new Date(Date.now()+600*1e3),{error:c}=await s.from("profiles").insert({id:o.user.id,email:t.email,full_name:t.fullName||"",phone_number:t.phone||"",country:t.country||"",auth_type:"email",verification_code:e,verification_expiry:l,created_at:new Date().toISOString(),updated_at:new Date().toISOString()});if(c)throw c;try{await v({to:t.email,subject:"Welcome to Olymp AI Invest - Verify Your Email",html:S(t.email,e)})}catch(u){console.error("Email error:",u)}r.remove();const d=await k(t.email,e);return d.success?(await h(o.user.id)||n({text:"Warning: Trading accounts setup incomplete",icon:"fas fa-exclamation-triangle",background:"bg-yellow-800",duration:3e3}),await _()&&await new Promise(m=>{new f({title:"Enable Biometric Login",content:`
                        <div class="space-y-4">
                            <p class="text-gray-400">
                                Would you like to enable biometric login for faster and more secure access?
                            </p>
                        </div>
                    `,actions:[{text:"Enable",primary:!0,onClick:async p=>{p();const x=await I(o.user.id,t.email);m(x.success)}},{text:"Skip",onClick:p=>{p(),m(!1)}}]}).show()})&&n({text:"Biometric login enabled",icon:"fas fa-fingerprint",background:"bg-green-800",duration:3e3}),await b(),n({text:"Account created successfully! Redirecting...",icon:"fas fa-check-circle",background:"bg-green-800",duration:3e3}),await new Promise(u=>setTimeout(u,2e3)),await y("login"),!0):(n({text:d.error||"Verification failed",icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1)}catch(a){return r.remove(),n({text:a.message||"Failed to create account",icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3}),!1}}async function C(){const t=n({text:"Connecting to Google...",background:"bg-brand-primary/10",icon:"fas fa-spinner fa-spin",duration:0});try{const{data:r,error:a}=await s.auth.signInWithOAuth({provider:"google",options:{queryParams:{access_type:"offline",prompt:"consent"},skipBrowserRedirect:!0}});if(a)throw a;const o=window.open(r?.url,"Olymp AI Google Login",`width=500,height=600,left=${window.screen.width/2-250},top=${window.screen.height/2-300}`),i=setInterval(async()=>{try{const{data:{session:e}}=await s.auth.getSession();if(e?.access_token){clearInterval(i),t.remove(),o&&o.close();const{data:l}=await s.from("profiles").select("*").eq("id",e.user.id).single();if(!l){const{error:c}=await s.from("profiles").insert({id:e.user.id,email:e.user.email,full_name:e.user.user_metadata?.full_name||"",auth_type:"google",is_verified:!0,created_at:new Date().toISOString(),updated_at:new Date().toISOString()});if(c)throw c;await h(e.user.id),await b()}n({text:l?"Signed in successfully!":"Account created successfully!",icon:"fas fa-check-circle",background:"bg-green-800",duration:3e3}),await y("dashboard")}}catch(e){clearInterval(i),t.remove(),console.error("Auth error:",e),n({text:e.message||"Authentication failed",icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3})}},1e3)}catch(r){t.remove(),n({text:r.message||"Failed to connect with Google",icon:"fas fa-exclamation-circle",background:"bg-red-800",duration:3e3})}}async function b(){return new Promise(t=>{const r=new f({content:`
                <div class="text-center space-y-6 py-8">
                    <img src="${w}" alt="Welcome" class="w-64 mx-auto">
                    <h2 class="text-2xl font-bold text-white">Welcome to Olymp AI Invest!</h2>
                    <p class="text-gray-400">Your account has been created successfully.</p>
                </div>
            `,showClose:!1});r.show(),setTimeout(()=>{r.hide(),t()},2e3)})}async function k(t,r){return new Promise(a=>{new f({title:"Verify Your Email",content:`
                <div class="space-y-4">
                    <p class="text-gray-400">
                        Please enter the verification code sent to <strong>${t}</strong>
                    </p>
                    <input type="text" 
                           id="otpInput"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all text-center text-2xl tracking-widest"
                           maxlength="6"
                           placeholder="000000">
                </div>
            `,actions:[{text:"Verify",primary:!0,onClick:async i=>{const e=document.querySelector('[data-action="Verify"]');e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i> Verifying...';const l=document.getElementById("otpInput").value,{data:c,error:d}=await s.from("profiles").select("verification_code, verification_expiry").eq("email",t).single();if(d||!c){e.disabled=!1,e.innerHTML="Verify",a({success:!1,error:"Verification failed"});return}if(c.verification_code!==l){e.disabled=!1,e.innerHTML="Verify",a({success:!1,error:"Invalid verification code"});return}if(new Date(c.verification_expiry)<new Date){e.disabled=!1,e.innerHTML="Verify",a({success:!1,error:"Verification code expired"});return}const{error:g}=await s.from("profiles").update({is_verified:!0,verification_code:null,verification_expiry:null,updated_at:new Date().toISOString()}).eq("email",t);if(g){e.disabled=!1,e.innerHTML="Verify",a({success:!1,error:"Failed to verify account"});return}i(),a({success:!0})}}]}).show(),setTimeout(()=>document.getElementById("otpInput")?.focus(),100)})}function S(t,r){return`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Welcome to Olymp AI Invest</title>
        </head>
        <body style="margin:0;padding:40px 0;background:#f4f4f4;font-family:Arial,sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <table width="600" border="0" cellspacing="0" cellpadding="0" 
                               style="background:#ffffff;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
                            <tr>
                                <td align="center" style="padding:40px 0;">
                                    <img src="https://olymp-ai-invest.com/logo.png" alt="Logo" width="150">
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0 40px;">
                                    <h1 style="color:#333;font-size:24px;margin:0 0 20px;text-align:center;">
                                        Welcome to Olymp AI Invest!
                                    </h1>
                                    <p style="color:#666;font-size:16px;line-height:24px;margin:0 0 20px;">
                                        Thank you for choosing Olymp AI Invest. Please verify your email to get started.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:30px 40px;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
                                           style="background:#f8f9fa;border-radius:8px;padding:20px;">
                                        <tr>
                                            <td align="center">
                                                <p style="color:#666;font-size:16px;margin:0 0 15px;">
                                                    Your verification code is:
                                                </p>
                                                <p style="background:#e9ecef;color:#333;font-size:32px;font-weight:bold;
                                                          letter-spacing:8px;margin:0;padding:15px 25px;border-radius:4px;">
                                                    ${r}
                                                </p>
                                                <p style="color:#999;font-size:14px;margin:15px 0 0;">
                                                    This code will expire in 10 minutes
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0 40px 30px;">
                                    <p style="color:#666;font-size:14px;line-height:21px;margin:0;">
                                        If you didn't request this code, please ignore this email.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background:#f8f9fa;padding:30px 40px;border-radius:0 0 8px 8px;">
                                    <p style="color:#999;font-size:14px;margin:0;text-align:center;">
                                        &copy; ${new Date().getFullYear()} Olymp AI Invest. All rights reserved.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `}export{h as c,S as g,C as h,V as s};
//# sourceMappingURL=signupHandler-BIhBnmI7.js.map
