(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();let d=!1,s="";const l="https://admin-site-ze7d.onrender.com";function u(){document.querySelector("#app").innerHTML=`
    <div class="login-container">
      <h2>Login</h2>
      <form id="loginForm">
        <input type="text" id="loginUsername" placeholder="Username" required /><br />
        <input type="password" id="loginPassword" placeholder="Password" required /><br />
        <button type="submit">Login</button>
        <div id="loginError" style="color:red;"></div>
      </form>
    </div>
  `,document.getElementById("loginForm").onsubmit=async a=>{a.preventDefault();const r=document.getElementById("loginUsername").value,n=document.getElementById("loginPassword").value,o=await fetch(`${l}/api/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:r,password:n})});if(o.ok)d=!0,s=r,m();else{const e=await o.json();document.getElementById("loginError").innerText=e.message||"Login failed"}}}function m(){document.querySelector("#app").innerHTML=`
    <div class="form-container">
      <h2>Submit Player Data</h2>
      <form id="playerForm">
        <label>Username of Player</label><br />
        <input type="text" id="playerUsername" required /><br />
        <label>Amount to Add</label><br />
        <input type="number" id="amountToAdd" required /><br />
        <label>Upload Proof of Purchase Here.</label><br />
        <input type="file" id="proofImage" accept="image/*" required /><br />
        <div style="font-size: 0.9em; color: #555;">You can also paste an image from your clipboard.</div>
        <button type="submit">Submit</button>
        <div id="formError" style="color:red;"></div>
        <div id="formSuccess" style="color:green;"></div>
      </form>
    </div>
  `;const a=document.getElementById("proofImage");document.getElementById("playerForm").addEventListener("paste",r=>{if(r.clipboardData&&r.clipboardData.files&&r.clipboardData.files.length>0){const n=r.clipboardData.files[0];if(n.type.startsWith("image/")){const o=new DataTransfer;o.items.add(n),a.files=o.files}}}),document.getElementById("playerForm").onsubmit=async r=>{r.preventDefault();const n=document.getElementById("playerUsername").value,o=document.getElementById("amountToAdd").value,e=document.getElementById("proofImage").files[0];if(!e){document.getElementById("formError").innerText="Image required.";return}const t=new FormData;t.append("playerUsername",n),t.append("amountToAdd",o),t.append("proofImage",e),t.append("adminUsername",s);const i=await fetch(`${l}/api/submit`,{method:"POST",body:t});if(i.ok)document.getElementById("formSuccess").innerText="Submitted successfully!",document.getElementById("formError").innerText="",document.getElementById("playerForm").reset();else{const c=await i.json();document.getElementById("formError").innerText=c.message||"Submission failed.",document.getElementById("formSuccess").innerText=""}}}d?m():u();
