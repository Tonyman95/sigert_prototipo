export function el(tag, attrs={}, ...children){
  const node = document.createElement(tag);
  for(const [k,v] of Object.entries(attrs||{})){
    if(k==='class') node.className = v;
    else if(k.startsWith('on') && typeof v === 'function') node.addEventListener(k.substring(2), v);
    else if(k==='html') node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  for(const c of children){
    if(c==null) continue;
    if(Array.isArray(c)) node.append(...c);
    else if(typeof c === 'string') node.append(document.createTextNode(c));
    else node.append(c);
  }
  return node;
}
export function fmtMoney(n){ return new Intl.NumberFormat('es-CL',{ style:'currency', currency:'USD'}).format(n); }
export function uid(prefix='ID'){ return prefix + '-' + Math.random().toString(36).slice(2,8).toUpperCase(); }
export function daysBetween(a,b){ return Math.ceil((new Date(b)-new Date(a))/(1000*60*60*24)); }
export function pickBadgeSLA(hours){
  if(hours <= 24) return ['badge danger', hours+'h'];
  if(hours <= 48) return ['badge warn', hours+'h'];
  return ['badge ok', hours+'h'];
}