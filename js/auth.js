export function isAuthenticated(){
  try{ return localStorage.getItem('sigert_user') === 'admin'; }catch(e){return false;}
}
export function login(user, pass){
  if(user === 'admin' && pass === 'admin'){
    localStorage.setItem('sigert_user','admin');
    return true;
  }
  return false;
}
export function logout(){
  try{ localStorage.removeItem('sigert_user'); }catch(e){}
}
