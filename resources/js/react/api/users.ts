import { getCookie } from "../cookies";

export async function getUserByApi({ id }: { id: string }): Promise<any> {
  await fetch('/sanctum/csrf-cookie');

  try {
    const response = await fetch(`/api/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
      },
    })

    if (!response.ok) {
      return { status: response.status, error: 'Пользователь не найден' }
    }

    const data = await response.json()

    return { status: 200, data }
  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' }
  }

}
export async function getUsersByApi(): Promise<any> {

  try {
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
      },
    });

    if (!response.ok) {
      return { status: response.status, error: 'Пользователи не найдены' };
    }

    const data = await response.json();

    return { status: 200, data };
  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' };
  }
}

