import { getCookie } from "../cookies";

export default async function logoutByApi() {

  try {
  await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
      },

    }
    )




  } catch (error) {
    console.log(error);
  }
}