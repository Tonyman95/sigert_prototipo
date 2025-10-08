import { el } from '../utils.js';
import { db, persist, resetMock } from '../state.js';

export function ConfigView(){
  const f = el('div',{class:'card'},
    el('div',{class:'header'}, 'Configuracion'),
    el('div',{class:'body form'},
      el('div',{class:'row2'},
        el('div', null, el('label', null, 'Precio combustible (USD/L)'), el('input',{id:'p1', class:'input', type:'number', step:'0.01', value: db.settings.precioLitro})),
        el('div', null, el('label', null, 'Consumo (km/L)'), el('input',{id:'p2', class:'input', type:'number', step:'0.1', value: db.settings.consumoKmPorLitro})),
      ),
      el('div',{class:'row2'},
        el('div', null, el('label', null, 'Viatico por dia (USD)'), el('input',{id:'p3', class:'input', type:'number', step:'1', value: db.settings.viaticoDia})),
        el('div', null, el('label', null, 'Margen min'), el('input',{id:'p4', class:'input', type:'number', step:'0.01', value: db.settings.margenMin})),
      ),
      el('div',{class:'row2'},
        el('div', null, el('label', null, 'Margen max'), el('input',{id:'p5', class:'input', type:'number', step:'0.01', value: db.settings.margenMax})),
      ),
      el('div', {class:'footer-actions'},
        el('button',{class:'btn', onclick:()=> resetMock()}, 'Resetear datos'),
        el('button',{class:'btn primary', onclick:()=> save()}, 'Guardar')
      )
    )
  );
  function save(){
    db.settings.precioLitro = +document.getElementById('p1').value;
    db.settings.consumoKmPorLitro = +document.getElementById('p2').value;
    db.settings.viaticoDia = +document.getElementById('p3').value;
    db.settings.margenMin = +document.getElementById('p4').value;
    db.settings.margenMax = +document.getElementById('p5').value;
    persist();
    alert('Guardado');
  }
  return el('div',{class:'grid'}, f);
}
