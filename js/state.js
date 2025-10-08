export const db = {
  centers: ['Osorno','Santiago','Coquimbo'],
  solicitudes: [],
  propuestas: [],
  contratos: [],
  flota: [],
  conductores: [],
  facturas: [],
  proveedores: [],
  settings: { precioLitro: 1.2, consumoKmPorLitro: 3.0, viaticoDia: 35, margenMin: 0.25, margenMax: 0.35 }
};
export function loadMock(){
  try{
    const saved = localStorage.getItem('sigert_db');
    if(saved){ Object.assign(db, JSON.parse(saved)); }
  }catch(e){}
}
export function persist(){ localStorage.setItem('sigert_db', JSON.stringify(db)); }
export function resetMock(){ localStorage.removeItem('sigert_db'); location.reload(); }