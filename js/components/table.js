import { el } from '../utils.js';
export function Table({ columns, rows, actions }){
  const thead = el('thead', null, el('tr', null, ...columns.map(c=> el('th', null, c.label))));
  const tbody = el('tbody');
  for(const r of rows){
    const tr = el('tr');
    for(const c of columns){
      tr.append(el('td', null, c.render? c.render(r[c.key], r): (r[c.key] ?? '')));
    }
    if(actions && actions.length){
      const td = el('td');
      actions.forEach(a=> td.append(el('button', {class:'btn', onclick: ()=> a.onClick(r)}, a.label)));
      tr.append(td);
    }
    tbody.append(tr);
  }
  return el('table', {class:'table'}, thead, tbody);
}