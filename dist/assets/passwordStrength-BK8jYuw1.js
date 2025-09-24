function g(n){let e=0;const t=[];return n.length>=8&&(e+=25,t.push("Length")),/\d/.test(n)&&(e+=25,t.push("Number")),/[a-zA-Z]/.test(n)&&(e+=25,t.push("Letter")),/[!@#$%^&*(),.?":{}|<>]/.test(n)&&(e+=25,t.push("Special")),{strength:e,color:e<=25?"bg-red-500":e<=50?"bg-yellow-500":e<=75?"bg-blue-500":"bg-green-500",indicators:t}}export{g as c};
//# sourceMappingURL=passwordStrength-BK8jYuw1.js.map
