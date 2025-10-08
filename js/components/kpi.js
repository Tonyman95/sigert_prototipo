import { el } from '../utils.js';
export function Kpi({ title, value, trend }){
  return el('div', {class:'card'}, 
    el('div',{class:'body'},
      el('div',{class:'row', style:'justify-content:space-between'},
        el('div',{style:'font-size:22px; font-weight:600'}, value),
        el('div',{class:'small'}, trend||'')
      ),
      el('div',{class:'small'}, title)
    )
  );
}