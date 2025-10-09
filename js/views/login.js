import { el } from '../utils.js';
import { login, isAuthenticated } from '../auth.js';

export function LoginView(){
  // add login-mode class to app to hide topbar/sidebar via CSS
  const app = document.getElementById('app');
  if(app && !app.classList.contains('login-mode')) app.classList.add('login-mode');

  const wrap = el('div',{class:'grid'},
    el('div',{class:'card', style:'max-width:420px; margin:40px auto;'},
      el('div',{class:'header'}, 'Iniciar sesión'),
      el('div',{class:'body'},
        el('div', null, el('label', null, 'Usuario'), el('input',{class:'input', id:'login_user', value:'admin'})),
        el('div', null, el('label', null, 'Contraseña'), el('input',{class:'input', type:'password', id:'login_pass', value:'admin'})),
        el('div',{style:'margin-top:12px; display:flex; justify-content:flex-end'}, el('button',{class:'btn primary', onclick: ()=> {
          const u = document.getElementById('login_user').value;
          const p = document.getElementById('login_pass').value;
          if(login(u,p)){
            // remove login-mode and navigate to dashboard
            if(app) app.classList.remove('login-mode');
            location.hash = '#/dashboard';
            // show logout button if present
            try{ document.getElementById('logoutBtn').style.display='inline-block'; }catch(e){}
          }else{
            alert('Credenciales incorrectas');
          }
        }}, 'Ingresar'))
      )
    )
  );

  return wrap;
}
