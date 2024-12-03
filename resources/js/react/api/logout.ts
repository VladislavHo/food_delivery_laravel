import { getCookie } from "../cookies";

export default async function logoutByApi() {

  try {
  const response =  await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },

    }
    )

    if (response.ok) {

      localStorage.removeItem('user');
    } else {
      console.log("Не удалось выйти");
    }


  } catch (error) {
    console.log(error);
  }
}