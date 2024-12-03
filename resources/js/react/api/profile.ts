import { getCookie } from "../cookies";


export async function checkedAuthByApi(): Promise<any> {
  try {
    await fetch('/sanctum/csrf-cookie');
    const response = await fetch('/api/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },
    });

    if (!response.ok) {
      return { status: response.status, error: 'Auth error' };
    }


    const data = await response.json();


    return { status: 200, data };

  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' };
  }
}
export async function getProfileByApi(): Promise<any> {
  try {
    await fetch('/sanctum/csrf-cookie');
    const response = await fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },
    });

    if (!response.ok) {
      return { status: response.status, error: 'Неверный логин или пароль' };
    }


    const data = await response.json();

    console.log(data);
    
    localStorage.setItem('id', JSON.stringify({ id: data.profile.user.id }));


    return { status: 200, data };

  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' };
  }
}



