import { el } from '../utils.js';
import { db, persist } from '../state.js';
import { Table } from '../components/table.js';

export function FlotaView(){
  const columns = [
    { key:'patente', label:'Patente' },
    { key:'tipo', label:'Tipo' },
    { key:'capacidadKg', label:'Cap kg' },
    { key:'capacidadM3', label:'Cap m3' },
    { key:'centro', label:'Centro' },
    { key:'estado', label:'Estado' },
  ];
  const actions = [
    { label:'Mantener', onClick:(r)=> { r.estado='EnMantenimiento'; persist(); render(); } },
    { label:'Disponible', onClick:(r)=> { r.estado='Disponible'; persist(); render(); } },
  ];
  const wrap = el('div',{class:'grid'});
  const card = el('div',{class:'card'}, el('div',{class:'header'}, 'Flota'), el('div',{class:'body'}));

  function render(){
    const rows = db.flota.map(f=>f);
    const table = Table({ columns, rows, actions });
    card.querySelector('.body').innerHTML='';
    card.querySelector('.body').append(table);
  }

  wrap.append(card);
  render();
  return wrap;
}
