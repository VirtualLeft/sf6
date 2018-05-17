// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return sessionStorage.getItem('sf6-authority') || 'guest';
}

export function setAuthority(authority) {
  return sessionStorage.setItem('sf6-authority', authority);
}
