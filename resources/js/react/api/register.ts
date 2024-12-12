import { getCookie } from "../cookies";
import { IRegister, LoginResponse } from "../types/types";

export default async function registerByApi({name, email, password, password_confirmation}: IRegister): Promise<LoginResponse> {
  try {

    await fetch('/sanctum/csrf-cookie');

    const response = await fetch(`/register?name=${name}&email=${email}&password=${password}&password_confirmation=${password_confirmation}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },
    });

    if (!response.ok) {
      return { status: response.status, error: response.statusText };
    }
    window.location.reload();

    
    return { status: 200};

  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' };
  }
}