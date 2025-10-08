import { el } from '../utils.js';
import { db, persist } from '../state.js';
import { Table } from '../components/table.js';

export function PropuestasView(){
  const wrap = el('div', {class:'grid'});

  const columns = [
    { key:'id', label:'ID' },
    { key:'solicitudId', label:'Solicitud' },
    { key:'cliente', label:'Cliente' },
    { key:'costo', label:'Costo' , render:(v)=> '$ '+v.toFixed(2)},
    { key:'precio', label:'Precio', render:(v)=> v? '$ '+v.toFixed(2): '-' },
    { key:'margen', label:'Margen', render:(v)=> v? (Math.round(v*100)+'%'): '-' },
    { key:'estado', label:'Estado' },
  ];

  const actions = [
    { label:'Calcular', onClick:(r)=> { r.costo = estimarCosto(r.solicitudId); r.estado='Calculada'; persist(); render(); } },
    { label:'Precio 30%', onClick:(r)=> { r.precio = r.costo*1.30; r.margen=0.30; r.estado='EnPrecio'; persist(); render(); } },
    { label:'Enviar', onClick:(r)=> { r.estado='Enviada'; r.enviadaEnPlazo = true; persist(); render(); } },
  ];

  function estimarCosto(sid){
    const s = db.solicitudes.find(x=>x.id===sid);
    if(!s) return 0;
    const km = s.km || 900;
    const litros = km / db.settings.consumoKmPorLitro;
    const combustible = litros * db.settings.precioLitro;
    const peajes = Math.max(1, Math.floor(km/200)) * 12;
    const dias = 1 + Math.floor(km/800);
    const viaticos = dias * db.settings.viaticoDia;
    return combustible + peajes + viaticos;
  }

  function ensureData(){
    if(!db.propuestas.length){
      db.propuestas = db.solicitudes.slice(0,6).map(s=>({
        id: 'P-'+s.id.slice(-4),
        solicitudId: s.id,
        cliente: s.cliente,
        costo: 0,
        precio: null,
        margen: null,
        estado: 'Pendiente',
        fecha: new Date().toISOString()
      }));
      persist();
    }
  }

  ensureData();
  const tableCard = el('div',{class:'card'},
    el('div',{class:'header'}, 'Propuestas'),
    el('div',{class:'body'})
  );

  function render(){
    const rows = db.propuestas.map(p=>p);
    const table = Table({ columns, rows, actions });
    tableCard.querySelector('.body').innerHTML='';
    tableCard.querySelector('.body').append(table);
  }

  wrap.append(tableCard);
  render();
  return wrap;
}
