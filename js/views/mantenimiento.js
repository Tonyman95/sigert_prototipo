import { el } from '../utils.js';
import { db, persist } from '../state.js';
import { Table } from '../components/table.js';

export function MantenimientoView(){
  const columns = [
    { key:'id', label:'OT' },
    { key:'patente', label:'Patente' },
    { key:'tipo', label:'Tipo' },
    { key:'estado', label:'Estado' },
    { key:'fecha', label:'Fecha' },
    { key:'km', label:'Km' },
    { key:'costo', label:'Costo', render:(v)=> v? '$ '+v.toFixed(2): '-' },
  ];
  const actions = [
    { label:'Iniciar', onClick:(r)=> { r.estado='EnEjecucion'; persist(); render(); } },
    { label:'Completar', onClick:(r)=> { r.estado='Completado'; r.costo=(r.costo||0)+120; persist(); render(); } },
  ];

  const wrap = el('div',{class:'grid'});
  if(!db.ots){ db.ots = []; }

  const card = el('div',{class:'card'},
    el('div',{class:'header'}, 'Mantenimiento'),
    el('div',{class:'body'})
  );

  function render(){
    const rows = db.ots.map(o=>o);
    const table = Table({ columns, rows, actions });
    card.querySelector('.body').innerHTML='';
    card.querySelector('.body').append(table);
  }

  wrap.append(card);
  render();
  return wrap;
}
