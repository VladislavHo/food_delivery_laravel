import { error } from "console";
import { getCookie } from "../cookies";


export async function checkedAuthByApi(): Promise<any> {
  try {

    const response = await fetch('/api/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),

      },
    });

    if (!response.ok) {
      return { status: response.status, error: response.statusText };
    }


    const data = await response.json();


    return { status: 200, data };

  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' };
  }
}
export async function getProfileByApi(): Promise<any> {
  try {

    const response = await fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
      },
    });

    if (!response.ok) {
      return { status: response.status, error: response.statusText };
    }


    const data = await response.json();

    return { status: 200, data };

  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' };
  }
}



