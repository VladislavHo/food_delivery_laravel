
import { getCookie } from "../cookies";
import { ILogin, LoginResponse } from "../types/types";

export default async function checkLoginByApi({ email, password, remember }: ILogin): Promise<LoginResponse> {

  try {
    // Получение CSRF токена
    await fetch('/sanctum/csrf-cookie');


    // Запрос на вход
    const response = await fetch(`/login?email=${email}&password=${password}&remember=${remember}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },
    });

    // Проверка ответа
    if (!response.ok) {
      return { status: response.status, error: 'Неверный логин или пароль' };
    }




    // const data = await response.json();

    // console.log(data);
    // console.log(data);

    return { status: 200 };

  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' }; // Используем error.message для более информативного сообщения
  }
}