(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();let u=!1,p="";const f="https://admin-site-ze7d.onrender.com";function b(){document.querySelector("#app").innerHTML=`
    <div class="login-container">
      <h2>Login</h2>
      <form id="loginForm">
        <input type="text" id="loginUsername" placeholder="Username" required /><br />
        <input type="password" id="loginPassword" placeholder="Password" required /><br />
        <button type="submit">Login</button>
        <div id="loginError" style="color:red;"></div>
      </form>
    </div>
  `,document.getElementById("loginForm").onsubmit=async d=>{d.preventDefault();const t=document.getElementById("loginUsername").value,n=document.getElementById("loginPassword").value,r=await fetch(`${f}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:n})});if(r.ok)u=!0,p=t,g();else{const e=await r.json();document.getElementById("loginError").innerText=e.message||"Login failed"}}}function g(){document.querySelector("#app").innerHTML=`
    <div class="form-container">
      <h2>Submit Player Data</h2>
      <form id="playerForm">
        <label>Username of Player</label><br />
        <input type="text" id="playerUsername" required /><br />
        <label>Amount to Add</label><br />
        <input type="number" id="amountToAdd" required /><br />
        <label>Upload Proof of Purchase Here.</label><br />
        <input type="file" id="proofImage" accept="image/*" required /><br />
        <div style="font-size: 0.9em; color: #fff;">You can also paste an image from your clipboard.</div>
        <button type="button" id="exampleBtn" style="margin-top:10px;">Example</button>
        <button type="submit">Submit</button>
        <div id="formError" style="color:red;"></div>
        <div id="formSuccess" style="color:green;"></div>
      </form>
      <div id="exampleModal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.6); align-items:center; justify-content:center; z-index:1000;">
        <div style="background:#fff; padding:24px; border-radius:8px; max-width:90vw; max-height:90vh; text-align:center; position:relative;">
          <div style="margin-bottom:12px; font-weight:bold; color:#111;">Here's an example of the proof of purchase, we need the full details of the charge. You can get it on your phone.</div>
          <img src="https://i.ibb.co/ns7DFSTG/image.png" alt="Example Proof" style="max-width:100%; max-height:60vh; border:1px solid #ccc; border-radius:4px;" />
          <br />
          <button id="closeExampleModal" style="margin-top:16px;">Close</button>
        </div>
      </div>
    </div>
  `,document.getElementById("exampleBtn").onclick=()=>{document.getElementById("exampleModal").style.display="flex"},document.getElementById("closeExampleModal").onclick=()=>{document.getElementById("exampleModal").style.display="none"};const d=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",t=>{if(t.clipboardData&&t.clipboardData.files&&t.clipboardData.files.length>0){const n=t.clipboardData.files[0];if(n.type.startsWith("image/")){const r=new DataTransfer;r.items.add(n),d.files=r.files}}}),document.getElementById("playerForm").onsubmit=async t=>{t.preventDefault();const n=document.getElementById("playerUsername").value,r=document.getElementById("amountToAdd").value,e=document.getElementById("proofImage").files[0];if(!e){document.getElementById("formError").innerText="Image required.";return}const o="321fcbefd94f6d6936d225a7c1004060",i=await new Promise((a,l)=>{const s=new FileReader;s.onload=()=>a(s.result.split(",")[1]),s.onerror=l,s.readAsDataURL(e)});let m="";try{const l=await(await fetch(`https://api.imgbb.com/1/upload?key=${o}`,{method:"POST",body:new URLSearchParams({image:i})})).json();if(l.success)m=l.data.url;else{document.getElementById("formError").innerText="Image upload failed.";return}}catch{document.getElementById("formError").innerText="Image upload failed.";return}const y={playerUsername:n,amountToAdd:r,proofImageUrl:m,adminUsername:p},c=await fetch(`${f}/api/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(y)});if(c.ok)document.getElementById("formSuccess").innerText="Submitted successfully!",document.getElementById("formError").innerText="",document.getElementById("playerForm").reset();else{const a=await c.json();document.getElementById("formError").innerText=a.message||"Submission failed.",document.getElementById("formSuccess").innerText=""}}}u?g():b();
