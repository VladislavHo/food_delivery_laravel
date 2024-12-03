import { getCookie } from "../cookies"



export async function getFoodByApi({ food_id }: any): Promise<any> {
  await fetch('/sanctum/csrf-cookie');
  try {
    const response = await fetch(`/api/food/${food_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },
    })

    if (!response.ok) {
      return { status: response.status, error: 'Списоков товаров не найдено' }
    }

    const data = await response.json()


    return { status: 200, data: data.data, seller: data.seller }
  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' }
  }
}


export async function getFoodsByApi({ d, r, all }: any): Promise<any> {
  await fetch('/sanctum/csrf-cookie');
  try {
    const response = await fetch(`/api/foods?d=${d}&r=${r}&all=${all}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },
    })


    console.log(response);

    if (!response.ok) {
      return { status: response.status, error: 'Списоков товаров не найдено' }
    }

    const data = await response.json()


    return { status: 200, data: data.data }
  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' }
  }
}

export async function getFoodsWithLocationByApi(): Promise<any> {
  await fetch('/sanctum/csrf-cookie');
  try {
    const response = await fetch('/api/foods/location', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },
    })


    if (!response.ok) {
      return { status: response.status, error: 'Списоков товаров не найдено' }
    }

    const data = await response.json()


    return { status: 200, data: data.data }
  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' }
  }
}



export async function createOrderByApi({ title, description, delivery, address }: any): Promise<any> {

  await fetch('/sanctum/csrf-cookie');
  try {
    const response = await fetch('/api/order/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },
      body: JSON.stringify({
        title,
        description,
        delivery,
        address,
      })
    })

    console.log(response);

    if (!response.ok) {
      return { status: response.status, error: 'Пользователь не найден' }
    }

    const data = await response.json()


    return { status: 200, data }
  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' }
  }

}

export async function deleteFoodsByApi({id}: any): Promise<any> {

  await fetch('/sanctum/csrf-cookie');

  
  try {
    const response = await fetch(`/api/foods/delete?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },

    })

    console.log(response);

    if (!response.ok) {
      return { status: response.status, error: 'Пользователь не найден' }
    }

    const data = await response.json()


    return { status: 200, data }
  } catch (error) {
    return { status: 500, error: (error as Error).message ?? 'Неизвестная ошибка' }
  }

}

export async function editFoodsByApi({id, title, description, delivery}: any): Promise<any> {

  await fetch('/sanctum/csrf-cookie');

  console.log({id, title, description, delivery});
  
  
  try {
    const response = await fetch(`/api/foods/edit?id=${id}&title=${title}&description=${description}&delivery=${delivery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
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