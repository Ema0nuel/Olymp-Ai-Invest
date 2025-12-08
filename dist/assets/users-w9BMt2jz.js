const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Management-b6nLML7q.js","assets/toastify-C88f8oFV.js","assets/send-email-89Z52C2k.js"])))=>i.map(i=>d[i]);
import{a as B,b as L}from"./reset-3f-UIG5W.js";import{A as W,S as q}from"./Navbar-CxurQj6q.js";import{l as z}from"./adminLoginHandler-DcpfhJP5.js";import{_ as O,l as R}from"./index-DJYm-znp.js";import{M as v}from"./Modal-jvk0lnFM.js";import{t as g}from"./toastify-C88f8oFV.js";import{s as b,c as V}from"./supabaseClients-BL8TJKO9.js";import{E as H,S as Y,B as X}from"./sol-CyENyCty.js";import{B as E}from"./bnb-DZcecBIT.js";import{s as I}from"./send-email-89Z52C2k.js";import{A as J}from"./user-BBhvX4PB.js";import{c as K}from"./countries-DI9tzH0y.js";import{c as Q,g as Z}from"./signupHandler-sMtU2jRD.js";import"./index-DqSJWM6c.js";import"./logo-9_xFcp4C.js";import"./621506e9a1183737fff2f2b8_NFT's _ Metaverse-CtPoGJaq.js";import"./webAuthnHelper-CFOYufXH.js";const M=43200,S=1440,F=Symbol.for("constructDateFrom");function j(r,t){return typeof r=="function"?r(t):r&&typeof r=="object"&&F in r?r[F](t):r instanceof Date?new r.constructor(t):new Date(t)}function w(r,t){return j(r,r)}let G={};function ee(){return G}function C(r){const t=w(r),e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),+r-+e}function U(r,...t){const e=j.bind(null,r||t.find(a=>typeof a=="object"));return t.map(e)}function _(r,t){const e=+w(r)-+w(t);return e<0?-1:e>0?1:e}function te(r,t,e){const[a,n]=U(e?.in,r,t),s=a.getFullYear()-n.getFullYear(),l=a.getMonth()-n.getMonth();return s*12+l}function ae(r){return t=>{const a=(r?Math[r]:Math.trunc)(t);return a===0?0:a}}function ne(r,t){return+w(r)-+w(t)}function re(r,t){const e=w(r);return e.setHours(23,59,59,999),e}function se(r,t){const e=w(r),a=e.getMonth();return e.setFullYear(e.getFullYear(),a+1,0),e.setHours(23,59,59,999),e}function ie(r,t){const e=w(r);return+re(e)==+se(e)}function oe(r,t,e){const[a,n,s]=U(e?.in,r,r,t),l=_(n,s),i=Math.abs(te(n,s));if(i<1)return 0;n.getMonth()===1&&n.getDate()>27&&n.setDate(30),n.setMonth(n.getMonth()-l*i);let f=_(n,s)===-l;ie(a)&&i===1&&_(a,s)===1&&(f=!1);const h=l*(i-+f);return h===0?0:h}function le(r,t,e){const a=ne(r,t)/1e3;return ae(e?.roundingMethod)(a)}const de={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},ce=(r,t,e)=>{let a;const n=de[r];return typeof n=="string"?a=n:t===1?a=n.one:a=n.other.replace("{{count}}",t.toString()),e?.addSuffix?e.comparison&&e.comparison>0?"in "+a:a+" ago":a};function T(r){return(t={})=>{const e=t.width?String(t.width):r.defaultWidth;return r.formats[e]||r.formats[r.defaultWidth]}}const ue={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},me={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},be={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},he={date:T({formats:ue,defaultWidth:"full"}),time:T({formats:me,defaultWidth:"full"}),dateTime:T({formats:be,defaultWidth:"full"})},fe={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},pe=(r,t,e,a)=>fe[r];function $(r){return(t,e)=>{const a=e?.context?String(e.context):"standalone";let n;if(a==="formatting"&&r.formattingValues){const l=r.defaultFormattingWidth||r.defaultWidth,i=e?.width?String(e.width):l;n=r.formattingValues[i]||r.formattingValues[l]}else{const l=r.defaultWidth,i=e?.width?String(e.width):r.defaultWidth;n=r.values[i]||r.values[l]}const s=r.argumentCallback?r.argumentCallback(t):t;return n[s]}}const ge={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},ye={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},ve={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},we={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},xe={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},De={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},ke=(r,t)=>{const e=Number(r),a=e%100;if(a>20||a<10)switch(a%10){case 1:return e+"st";case 2:return e+"nd";case 3:return e+"rd"}return e+"th"},$e={ordinalNumber:ke,era:$({values:ge,defaultWidth:"wide"}),quarter:$({values:ye,defaultWidth:"wide",argumentCallback:r=>r-1}),month:$({values:ve,defaultWidth:"wide"}),day:$({values:we,defaultWidth:"wide"}),dayPeriod:$({values:xe,defaultWidth:"wide",formattingValues:De,defaultFormattingWidth:"wide"})};function A(r){return(t,e={})=>{const a=e.width,n=a&&r.matchPatterns[a]||r.matchPatterns[r.defaultMatchWidth],s=t.match(n);if(!s)return null;const l=s[0],i=a&&r.parsePatterns[a]||r.parsePatterns[r.defaultParseWidth],f=Array.isArray(i)?Me(i,o=>o.test(l)):Ae(i,o=>o.test(l));let h;h=r.valueCallback?r.valueCallback(f):f,h=e.valueCallback?e.valueCallback(h):h;const p=t.slice(l.length);return{value:h,rest:p}}}function Ae(r,t){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e)&&t(r[e]))return e}function Me(r,t){for(let e=0;e<r.length;e++)if(t(r[e]))return e}function _e(r){return(t,e={})=>{const a=t.match(r.matchPattern);if(!a)return null;const n=a[0],s=t.match(r.parsePattern);if(!s)return null;let l=r.valueCallback?r.valueCallback(s[0]):s[0];l=e.valueCallback?e.valueCallback(l):l;const i=t.slice(n.length);return{value:l,rest:i}}}const Te=/^(\d+)(th|st|nd|rd)?/i,Ue=/\d+/i,Ee={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},Se={any:[/^b/i,/^(a|c)/i]},Fe={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Ce={any:[/1/i,/2/i,/3/i,/4/i]},Pe={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},Ie={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},je={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Ne={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},Be={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},Le={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},We={ordinalNumber:_e({matchPattern:Te,parsePattern:Ue,valueCallback:r=>parseInt(r,10)}),era:A({matchPatterns:Ee,defaultMatchWidth:"wide",parsePatterns:Se,defaultParseWidth:"any"}),quarter:A({matchPatterns:Fe,defaultMatchWidth:"wide",parsePatterns:Ce,defaultParseWidth:"any",valueCallback:r=>r+1}),month:A({matchPatterns:Pe,defaultMatchWidth:"wide",parsePatterns:Ie,defaultParseWidth:"any"}),day:A({matchPatterns:je,defaultMatchWidth:"wide",parsePatterns:Ne,defaultParseWidth:"any"}),dayPeriod:A({matchPatterns:Be,defaultMatchWidth:"any",parsePatterns:Le,defaultParseWidth:"any"})},qe={code:"en-US",formatDistance:ce,formatLong:he,formatRelative:pe,localize:$e,match:We,options:{weekStartsOn:0,firstWeekContainsDate:1}};function x(r,t,e){const a=ee(),n=e?.locale??a.locale??qe,s=2520,l=_(r,t);if(isNaN(l))throw new RangeError("Invalid time value");const i=Object.assign({},e,{addSuffix:e?.addSuffix,comparison:l}),[f,h]=U(e?.in,...l>0?[t,r]:[r,t]),p=le(h,f),o=(C(h)-C(f))/1e3,d=Math.round((p-o)/60);let u;if(d<2)return e?.includeSeconds?p<5?n.formatDistance("lessThanXSeconds",5,i):p<10?n.formatDistance("lessThanXSeconds",10,i):p<20?n.formatDistance("lessThanXSeconds",20,i):p<40?n.formatDistance("halfAMinute",0,i):p<60?n.formatDistance("lessThanXMinutes",1,i):n.formatDistance("xMinutes",1,i):d===0?n.formatDistance("lessThanXMinutes",1,i):n.formatDistance("xMinutes",d,i);if(d<45)return n.formatDistance("xMinutes",d,i);if(d<90)return n.formatDistance("aboutXHours",1,i);if(d<S){const c=Math.round(d/60);return n.formatDistance("aboutXHours",c,i)}else{if(d<s)return n.formatDistance("xDays",1,i);if(d<M){const c=Math.round(d/S);return n.formatDistance("xDays",c,i)}else if(d<M*2)return u=Math.round(d/M),n.formatDistance("aboutXMonths",u,i)}if(u=oe(h,f),u<12){const c=Math.round(d/M);return n.formatDistance("xMonths",c,i)}else{const c=u%12,y=Math.trunc(u/12);return c<3?n.formatDistance("aboutXYears",y,i):c<9?n.formatDistance("overXYears",y,i):n.formatDistance("almostXYears",y+1,i)}}class N{constructor(){this.spinnerId="globalSpinner"}show(t="Loading..."){const e=document.createElement("div");e.id=this.spinnerId,e.innerHTML=`
            <div class="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-50
                        flex flex-col items-center justify-center">
                <div class="w-16 h-16 border-4 border-brand-primary/30 border-t-brand-primary
                            rounded-full animate-spin"></div>
                <div class="text-white mt-4">${t}</div>
            </div>
        `,document.body.appendChild(e)}hide(){document.getElementById(this.spinnerId)?.remove()}}function m(r,t=null){console.error("Error:",r),g({text:t||r.message||"An error occurred",background:"bg-red-500"})}const P={BTC:X,BNB:E,USDT:E,SOL:Y,ETH:H};function ze(r){return P[r.symbol]?`<img src="${P[r.symbol]}" alt="${r.symbol}" class="w-6 h-6">`:r.logo_url?`<img src="${r.logo_url}" alt="${r.symbol}" class="w-6 h-6">`:`<span class="text-lg text-brand-primary">${r.symbol.charAt(0)}</span>`}class Oe{constructor(t){if(!t)throw new Error("UserId is required");this.userId=t,this.spinner=new N,this.activeModals=new Set,this.refreshInterval=null,this.state={isLoading:!1,currentTab:"overview",filters:{transactionType:"",transactionStatus:""}},this.initializeManagers(),this.handleTabClick=e=>{this.currentTab=e,this.render()},this.render=this.debounce(e=>{const a=document.getElementById("userDetailsContent");!a||!this.userData||(a.innerHTML=`
                <div class="space-y-6">
                    ${this.renderBackButton()}
                    ${this.renderUserHeader()}
                    ${this.renderTabs()}
                    <div id="tabContent">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `,this.initializeTabEvents())},100),this.handleTabClick=this.handleTabClick.bind(this),this.handleAction=this.handleAction.bind(this)}stopAutoRefresh(){this.refreshInterval&&(clearInterval(this.refreshInterval),this.refreshInterval=null)}initializeManagers(){O(async()=>{const{KycManager:t,TransactionManager:e,BalanceManager:a,AssetManager:n,EmailNotifier:s}=await import("./Management-b6nLML7q.js");return{KycManager:t,TransactionManager:e,BalanceManager:a,AssetManager:n,EmailNotifier:s}},__vite__mapDeps([0,1,2])).then(({KycManager:t,TransactionManager:e,BalanceManager:a,AssetManager:n,EmailNotifier:s})=>{this.emailNotifier=new s(I,this.spinner),this.kycManager=new t(b,this.spinner),this.transactionManager=new e(b,this.spinner,this.emailNotifier),this.balanceManager=new a(b,this.spinner,this.emailNotifier),this.assetManager=new n(b,this.spinner,this.emailNotifier)})}async initialize(){try{await this.fetchUserData(),this.render(),this.initializeEventListeners(),this.initializeTabEvents(),this.startAutoRefresh()}catch(t){m(t,"Failed to initialize user view")}}async fetchUserData(){this.spinner.show("Loading user details...");try{const{data:t,error:e}=await b.from("profiles").select(this.getFullUserQuery()).eq("id",this.userId).single();if(e)throw e;this.userData=t}catch(t){m(t,"Failed to load user details")}finally{this.spinner.hide()}}initializeEventDelegation(){const t=document.getElementById("userDetailsContent");t&&t.addEventListener("click",e=>{const a=e.target.closest("[data-action]");if(!a)return;const{action:n,id:s,type:l}=a.dataset;this.handleAction(n,s,l)})}async handleAction(t,e,a){try{switch(t){case"editBalance":await this.handleEditBalance(e,a);break;case"handleTransaction":await this.handleTransaction(e,a);break;case"editAsset":await this.handleEditUserAsset(e);break}}catch(n){m(n,`Failed to handle ${t}`)}}updateState(t){this.state={...this.state,...t},this.render()}showModal(t){this.activeModals.add(t),t.show()}clearModals(){this.activeModals.forEach(t=>t.hide()),this.activeModals.clear()}startAutoRefresh(){this.refreshInterval=setInterval(()=>{document.hidden||this.fetchUserData()},3e4)}destroy(){try{this.stopAutoRefresh(),this.clearModals(),document.querySelectorAll("[data-tab]").forEach(a=>{a.removeEventListener("click",this.handleTabClick)});const t=document.getElementById("userDetailsContent");t&&(t.removeEventListener("click",this.handleAction),t.innerHTML=""),["handleTransaction","editBalance","addUserAsset","editUserAsset","removeUserAsset","handleKycDocument","sendNotification","markNotificationRead","deleteNotification","editUserProfile","sendCustomEmail","manageUserAssets","viewTransaction","openImage"].forEach(a=>{window[a]&&(window[a]=null)}),this.userData=null}catch(t){console.error("Error during cleanup:",t)}}render(){const t=document.getElementById("userDetailsContent");!t||!this.userData||(t.innerHTML=`
            <div class="space-y-6">
                ${this.renderBackButton()}
                ${this.renderUserHeader()}
                ${this.renderTabs()}
                <div id="tabContent">
                    ${this.renderTabContent()}
                </div>
            </div>
        `,this.initializeTabEvents())}renderBackButton(){return`
            <button onclick="window.backToUsersList()"
                class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <i class="fas fa-arrow-left"></i>
                <span>Back to Users</span>
            </button>
        `}renderUserHeader(){const{full_name:t,email:e,avatar_url:a,is_verified:n,created_at:s}=this.userData,l=this.userData.trading_accounts?.find(i=>i.account_type==="live");return`
        <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center overflow-hidden">
                        ${a?`<img src="${a}" alt="${t}" class="w-full h-full object-cover">`:`<span class="text-2xl text-brand-primary">${t.charAt(0).toUpperCase()}</span>`}
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold text-white">${t}</h2>
                        <div class="text-gray-400 mt-1">${e}</div>
                        <div class="flex items-center gap-3 mt-2">
                            <span class="px-2 py-1 rounded-full text-sm
                                ${n?"bg-green-500/10 text-green-500":"bg-yellow-500/10 text-yellow-500"}">
                                ${n?"Verified":"Pending Verification"}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm text-gray-400">Live Balance</div>
                    <div class="text-2xl font-bold text-white mt-1">
                        $${l?.balance?.toLocaleString()||"0.00"}
                    </div>
                    <div class="text-sm text-gray-400 mt-2">
                        Joined ${x(new Date(s),new Date,{addSuffix:!0})}
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap gap-2 mt-6 pt-6 border-t border-brand-primary/10">
                <button onclick="window.editUserProfile('${this.userData.id}')"
                        class="px-3 py-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                    <i class="fas fa-edit"></i>
                    <span class="ml-2">Edit Profile</span>
                </button>
                <button onclick="window.sendCustomEmail('${this.userData.id}')"
                        class="px-3 py-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                    <i class="fas fa-envelope"></i>
                    <span class="ml-2">Send Email</span>
                </button>
                <button onclick="window.manageUserAssets('${this.userData.id}')"
                        class="px-3 py-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                    <i class="fas fa-coins"></i>
                    <span class="ml-2">Manage Assets</span>
                </button>
            </div>
        </div>
        `}renderTabs(){return`
            <div class="flex overflow-x-auto hide-scrollbar gap-2">
                ${[{id:"overview",label:"Overview",icon:"chart-pie"},{id:"assets",label:"Assets",icon:"coins"},{id:"transactions",label:"Transactions",icon:"exchange-alt"},{id:"kyc",label:"KYC Documents",icon:"id-card"},{id:"notifications",label:"Notifications",icon:"bell"}].map(e=>`
                    <button data-tab="${e.id}"
                        class="flex items-center gap-2 px-4 py-2 rounded-xl
                        ${e.id===this.currentTab?"bg-brand-primary text-white":"text-gray-400 hover:text-white"}
                        transition-colors">
                        <i class="fas fa-${e.icon}"></i>
                        <span>${e.label}</span>
                    </button>
                `).join("")}
            </div>
        `}renderTabContent(){if(!this.userData)return"<div>Loading...</div>";switch(this.currentTab){case"overview":return this.renderOverviewTab();case"assets":return this.renderAssetsTab();case"transactions":return this.renderTransactionsTab();case"kyc":return this.renderKycTab();case"notifications":return this.renderNotificationsTab();default:return this.renderOverviewTab()}}renderOverviewTab(){const t=this.userData.trading_accounts?.find(n=>n.account_type==="live"),e=this.userData.trading_accounts?.find(n=>n.account_type==="demo"),a=this.userData.transactions?.filter(n=>n.status==="pending")||[];return`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-brand-black/30 rounded-xl p-6 space-y-4">
                <h3 class="text-lg font-semibold text-white">Account Summary</h3>
                <div class="p-4 bg-brand-primary/10 rounded-xl">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-400">Live Balance</span>
                        <button onclick="window.editBalance('${t?.id}', 'live')"
                                class="text-sm text-brand-primary hover:text-brand-primary/80">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                    <div class="text-2xl font-bold text-white mt-1">
                        $${t?.balance?.toLocaleString()||"0.00"}
                    </div>
                    <div class="text-sm text-gray-400 mt-2">
                        Leverage: ${t?.leverage||100}x
                    </div>
                </div>
                <div class="p-4 bg-brand-primary/5 rounded-xl">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-400">Demo Balance</span>
                        <button onclick="window.editBalance('${e?.id}', 'demo')"
                                class="text-sm text-brand-primary hover:text-brand-primary/80">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                    <div class="text-xl text-gray-300 mt-1">
                        $${e?.balance?.toLocaleString()||"0.00"}
                    </div>
                </div>
            </div>
            <div class="bg-brand-black/30 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Pending Transactions</h3>
                ${a.length?`<div class="space-y-3">
                        ${a.map(n=>`
                            <div class="p-4 bg-brand-black/20 rounded-xl">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="text-white capitalize">${n.type}</div>
                                        <div class="text-sm text-gray-400">
                                            $${n.amount.toLocaleString()} ${n.currency||""}
                                        </div>
                                        <div class="text-xs text-gray-500 mt-1">
                                            ${x(new Date(n.created_at),new Date,{addSuffix:!0})}
                                        </div>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="window.handleTransaction('${n.id}', 'approve')"
                                                class="px-3 py-1 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors">
                                            Approve
                                        </button>
                                        <button onclick="window.handleTransaction('${n.id}', 'reject')"
                                                class="px-3 py-1 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>`:'<div class="text-center text-gray-400 py-6">No pending transactions</div>'}
            </div>
        </div>
        `}renderAssetsTab(){const t=this.userData.user_assets||[];return`
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">User Assets</h3>
                <button onclick="window.addUserAsset('${this.userData.id}')"
                        class="px-4 py-2 rounded-xl bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors">
                    <i class="fas fa-plus"></i>
                    <span class="ml-2">Add Asset</span>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${t.length?t.map(e=>`
                        <div class="bg-brand-black/30 rounded-xl p-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center overflow-hidden">
                                        ${ze(e.assets)}
                                    </div>
                                    <div>
                                        <div class="font-medium text-white">${e.assets.symbol}</div>
                                        <div class="text-sm text-gray-400">${e.assets.name}</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button onclick="window.editUserAsset('${e.id}')"
                                            class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="window.removeUserAsset('${e.id}')"
                                            class="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="mt-4 pt-4 border-t border-brand-primary/10">
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-400">Balance</span>
                                    <span class="text-white font-medium">${e.balance} ${e.assets.symbol}</span>
                                </div>
                            </div>
                        </div>
                    `).join(""):'<div class="col-span-full p-8 text-center text-gray-400 bg-brand-black/30 rounded-xl">No assets found for this user</div>'}
            </div>
        </div>
        `}renderTransactionsTab(){const t=this.userData.transactions||[],e=t.filter(a=>a.status==="pending").length;return`
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">
                    Transactions 
                    ${e?`<span class="ml-2 px-2 py-1 rounded-full text-sm bg-yellow-500/10 text-yellow-500">${e} pending</span>`:""}
                </h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="text-left border-b border-brand-primary/10">
                            <th class="p-4 text-gray-400 font-medium">Type</th>
                            <th class="p-4 text-gray-400 font-medium">Amount</th>
                            <th class="p-4 text-gray-400 font-medium">Status</th>
                            <th class="p-4 text-gray-400 font-medium">Date</th>
                            <th class="p-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.length?t.map(a=>`
                                <tr class="border-b border-brand-primary/10">
                                    <td class="p-4">
                                        <div class="flex items-center gap-3">
                                            <span class="capitalize">${a.type}</span>
                                        </div>
                                    </td>
                                    <td class="p-4">
                                        <div class="text-white">$${a.amount.toLocaleString()}</div>
                                        ${a.fee?`<div class="text-sm text-gray-400">Fee: $${a.fee.toLocaleString()}</div>`:""}
                                    </td>
                                    <td class="p-4">
                                        <span class="px-2 py-1 rounded-full text-sm
                                            ${a.status==="completed"?"bg-green-500/10 text-green-500":a.status==="pending"?"bg-yellow-500/10 text-yellow-500":"bg-red-500/10 text-red-500"}">
                                            ${a.status}
                                        </span>
                                    </td>
                                    <td class="p-4 text-gray-400">
                                        ${x(new Date(a.created_at),new Date,{addSuffix:!0})}
                                    </td>
                                    <td class="p-4">
                                        <div class="flex items-center gap-2">
                                            <button onclick="window.viewTransaction('${a.id}')"
                                                    class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            ${a.status==="pending"?`
                                                    <button onclick="window.handleTransaction('${a.id}', 'approve')"
                                                            class="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors">
                                                        <i class="fas fa-check"></i>
                                                    </button>
                                                    <button onclick="window.handleTransaction('${a.id}', 'reject')"
                                                            class="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                                                        <i class="fas fa-times"></i>
                                                    </button>
                                                `:""}
                                        </div>
                                    </td>
                                </tr>
                            `).join(""):'<tr><td colspan="5" class="p-8 text-center text-gray-400">No transactions found</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
        `}renderKycTab(){const{kyc_documents:t=[],kyc_status:e,kyc_submitted_at:a}=this.userData;return`
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-white">KYC Documents</h3>
                <span class="px-3 py-1 rounded-full text-sm
                    ${e==="approved"?"bg-green-500/10 text-green-500":e==="pending"?"bg-yellow-500/10 text-yellow-500":e==="rejected"?"bg-red-500/10 text-red-500":"bg-gray-500/10 text-gray-500"}">
                    ${e?.replace("_"," ").toUpperCase()||"NOT STARTED"}
                </span>
            </div>
            ${a?`<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${t.map(n=>`
                        <div class="bg-brand-black/30 rounded-xl p-4">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h4 class="text-white capitalize">${n.document_type.replace(/_/g," ")}</h4>
                                    <div class="text-sm text-gray-400 mt-1">
                                        Submitted ${x(new Date(n.created_at),new Date,{addSuffix:!0})}
                                    </div>
                                </div>
                                <span class="px-2 py-1 rounded-full text-sm
                                    ${n.status==="approved"?"bg-green-500/10 text-green-500":n.status==="pending"?"bg-yellow-500/10 text-yellow-500":"bg-red-500/10 text-red-500"}">
                                    ${n.status}
                                </span>
                            </div>
                            <div class="aspect-video bg-brand-black/20 rounded-lg overflow-hidden mb-4">
                                <img src="${n.document_url}" alt="${n.document_type}" class="w-full h-full object-contain cursor-pointer" onclick="window.openImage('${n.document_url}')">
                            </div>
                            ${n.status==="pending"?`<div class="flex gap-2">
                                    <button onclick="window.handleKycDocument('${n.id}', 'approve')"
                                            class="flex-1 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors">
                                        Approve
                                    </button>
                                    <button onclick="window.handleKycDocument('${n.id}', 'reject')"
                                            class="flex-1 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                                        Reject
                                    </button>
                                </div>`:""}
                        </div>
                    `).join("")}
                </div>`:'<div class="text-center text-gray-400 py-8">User has not submitted KYC documents yet</div>'}
        </div>
        `}renderNotificationsTab(){const t=this.userData.notifications||[];return`
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">Notifications</h3>
                <button onclick="window.sendNotification('${this.userData.id}')"
                        class="px-4 py-2 rounded-xl bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors">
                    <i class="fas fa-plus"></i>
                    <span class="ml-2">Send Notification</span>
                </button>
            </div>
            <div class="space-y-4">
                ${t.length?t.map(e=>`
                        <div class="bg-brand-black/30 rounded-xl p-4 flex items-start justify-between ${e.is_read?"":"border-l-4 border-brand-primary"}">
                            <div class="flex-1">
                                <div class="flex items-center gap-2">
                                    <h4 class="text-white font-medium">${e.title}</h4>
                                    <span class="px-2 py-0.5 rounded-full text-xs capitalize bg-brand-primary/10 text-brand-primary">${e.type}</span>
                                </div>
                                <p class="text-gray-400 mt-1">${e.message}</p>
                                <div class="text-sm text-gray-500 mt-2">
                                    ${x(new Date(e.created_at),new Date,{addSuffix:!0})}
                                </div>
                            </div>
                            <div class="flex items-center gap-2 ml-4">
                                ${e.is_read?"":`<button onclick="window.markNotificationRead('${e.id}')" class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors"><i class="fas fa-check"></i></button>`}
                                <button onclick="window.deleteNotification('${e.id}')" class="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `).join(""):'<div class="text-center text-gray-400 py-8">No notifications found</div>'}
            </div>
        </div>
        `}initializeTabEvents(){document.querySelectorAll("[data-tab]").forEach(t=>{t.removeEventListener("click",this.handleTabClick),t.addEventListener("click",e=>{const a=e.currentTarget.dataset.tab;this.currentTab=a;const n=document.getElementById("tabContent");n&&(n.innerHTML=this.renderTabContent())})})}handleTabClick(t){const e=t.currentTarget;this.currentTab=e.dataset.tab,document.getElementById("tabContent").innerHTML=this.renderTabContent()}initializeEventListeners(){Object.entries({handleTransaction:async(e,a)=>{await this.transactionManager.handleTransaction(e,a),await this.fetchUserData(),this.render()},editBalance:(e,a)=>this.handleEditBalance(e,a),addUserAsset:e=>this.handleAddUserAsset(e),editUserAsset:e=>this.handleEditUserAsset(e),removeUserAsset:e=>this.handleRemoveUserAsset(e),handleKycDocument:(e,a)=>this.handleKycDocument(e,a),sendNotification:e=>this.handleSendNotification(e),markNotificationRead:e=>this.handleMarkNotificationRead(e),deleteNotification:e=>this.handleDeleteNotification(e),editUserProfile:e=>this.handleEditUserProfile(e),sendCustomEmail:e=>this.handleSendCustomEmail(e),manageUserAssets:e=>this.handleManageUserAssets(e),viewTransaction:e=>this.handleViewTransaction(e),openImage:e=>window.open(e,"_blank")}).forEach(([e,a])=>{window[e]=a.bind(this)})}getFullUserQuery(){return`
        *,
        trading_accounts (
            id, account_type, balance, leverage, asset_type
        ),
        user_assets (
            id, balance,
            assets:asset_id (
                id, symbol, name, logo_url
            )
        ),
        transactions!transactions_user_id_fkey (
            id, 
            type,
            status,
            amount,
            fee,
            fee_percentage,
            wallet_address,
            network,
            screenshot_url,
            created_at,
            completed_at,
            notes,
            metadata,
            currency,
            user_id,
            account_id
        ),
        notifications (
            id, title, message, type, is_read, created_at
        ),
        kyc_documents (
            id,
            document_type,
            document_url,
            status,
            verification_number,
            expiry_date,
            created_at,
            rejection_reason
        )
    `}async handleEditBalance(t,e){const a=this.userData.trading_accounts.find(s=>s.id===t);if(!a)return;const n=new v({title:`Edit ${e.toUpperCase()} Balance`,content:`
                <form id="editBalanceForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Current Balance</label>
                        <div class="text-xl font-bold text-white mt-1">
                            $${a.balance.toLocaleString()}
                        </div>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Action</label>
                        <select name="action" required
                                class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                       border border-brand-primary/20 text-white 
                                       focus:border-brand-primary outline-none">
                            <option value="set">Set exact amount</option>
                            <option value="add">Add to balance</option>
                            <option value="subtract">Subtract from balance</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Amount</label>
                        <input type="number" name="amount" required min="0" step="any"
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                      border border-brand-primary/20 text-white 
                                      focus:border-brand-primary outline-none">
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Reason</label>
                        <textarea name="reason" required rows="3"
                                  class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                         border border-brand-primary/20 text-white 
                                         focus:border-brand-primary outline-none"
                                  placeholder="Explain why you're modifying the balance..."></textarea>
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white 
                                   hover:bg-brand-primary/90 transition-colors">
                        Update Balance
                    </button>
                </form>
            `});n.show(),document.getElementById("editBalanceForm").onsubmit=async s=>{s.preventDefault();const l=new FormData(s.target),i=l.get("action"),f=parseFloat(l.get("amount")),h=l.get("reason");try{await this.balanceManager.updateBalance(t,i,f,h),n.hide(),await this.fetchUserData(),this.render()}catch(p){m(p,"Failed to update balance")}}}async handleAddUserAsset(t){const{data:e,error:a}=await b.from("assets").select("*").order("symbol");if(a)return m(a,"Failed to load assets");const n=new v({title:"Add User Asset",content:`
                <form id="addAssetForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Select Asset</label>
                        <select name="asset_id" required
                                class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                       border border-brand-primary/20 text-white 
                                       focus:border-brand-primary outline-none">
                            <option value="">Choose an asset</option>
                            ${e.map(s=>`
                                <option value="${s.id}">
                                    ${s.symbol} - ${s.name}
                                </option>
                            `).join("")}
                        </select>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Initial Balance</label>
                        <input type="number" name="balance" required min="0" step="any"
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                      border border-brand-primary/20 text-white 
                                      focus:border-brand-primary outline-none">
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white 
                                   hover:bg-brand-primary/90 transition-colors">
                        Add Asset
                    </button>
                </form>
            `});n.show(),document.getElementById("addAssetForm").onsubmit=async s=>{s.preventDefault();const l=new FormData(s.target);try{await this.assetManager.updateUserAsset(t,l.get("asset_id"),parseFloat(l.get("balance")),"set"),n.hide(),await this.fetchUserData(),this.render()}catch(i){m(i,"Failed to add asset")}}}async handleEditUserAsset(t){const e=this.userData.user_assets.find(n=>n.id===t);if(!e)return;const a=new v({title:`Edit ${e.assets.symbol} Balance`,content:`
                <form id="editAssetForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Current Balance</label>
                        <div class="text-xl font-bold text-white mt-1">
                            ${e.balance} ${e.assets.symbol}
                        </div>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Action</label>
                        <select name="action" required
                                class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                       border border-brand-primary/20 text-white 
                                       focus:border-brand-primary outline-none">
                            <option value="set">Set exact amount</option>
                            <option value="add">Add to balance</option>
                            <option value="subtract">Subtract from balance</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Amount</label>
                        <input type="number" name="amount" required min="0" step="any"
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                      border border-brand-primary/20 text-white 
                                      focus:border-brand-primary outline-none">
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white 
                                   hover:bg-brand-primary/90 transition-colors">
                        Update Asset
                    </button>
                </form>
            `});a.show(),document.getElementById("editAssetForm").onsubmit=async n=>{n.preventDefault();const s=new FormData(n.target);try{await this.assetManager.updateUserAsset(this.userId,e.assets.id,parseFloat(s.get("amount")),s.get("action")),a.hide(),await this.fetchUserData(),this.render()}catch(l){m(l,"Failed to update asset")}}}async handleRemoveUserAsset(t){if(window.confirm("Are you sure you want to remove this asset from the user?"))try{await b.from("user_assets").delete().eq("id",t),g({text:"Asset removed",background:"bg-green-500"}),await this.fetchUserData(),this.render()}catch(a){m(a,"Failed to remove asset")}}async handleKycDocument(t,e){try{let a=null;if(e==="reject"&&(a=prompt("Enter rejection reason:"),!a))return;await this.kycManager.handleDocumentReview(t,e,a),g({text:`Document ${e}d`,background:"bg-green-500"}),await this.fetchUserData(),this.render()}catch(a){m(a,`Failed to ${e} document`)}}async handleSendNotification(t){const e=new v({title:"Send Notification",content:`
                <form id="notificationForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Title</label>
                        <input type="text" name="title" required
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                      border border-brand-primary/20 text-white 
                                      focus:border-brand-primary outline-none">
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Message</label>
                        <textarea name="message" required rows="4"
                                  class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                         border border-brand-primary/20 text-white 
                                         focus:border-brand-primary outline-none"></textarea>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Type</label>
                        <select name="type" required
                                class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                       border border-brand-primary/20 text-white 
                                       focus:border-brand-primary outline-none">
                            <option value="system">System</option>
                            <option value="deposit">Deposit</option>
                            <option value="withdrawal">Withdrawal</option>
                            <option value="swap">Swap</option>
                        </select>
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white 
                                   hover:bg-brand-primary/90 transition-colors">
                        Send Notification
                    </button>
                </form>
            `});e.show(),document.getElementById("notificationForm").onsubmit=async a=>{a.preventDefault();const n=new FormData(a.target);try{await b.from("notifications").insert({user_id:t,title:n.get("title"),message:n.get("message"),type:n.get("type"),created_at:new Date().toISOString()}),e.hide(),g({text:"Notification sent",background:"bg-green-500"}),await this.fetchUserData(),this.render()}catch(s){m(s,"Failed to send notification")}}}async handleMarkNotificationRead(t){try{await b.from("notifications").update({is_read:!0}).eq("id",t),await this.fetchUserData(),this.render()}catch(e){m(e,"Failed to mark notification as read")}}async handleDeleteNotification(t){if(window.confirm("Delete this notification?"))try{await b.from("notifications").delete().eq("id",t),await this.fetchUserData(),this.render()}catch(a){m(a,"Failed to delete notification")}}async handleEditUserProfile(t){const e=new v({title:"Edit User Profile",content:`
                <form id="editProfileForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Full Name</label>
                        <input type="text" name="full_name" value="${this.userData.full_name||""}" required
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 border border-brand-primary/20 text-white focus:border-brand-primary outline-none">
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Email</label>
                        <input type="email" name="email" value="${this.userData.email||""}" required
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 border border-brand-primary/20 text-white focus:border-brand-primary outline-none">
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors">
                        Save Changes
                    </button>
                </form>
            `});e.show(),document.getElementById("editProfileForm").onsubmit=async a=>{a.preventDefault();const n=new FormData(a.target);try{await b.from("profiles").update({full_name:n.get("full_name"),email:n.get("email")}).eq("id",t),e.hide(),g({text:"Profile updated",background:"bg-green-500"}),await this.fetchUserData(),this.render()}catch(s){m(s,"Failed to update profile")}}}async handleSendCustomEmail(t){const e=new v({title:"Send Email",content:`
                <form id="sendEmailForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Subject</label>
                        <input type="text" name="subject" required
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 border border-brand-primary/20 text-white focus:border-brand-primary outline-none">
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Message</label>
                        <textarea name="message" required rows="6"
                                  class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 border border-brand-primary/20 text-white focus:border-brand-primary outline-none"></textarea>
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors">
                        Send Email
                    </button>
                </form>
            `});e.show(),document.getElementById("sendEmailForm").onsubmit=async a=>{a.preventDefault();const n=new FormData(a.target);try{await b.rpc("send_custom_email",{user_id:t,subject:n.get("subject"),message:n.get("message")}),e.hide(),g({text:"Email sent",background:"bg-green-500"})}catch(s){m(s,"Failed to send email")}}}async handleManageUserAssets(t){this.handleAddUserAsset(t)}async handleViewTransaction(t){const{data:e,error:a}=await b.from("transactions").select("*").eq("id",t).single();if(a)return m(a,"Failed to load transaction");new v({title:"Transaction Details",content:`
                <div class="space-y-4">
                    <div><b>Type:</b> ${e.type}</div>
                    <div><b>Status:</b> ${e.status}</div>
                    <div><b>Amount:</b> $${e.amount.toLocaleString()}</div>
                    <div><b>Fee:</b> $${e.fee?.toLocaleString()||"0"}</div>
                    <div><b>Date:</b> ${new Date(e.created_at).toLocaleString()}</div>
                    <div><b>Notes:</b> ${e.notes||"-"}</div>
                    <div><b>Wallet Address:</b> ${e.wallet_address||"-"}</div>
                    <div><b>Network:</b> ${e.network||"-"}</div>
                    ${e.screenshot_url?`<div><b>Screenshot:</b><br><img src="${e.screenshot_url}" class="max-w-full rounded-lg mt-2"></div>`:""}
                </div>
            `}).show()}debounce(t,e){let a;return function(...s){const l=()=>{clearTimeout(a),t(...s)};clearTimeout(a),a=setTimeout(l,e)}}}const Re=V("https://ezdabfeiajfpzyoqiqcc.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6ZGFiZmVpYWpmcHp5b3FpcWNjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODcyMTczMCwiZXhwIjoyMDc0Mjk3NzMwfQ.1_4mc-7OGSpxqBe5nescan2P4mlvHLDKGNvONsYc6wo"),lt=async()=>{B("Olymp AI User Panel Management"),L();let r="list",t=null,e=[];const a=new N;let n=null;async function s(){a.show("Loading users...");try{const{data:o,error:d}=await b.from("profiles").select(`
                    *,
                    trading_accounts (
                        id, account_type, balance, leverage, asset_type
                    ),
                    user_assets (
                        id, balance,
                        assets (id, symbol, name, logo_url)
                    )
                `).order("created_at",{ascending:!1});if(d)throw d;e=o,i()}catch(o){m(o,"Failed to load users")}finally{a.hide()}}function l(o){return`
            <div class="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center overflow-hidden">
                ${o.avatar_url?`<img src="${o.avatar_url||J}" 
                           alt="${o.full_name}" 
                           class="w-full h-full object-cover">`:`<span class="text-xl text-brand-primary">
                           ${o.full_name.charAt(0).toUpperCase()}
                       </span>`}
            </div>
        `}function i(){const o=document.getElementById("mainContent");if(o)try{switch(r){case"list":o.innerHTML=f();break;case"details":o.innerHTML='<div id="userDetailsContent"></div>',t&&(n=new Oe(t),n.initialize().catch(d=>{m(d,"Failed to initialize user details")}));break}}catch(d){m(d,"Failed to render content")}}function f(){return`
            <div class="space-y-6">
                <!-- Header with Add User Button -->
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-bold text-white">Users</h1>
                    <div class="flex flex-row gap-2">
                        <button onclick="window.handleAddUser()"
                                class="px-4 py-2 rounded-xl bg-brand-primary text-white
                                    hover:bg-brand-primary/90 transition-colors">
                            <i class="fas fa-plus"></i>
                            <span class="ml-2">Add User</span>
                        </button>
                        <button onclick="window.handleDeleteUser()"
                                class="px-4 py-2 rounded-xl bg-red-500 text-white
                                    hover:bg-red-500/80 transition-colors">
                            <i class="fas fa-plus"></i>
                            <span class="ml-2">Delete User</span>
                        </button>
                    </div>
                </div>

                <!-- Users Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${e.map(o=>`
                        <div class="bg-brand-black/50 rounded-xl p-6 hover:border-brand-primary/30 
                                  transition-colors cursor-pointer"
                             onclick="window.viewUserDetails('${o.id}')">
                            <!-- User card content -->
                            ${h(o)}
                        </div>
                    `).join("")}
                </div>
            </div>
        `}function h(o){const d=o.trading_accounts?.find(u=>u.account_type==="live");return`
            <div class="flex items-start justify-between">
                <!-- User basic info -->
                <div class="flex items-center gap-4">
                    ${l(o)}
                    <div>
                        <h3 class="font-medium text-white">${o.full_name}</h3>
                        <p class="text-sm text-gray-400">${o.email}</p>
                    </div>
                </div>
                <!-- Verification status -->
                <span class="px-2 py-1 rounded-full text-sm
                    ${o.is_verified?"bg-green-500/10 text-green-500":"bg-yellow-500/10 text-yellow-500"}">
                    ${o.is_verified?"Verified":"Pending"}
                </span>
            </div>
            <!-- User balance info -->
            <div class="mt-4 pt-4 border-t border-brand-primary/10">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="text-sm text-gray-400">Live Balance</span>
                        <p class="text-white mt-1">
                            $${d?.balance?.toLocaleString()||"0.00"}
                        </p>
                    </div>
                    <div>
                        <span class="text-sm text-gray-400">Joined</span>
                        <p class="text-white mt-1">
                            ${x(new Date(o.created_at),new Date,{addSuffix:!0})}
                        </p>
                    </div>
                </div>
            </div>
        `}function p(){q(),document.querySelectorAll("[data-nav]").forEach(o=>{o.addEventListener("click",async d=>{d.preventDefault();const u=o.dataset.route;u&&await R(`admin${u.charAt(0).toUpperCase()+u.slice(1)}`)})}),document.getElementById("admin-logout")?.addEventListener("click",async()=>{await z()}),s(),window.viewUserDetails=o=>{if(o)try{t=o,r="details",i()}catch(d){m(d,"Failed to view user details")}},window.backToUsersList=()=>{try{n&&(["handleTransaction","editBalance","addUserAsset","editUserAsset","removeUserAsset","handleKycDocument","sendNotification","markNotificationRead","deleteNotification","editUserProfile","sendCustomEmail","manageUserAssets","viewTransaction","openImage"].forEach(o=>{window[o]&&(window[o]=null)}),n.destroy(),n=null),r="list",i()}catch(o){m(o,"Failed to return to users list")}},window.handleAddUser=()=>{new v({title:"Add New User",content:`
            <form id="addUserForm" class="space-y-6">
                <!-- Full Name Input -->
                <div class="form-group">
                    <label for="fullname" class="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                    </label>
                    <input type="text" id="fullname" name="fullname"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all"
                           placeholder="Enter user's full name" required>
                </div>

                <!-- Email Input -->
                <div class="form-group">
                    <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                    </label>
                    <input type="email" id="email" name="email"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all"
                           placeholder="user@example.com" required>
                </div>

                <!-- Phone Input -->
                <div class="form-group">
                    <label for="phone" class="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                    </label>
                    <input type="tel" id="phone" name="phone"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all"
                           placeholder="+1234567890" required>
                </div>

                <!-- Country Selection -->
                <div class="form-group">
                    <label for="country" class="block text-sm font-medium text-gray-300 mb-2">
                        Country
                    </label>
                    <select id="country" name="country"
                            class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                   border border-brand-primary/30 focus:border-brand-primary 
                                   outline-none transition-all" required>
                        <option value="">Select Country</option>
                        ${K.map(d=>`<option value="${d.code}">${d.name}</option>`).join("")}
                    </select>
                </div>

                <!-- Password Input -->
                <div class="form-group">
                    <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                        Password
                    </label>
                    <input type="password" id="password" name="password"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all"
                           placeholder="Create password" required>
                </div>
            </form>
        `,actions:[{text:"Add User",primary:!0,onClick:async d=>{const u=document.getElementById("addUserForm"),c={fullname:u.fullname.value.trim(),email:u.email.value.trim(),phone:u.phone.value.trim(),country:u.country.value,password:u.password.value};if(!c.fullname||!c.email||!c.phone||!c.country||!c.password){g({text:"Please fill in all fields",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"});return}try{a.show("Creating user account...");const{data:y,error:D}=await b.auth.signUp({email:c.email,password:c.password,options:{data:{full_name:c.fullname}}});if(D)throw D;const{error:k}=await b.from("profiles").insert({id:y.user.id,full_name:c.fullname,email:c.email,phone_number:c.phone,country:c.country,is_verified:!0});if(k)throw k;await Q(y.user.id),await I({to:c.email,subject:"Welcome to Olymp AI Invest",html:Z(c.email)}),d(),g({text:"User created successfully",icon:"fas fa-check-circle",background:"bg-green-500/10"}),window.dispatchEvent(new Event("refreshUsers"))}catch(y){console.error("Error creating user:",y),g({text:y.message||"Failed to create user",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}finally{a.hide()}}}]}).show()},window.handleDeleteUser=()=>{new v({title:"Delete User",content:`
            <form id="deleteUserForm" class="space-y-6">
                <div class="form-group">
                    <label for="userEmail" class="block text-sm font-medium text-gray-300 mb-2">
                        User Email
                    </label>
                    <input type="email" id="userEmail" name="userEmail"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all"
                           placeholder="Enter user's email" required>
                </div>
                <div class="mt-4 p-4 bg-red-500/10 rounded-lg">
                    <p class="text-red-500">Warning: This action cannot be undone!</p>
                    <p class="text-gray-400 mt-2">
                        This will permanently delete the user account and all associated data including:
                        <ul class="list-disc list-inside mt-2 space-y-1">
                            <li>Profile information</li>
                            <li>Trading accounts</li>
                            <li>Transaction history</li>
                            <li>Assets and balances</li>
                            <li>KYC documents</li>
                        </ul>
                    </p>
                </div>
            </form>
        `,actions:[{text:"Delete User",primary:!0,class:"bg-red-500 hover:bg-red-600",onClick:async d=>{try{const u=document.getElementById("userEmail").value.trim();if(!u){g({text:"Please enter user's email",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"});return}a.show("Deleting user...");const{data:c,error:y}=await b.from("profiles").select("id").eq("email",u).single();if(y||!c)throw new Error("User not found");const{error:D}=await Re.auth.admin.deleteUser(c.id);if(D)throw D;const{error:k}=await b.from("profiles").delete().eq("id",c.id);if(k)throw k;d(),g({text:"User deleted successfully",icon:"fas fa-check-circle",background:"bg-green-500/10"}),s()}catch(u){console.error("Error deleting user:",u),g({text:u.message||"Failed to delete user",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}finally{a.hide()}}},{text:"Cancel",onClick:d=>d()}]}).show()},window.addEventListener("refreshUsers",s)}return{html:`
            <div class="flex min-h-screen bg-brand-dark mobile-container">
                ${W().html}
                <main class="flex-1 lg:ml-24 p-4 lg:p-8 pb-24 lg:pb-8">
                    <div id="mainContent" class="max-w-7xl mx-auto space-y-6">
                        <!-- Content will be rendered here -->
                    </div>
                </main>
            </div>
        `,pageEvents:p}};export{lt as default};
//# sourceMappingURL=users-w9BMt2jz.js.map
