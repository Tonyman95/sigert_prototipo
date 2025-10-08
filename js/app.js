import { Router } from './router.js';
import { db, loadMock, persist } from './state.js';
import { DashboardView } from './views/dashboard.js';
import { SolicitudesView } from './views/solicitudes.js';
import { PropuestasView } from './views/propuestas.js';
import { ContratosView } from './views/contratos.js';
import { FlotaView } from './views/flota.js';
import { MantenimientoView } from './views/mantenimiento.js';
import { FacturacionView } from './views/facturacion.js';
import { ClientesView } from './views/clientes.js';
import { ConfigView } from './views/config.js';

loadMock();
if(!db.solicitudes.length){
  try{
    const res = await fetch('./data/seed.json');
    if(res.ok){
      const seed = await res.json();
      Object.assign(db, seed);
      persist();
    }else{
      console.warn('No se pudo cargar seed.json, response not ok', res.status);
    }
  }catch(e){
    console.warn('Fallo al cargar ./data/seed.json — si estás abriendo el archivo con file://, sirve el directorio con un servidor HTTP', e);
  }
}
const outlet = document.getElementById('view');
const routes = {
  '#/dashboard': async ()=> DashboardView(),
  '#/solicitudes': async ()=> SolicitudesView(),
  '#/propuestas': async ()=> PropuestasView(),
  '#/contratos': async ()=> ContratosView(),
  '#/flota': async ()=> FlotaView(),
  '#/mantenimiento': async ()=> MantenimientoView(),
  '#/facturacion': async ()=> FacturacionView(),
  '#/clientes': async ()=> ClientesView(),
  '#/config': async ()=> ConfigView(),
  '#/404': async ()=> { const d = document.createElement('div'); d.innerHTML='<div class="card"><div class="header">404</div><div class="body">Vista no encontrada</div></div>'; return d; }
};
new Router({ routes, outlet });
document.getElementById('globalSearch').addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase();
  const hits = [
    ...db.solicitudes.filter(s=> (s.id+s.cliente+s.origen+s.destino).toLowerCase().includes(q)).map(x=>({t:'Solicitud', id:x.id})),
    ...db.propuestas.filter(p=> (p.id+p.solicitudId).toLowerCase().includes(q)).map(x=>({t:'Propuesta', id:x.id})),
    ...db.contratos.filter(c=> (c.id+c.cliente).toLowerCase().includes(q)).map(x=>({t:'Contrato', id:x.id})),
  ];
  console.log('Resultados:', hits);
});