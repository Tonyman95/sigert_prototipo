import { isAuthenticated } from './auth.js';

export class Router {
  constructor({ routes, outlet }){
    this.routes = routes;
    this.outlet = outlet;
    window.addEventListener('hashchange', ()=> this.resolve());
    this.resolve();
  }
  async resolve(){
    const hash = location.hash || '#/dashboard';
    const path = hash.split('?')[0];
    // If user not authenticated and not on login route, redirect to login
    if(!isAuthenticated() && path !== '#/login'){
      location.hash = '#/login';
      return;
    }
    const match = this.routes[path] || this.routes['#/404'];
    try{
      console.debug('Router resolving', path);
      const view = await match();
      if(!view || !(view instanceof Node)){
        throw new Error('La vista no devolvió un nodo DOM válido: ' + path);
      }
      this.outlet.innerHTML = '';
      // remove login-mode class from #app when not on login
      try{ const app = document.getElementById('app'); if(app && path !== '#/login') app.classList.remove('login-mode'); }catch(e){}
      this.outlet.appendChild(view);
      document.querySelectorAll('.sidebar a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href')===path);
      });
    }catch(e){
      console.error('Error al renderizar la ruta', path, e);
      this.outlet.innerHTML = '';
      const errCard = document.createElement('div');
      errCard.className = 'card';
      errCard.innerHTML = `<div class="header">Error</div><div class="body">Ocurrió un error al renderizar la vista. Revisa la consola para más detalles.<pre style="white-space:pre-wrap;color:#b91c1c">${(e && e.message)? e.message : String(e)}</pre></div>`;
      this.outlet.appendChild(errCard);
    }
  }
}