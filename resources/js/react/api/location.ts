
import { getCookie } from "../cookies"


interface ILocation {
  latitude: number,
  longitude: number,
  country: string,
  city: string,
  street: string,
  house: string
}
export async function createLocationByApi(
  {
    latitude,
    longitude,
    country,
    city,
    street,
    house
  }: ILocation
): Promise<any> {
  console.log(latitude,
    longitude,
    country,
    city,
    street,
    house);

  try {
    await fetch('/sanctum/csrf-cookie');
    const response = await fetch('/api/location/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        location: [latitude, longitude],
        country,
        city,
        street,
        house
      })
    })

    if (!response.ok) {
      return { status: response.status, error: 'Пользователь не найден' }
    }

    const data = await response.json()

    return { status: 200, data }
  } catch (error) {

  }
}