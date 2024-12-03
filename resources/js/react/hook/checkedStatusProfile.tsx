export default function checkedStatusProfile() {
  if (localStorage.getItem('user') === null) {
    
    return false
  } else {
    return true
  }
}