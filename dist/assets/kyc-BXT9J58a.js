import{a as w}from"./auth-O7crs3AA.js";import{a as v}from"./reset-3f-UIG5W.js";import{N as k}from"./Navbar-Bb7p76Dq.js";import{s as i}from"./supabaseClients-DZSCHltC.js";import{s as o}from"./spinner-DaVCJ9xF.js";import{t as c}from"./toastify-C88f8oFV.js";import{t as _}from"./analtics-BGqwjPQ7.js";import"./index-Ct12iCQQ.js";import"./logo-9_xFcp4C.js";import"./webAuthnHelper-CFOYufXH.js";import"./user-BBhvX4PB.js";const K=async()=>{if(!await w.check("kyc"))return{html:"",pageEvents:()=>{}};v("Olymp AI | Identity Verification"),await _();const{html:f,pageEvents:y}=k();let r="not_started",n=null,l=new Set;async function b(){try{o.start();const{data:{user:e}}=await i.auth.getUser();if(!e)throw new Error("Not authenticated");n=e.id;const[t,a]=await Promise.all([i.from("profiles").select("kyc_status").eq("id",e.id).single(),i.from("kyc_documents").select("document_type").eq("user_id",e.id)]);if(t.error)throw t.error;if(a.error)throw a.error;r=t.data.kyc_status,l=new Set(a.data.map(s=>s.document_type)),p(),u()}catch(e){console.error("KYC status error:",e)}finally{o.stop()}}function u(){const e=["id_front","id_back","selfie","address_proof"];e.forEach(a=>{const s=document.getElementById(`${a}_status`);s&&(l.has(a)?(s.className="text-green-500",s.innerHTML='<i class="fas fa-check-circle"></i> Uploaded'):(s.className="text-gray-400",s.innerHTML="Not uploaded"))});const t=document.getElementById("kycSubmitBtn");if(t){const a=e.every(s=>l.has(s));t.disabled=!a,t.className=`w-full md:w-auto px-8 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 ${a?"bg-brand-primary text-white hover:bg-brand-primary/90":"bg-gray-500/50 text-gray-400 cursor-not-allowed"}`}}async function g(e,t){try{if(!e||!t)throw new Error("Invalid file or document type");if(o.start(),e.size>5*1024*1024)throw new Error("File size should not exceed 5MB");if(!["image/jpeg","image/png","image/jpg","application/pdf"].includes(e.type))throw new Error("Only JPG, PNG and PDF files are allowed");const s=`${n}/kyc/${t}_${Date.now()}.${e.name.split(".").pop()}`,{error:d}=await i.storage.from("deposit-screenshots").upload(s,e);if(d)throw d;const{data:h}=i.storage.from("deposit-screenshots").getPublicUrl(s),{error:m}=await i.from("kyc_documents").insert({user_id:n,document_type:t,document_url:h.publicUrl});if(m)throw m;l.add(t),u(),c({text:"Document uploaded successfully",background:"bg-green-500"})}catch(a){console.error("Upload error:",a),c({text:a.message,background:"bg-red-500"})}finally{o.stop()}}async function x(e){e.preventDefault();try{o.start();const a=["id_front","id_back","selfie","address_proof"].filter(d=>!l.has(d));if(a.length>0)throw new Error(`Please upload all required documents. Missing: ${a.join(", ")}`);const{error:s}=await i.from("profiles").update({kyc_status:"pending",kyc_submitted_at:new Date}).eq("id",n);if(s)throw s;c({text:"KYC submission successful! We will review your documents.",background:"bg-green-500"}),r="pending",p()}catch(t){console.error("KYC submission error:",t),c({text:t.message,background:"bg-red-500"})}finally{o.stop()}}function p(){const e=document.getElementById("kycStatus"),t=document.getElementById("kycForm");e&&(e.className=`inline-flex items-center px-3 py-1 rounded-full text-sm ${r==="approved"?"bg-green-500/20 text-green-500":r==="pending"?"bg-yellow-500/20 text-yellow-500":r==="rejected"?"bg-red-500/20 text-red-500":"bg-gray-500/20 text-gray-500"}`,e.innerHTML=`
                <i class="fas fa-${r==="approved"?"check-circle":r==="pending"?"clock":r==="rejected"?"times-circle":"user-shield"} mr-2"></i>
                ${r.toUpperCase()}
            `),t&&(t.style.display=r==="not_started"||r==="rejected"?"block":"none")}return window.handleDocumentUpload=g,window.handleKycSubmit=x,{html:`
            ${f}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
                    <!-- KYC Header -->
                    <div class="text-center space-y-4">
                        <h1 class="text-2xl md:text-3xl font-bold text-white">Identity Verification</h1>
                        <p class="text-gray-400 max-w-2xl mx-auto">
                            Complete your identity verification to unlock full trading capabilities
                            and higher withdrawal limits.
                        </p>
                        <div id="kycStatus" class="inline-flex items-center px-3 py-1 rounded-full text-sm">
                            <i class="fas fa-spinner fa-spin mr-2"></i>Loading...
                        </div>
                    </div>

                    <!-- KYC Form -->
                    <form id="kycForm" class="space-y-8 pb-14 lg:pb-0" onsubmit="handleKycSubmit(event)">
                        <!-- ID Verification -->
                        <div class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-6 space-y-4">
                            <h3 class="text-lg font-medium text-white">Government ID Verification</h3>
                            
                            <!-- ID Front -->
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <label class="block text-sm font-medium text-gray-400">
                                        ID Front Side
                                    </label>
                                    <span id="id_front_status" class="text-gray-400 text-sm">Not uploaded</span>
                                </div>
                                <input type="file"
                                       accept="image/*"
                                       onchange="handleDocumentUpload(this.files[0], 'id_front')"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>

                            <!-- ID Back -->
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <label class="block text-sm font-medium text-gray-400">
                                        ID Back Side
                                    </label>
                                    <span id="id_back_status" class="text-gray-400 text-sm">Not uploaded</span>
                                </div>
                                <input type="file"
                                       accept="image/*"
                                       onchange="handleDocumentUpload(this.files[0], 'id_back')"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                        </div>

                        <!-- Selfie Verification -->
                        <div class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-6 space-y-4">
                            <h3 class="text-lg font-medium text-white">Selfie Verification</h3>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <label class="block text-sm font-medium text-gray-400">
                                        Take a clear selfie holding your ID
                                    </label>
                                    <span id="selfie_status" class="text-gray-400 text-sm">Not uploaded</span>
                                </div>
                                <input type="file"
                                       accept="image/*"
                                       onchange="handleDocumentUpload(this.files[0], 'selfie')"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                        </div>

                        <!-- Address Verification -->
                        <div class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-6 space-y-4">
                            <h3 class="text-lg font-medium text-white">Proof of Address</h3>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <label class="block text-sm font-medium text-gray-400">
                                        Upload a recent utility bill or bank statement
                                    </label>
                                    <span id="address_proof_status" class="text-gray-400 text-sm">Not uploaded</span>
                                </div>
                                <input type="file"
                                       accept="image/*,.pdf"
                                       onchange="handleDocumentUpload(this.files[0], 'address_proof')"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                        </div>

                        <button id="kycSubmitBtn"
                                type="submit"
                                disabled
                                class="w-full md:w-auto px-8 py-4 bg-gray-500/50 text-gray-400 rounded-xl cursor-not-allowed transition-colors flex items-center justify-center gap-2">
                            <i class="fas fa-shield-alt"></i>
                            Submit Documents for Verification
                        </button>
                    </form>

                    <!-- Status Display for Approved/Pending -->
                    ${r==="approved"?`
                        <div class="text-center space-y-4">
                            <div class="text-6xl text-green-500">
                                <i class="fas fa-shield-check"></i>
                            </div>
                            <h2 class="text-xl font-medium text-white">Verification Complete</h2>
                            <p class="text-gray-400">Your identity has been verified successfully</p>
                        </div>
                    `:r==="pending"?`
                        <div class="text-center space-y-4">
                            <div class="text-6xl text-yellow-500">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h2 class="text-xl font-medium text-white">Verification in Progress</h2>
                            <p class="text-gray-400">We are reviewing your documents. This usually takes 1-2 business days.</p>
                        </div>
                    `:""}
                </div>
            </main>
        `,pageEvents:()=>{y(),b()}}};export{K as default};
//# sourceMappingURL=kyc-BXT9J58a.js.map
