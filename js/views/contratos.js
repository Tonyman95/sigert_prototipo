import { el } from '../utils.js';
import { db, persist } from '../state.js';
import { Table } from '../components/table.js';

export function ContratosView(){
  const columns = [
    { key:'id', label:'ID' },
    { key:'cliente', label:'Cliente' },
    { key:'solicitudId', label:'Solicitud' },
    { key:'estado', label:'Estado' },
    { key:'inicio', label:'Inicio' },
    { key:'fin', label:'Fin' }
  ];

  const actions = [
    { label:'Planificar', onClick:(r)=> { r.estado='Planificado'; persist(); render(); } },
    { label:'Iniciar', onClick:(r)=> { r.estado='EnRuta'; persist(); render(); } },
    { label:'Cerrar', onClick:(r)=> { r.estado='Cerrado'; persist(); render(); } },
  ];

  function ensureData(){
    if(!db.contratos.length){
      db.contratos = db.propuestas.filter(p=>p.estado==='Enviada').slice(0,3).map(p=>({
        id: 'C-'+p.id.slice(-4),
        cliente: p.cliente,
        solicitudId: p.solicitudId,
        estado: 'Confirmado',
        inicio: new Date().toISOString().substr(0,10),
        fin: ''
      }));
      persist();
    }
  }

  ensureData();

  const wrap = el('div',{class:'grid'});
  const tableCard = el('div',{class:'card'},
    el('div',{class:'header'}, 'Contratos'),
    el('div',{class:'body'})
  );

  function render(){
    const rows = db.contratos.map(c=>c);
    const table = Table({ columns, rows, actions });
    tableCard.querySelector('.body').innerHTML='';
    tableCard.querySelector('.body').append(table);
  }

  wrap.append(tableCard);
  render();
  return wrap;
}
