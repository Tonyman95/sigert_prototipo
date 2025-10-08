import { el, uid } from '../utils.js';
import { db, persist } from '../state.js';
import { Table } from '../components/table.js';

export function SolicitudesView(){
  const wrap = el('div', {class:'grid'});
  const columns = [
    { key:'id', label:'ID' },
    { key:'cliente', label:'Cliente' },
    { key:'origen', label:'Origen' },
    { key:'destino', label:'Destino' },
    { key:'pesoKg', label:'Peso (kg)' },
    { key:'volM3', label:'Vol (m3)' },
    { key:'fechaRetiro', label:'Retiro' },
    { key:'fechaEntrega', label:'Entrega' },
    { key:'estado', label:'Estado' },
  ];
  const actions = [
    { label:'Validar', onClick:(r)=> { r.estado='Validada'; persist(); render(); } },
    { label:'Estimar', onClick:(r)=> { r.estado='EnEstimacion'; persist(); render(); } },
    { label:'Eliminar', onClick:(r)=> { db.solicitudes = db.solicitudes.filter(x=>x.id!==r.id); persist(); render(); } },
  ];

  function form(){
    const f = el('div', {class:'card'}, 
      el('div',{class:'header'}, 'Nueva solicitud'),
      el('div', {class:'body form'},
        el('div', null, el('label', null, 'Cliente'), el('input',{class:'input', id:'f_cliente'})),
        el('div', {class:'row2'},
          el('div', null, el('label', null, 'Origen'), el('input',{class:'input', id:'f_origen'})),
          el('div', null, el('label', null, 'Destino'), el('input',{class:'input', id:'f_destino'})),
        ),
        el('div', {class:'row2'},
          el('div', null, el('label', null, 'Peso (kg)'), el('input',{class:'input', type:'number', id:'f_peso'})),
          el('div', null, el('label', null, 'Vol (m3)'), el('input',{class:'input', type:'number', step:'0.1', id:'f_vol'})),
        ),
        el('div', {class:'row2'},
          el('div', null, el('label', null, 'Retiro'), el('input',{class:'date', type:'date', id:'f_retiro'})),
          el('div', null, el('label', null, 'Entrega'), el('input',{class:'date', type:'date', id:'f_entrega'})),
        ),
      ),
      el('div',{class:'footer-actions'},
        el('button',{class:'btn', onclick:()=> f.remove()}, 'Cancelar'),
        el('button',{class:'btn primary', onclick:()=> {
          const s = {
            id: uid('S'),
            cliente: document.getElementById('f_cliente').value || 'Cliente',
            origen: document.getElementById('f_origen').value || 'Origen',
            destino: document.getElementById('f_destino').value || 'Destino',
            pesoKg: +(document.getElementById('f_peso').value||0),
            volM3: +(document.getElementById('f_vol').value||0),
            fechaRetiro: document.getElementById('f_retiro').value || new Date().toISOString().substr(0,10),
            fechaEntrega: document.getElementById('f_entrega').value || new Date().toISOString().substr(0,10),
            centro: db.centers[Math.floor(Math.random()*db.centers.length)],
            estado: 'Recibida',
            slaHoras: 72
          };
          db.solicitudes.unshift(s); persist(); render();
          f.remove();
        }}, 'Guardar')
      )
    );
    return f;
  }

  const listCard = el('div',{class:'card'},
    el('div',{class:'header row'},
      el('div', null, 'Solicitudes'),
      el('div',{style:'margin-left:auto'}, el('button',{class:'btn primary', onclick:()=> wrap.prepend(form())}, 'Nueva solicitud'))
    ),
    el('div',{class:'body'})
  );

  function renderTable(){
    const rows = db.solicitudes.map(s=> s);
    const table = Table({ columns, rows, actions });
    listCard.querySelector('.body').innerHTML='';
    listCard.querySelector('.body').append(table);
  }

  function render(){ renderTable(); }

  wrap.append(listCard);
  render();
  return wrap;
}
