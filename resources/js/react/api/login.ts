
import { getCookie } from "../cookies";
import { ILogin, LoginResponse } from "../types/types";

export default async function checkLoginByApi({ email, password, remember }: ILogin): Promise<LoginResponse> {

  try {

    await fetch('/sanctum/csrf-cookie');
    const response = await fetch(`/login?email=${email}&password=${password}&remember=${remember}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },
    });


    if (!response.ok) {
      return { status: response.status, error: 'Неверный логин или пароль' };
    }

    window.location.reload();



    return { status: 200 };

  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' }; // Используем error.message для более информативного сообщения
  }
}