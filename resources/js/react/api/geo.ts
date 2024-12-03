import { IAddress } from "../types/types";

export default async function getGeoApi({country, city, street, house}: IAddress): Promise<any> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${country} ${city} ${street} ${house}&format=json&addressdetails=1`)

    if (!response.ok) {
      return { status: response.status, error: 'Не найдено' };
    }
    const data = await response.json();
    return { status: 200, data };
  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' };
  }
}