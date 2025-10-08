import { el } from '../utils.js';
import { db } from '../state.js';
import { Kpi } from '../components/kpi.js';
import { Table } from '../components/table.js';
import { pickBadgeSLA } from '../utils.js';

export function DashboardView(){
  const root = el('div', {class:'grid', style:'gap:16px'});
  const kpiWrap = el('div', {class:'grid kpis'});
  const pctATiempo = Math.round( (db.propuestas.filter(p=>p.enviadaEnPlazo).length / Math.max(1, db.propuestas.length)) * 100 ) + '%';
  kpiWrap.append(
    Kpi({ title:'% propuestas a tiempo (mes)', value: pctATiempo, trend:'↑'}),
    Kpi({ title:'Lead time cotizacion', value: (db.metrics?.leadTime || 2.4) + ' d', trend:'↓ 0.5 d'}),
    Kpi({ title:'Margen promedio', value: (db.metrics?.margen || 28.7) + '%', trend:'↑ 1.2%'}),
    Kpi({ title:'Flota fuera de servicio', value: db.flota.filter(f=>f.estado==='FueraServicio').length+''}),
    Kpi({ title:'Contratos activos', value: db.contratos.filter(c=>c.estado==='EnRuta' || c.estado==='EnTransito').length+''}),
    Kpi({ title:'Propuestas hoy', value: db.propuestas.filter(p=>p.fecha.substr(0,10)===new Date().toISOString().substr(0,10)).length+''})
  );
  root.append(el('div', {class:'card'}, el('div',{class:'header'}, 'KPIs'), el('div',{class:'body'}, kpiWrap)));

  const cols = [
    { key:'id', label:'ID' },
    { key:'cliente', label:'Cliente' },
    { key:'ruta', label:'Origen → Destino' },
    { key:'centro', label:'Centro' },
    { key:'estado', label:'Estado' },
    { key:'sla', label:'SLA', render:(v,r)=>{
        const [cls, txt] = pickBadgeSLA(r.slaHoras);
        return el('span', {class:cls}, txt);
    } },
  ];

  const rows = db.solicitudes.slice(0,8).map(s=> ({
    id: s.id, cliente: s.cliente, ruta: s.origen+' → '+s.destino, centro: s.centro,
    estado: s.estado, sla: '', slaHoras: s.slaHoras
  }));

  root.append(
    el('div',{class:'card'},
      el('div',{class:'header'}, 'Pipeline de cotizacion'),
      el('div',{class:'body'}, Table({ columns: cols, rows }))
    )
  );

  const log = (db.logs||[]).slice(-6).reverse().map(x=> el('div',{class:'small'}, '• '+x));
  root.append(el('div',{class:'card'}, el('div',{class:'header'}, 'Actividad reciente'), el('div',{class:'body'}, ...log)));

  return root;
}
