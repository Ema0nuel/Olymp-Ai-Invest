async function r({to:s,subject:t,html:a}){const e=await(await fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:s,subject:t,html:a})})).json();if(!e.success)throw new Error(e.error||"Failed to send email");return e.result}export{r as s};
//# sourceMappingURL=send-email-89Z52C2k.js.map
