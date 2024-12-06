export default function checkedStatusProfile() {
  if (localStorage.getItem('id') === null) {
    
    return false
  } else {
    return true
  }
}