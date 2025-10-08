import { el } from '../utils.js';
import { db, persist } from '../state.js';
import { Table } from '../components/table.js';

export function FacturacionView(){
  const columns = [
    { key:'id', label:'Folio' },
    { key:'contratoId', label:'Contrato' },
    { key:'cliente', label:'Cliente' },
    { key:'monto', label:'Monto', render:(v)=> '$ '+v.toFixed(2) },
    { key:'estado', label:'Estado' },
    { key:'fecha', label:'Fecha' },
  ];
  const actions = [
    { label:'Emitir', onClick:(r)=> { r.estado='Emitida'; persist(); render(); } },
    { label:'Registrar pago', onClick:(r)=> { r.estado='Pagada'; persist(); render(); } },
  ];

  const wrap = el('div',{class:'grid'});
  const card = el('div',{class:'card'}, el('div',{class:'header'}, 'Facturacion'), el('div',{class:'body'}));

  function ensureData(){
    if(!db.facturas.length){
      db.facturas = db.contratos.slice(0,2).map(c=>({
        id: 'F-'+c.id.slice(-4),
        contratoId: c.id,
        cliente: c.cliente,
        monto: Math.round((Math.random()*2000+1000)*100)/100,
        estado: 'PendienteEmision',
        fecha: new Date().toISOString().substr(0,10)
      }));
      persist();
    }
  }

  function render(){
    ensureData();
    const table = Table({ columns, rows: db.facturas, actions });
    card.querySelector('.body').innerHTML='';
    card.querySelector('.body').append(table);
  }

  wrap.append(card);
  render();
  return wrap;
}
