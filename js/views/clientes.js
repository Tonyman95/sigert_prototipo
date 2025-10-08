import { el } from '../utils.js';
import { db } from '../state.js';
import { Table } from '../components/table.js';

export function ClientesView(){
  const wrap = el('div',{class:'grid'});
  const mine = db.solicitudes.filter((_,i)=> i<5);
  const columns = [
    { key:'id', label:'ID' },
    { key:'origen', label:'Origen' },
    { key:'destino', label:'Destino' },
    { key:'estado', label:'Estado' },
  ];
  wrap.append(
    el('div',{class:'card'},
      el('div',{class:'header'}, 'Mis solicitudes (vista cliente simulada)'),
      el('div',{class:'body'}, Table({ columns, rows:mine }))
    )
  );
  return wrap;
}
