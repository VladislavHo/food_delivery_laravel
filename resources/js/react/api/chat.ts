import { getCookie } from "../cookies"

export async function getChatsByApi() {

  try {
    await fetch('/sanctum/csrf-cookie');

    const response = await fetch(`/api/chats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },

    }
    )
    if (!response.ok) {
      throw new Error('Failed to fetch chat');
    }

    const data = await response.json();



    return {
      data,
      error: null,
      message: 'Successfully fetched chat',
      status: response.status
    }
  } catch (error) {
    return {
      data: null,
      error: error as Error,
      message: 'Failed to fetch chat',
      status: 500
    }
  }
}



export async function createChatByApi({ friendId }: { friendId: number }) {
console.log(friendId);

  try {
    await fetch('/sanctum/csrf-cookie');

    const response = await fetch(`/api/chat/${friendId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },

    }
    )
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch chat');
    }

    const data = await response.json();

    console.log(data);


    return {
      data,
      error: null,
      message: 'Successfully fetched chat',
      status: response.status
    }
  } catch (error) {
    return {
      data: null,
      error: error as Error,
      message: 'Failed to fetch chat',
      status: 500
    }
  }
}

export async function sendMessagesByApi({ chatId, message }: { chatId: string, message: string }) {
  try {
    await fetch('/sanctum/csrf-cookie');

    const response = await fetch(`/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },
      body: JSON.stringify({ chatId, message })

    }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch chat');
    }

    const data = await response.json();

    console.log(data, 'message from api files');
    

    return {
      data,
      error: null,
      message: 'Successfully fetched chat',
      status: response.status
    }
  } catch (error) {
    return {
      data: null,
      error: error as Error,
      message: 'Failed to fetch chat',
      status: 500
    }
  }
}


export async function getMessagesByApi({ chatId }: { chatId: string }) {
  try {
    await fetch('/sanctum/csrf-cookie');

    const response = await fetch(`/api/messages/${chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')!,
      },

    }
    )
    if (!response.ok) {
      throw new Error('Failed to fetch chat');
    }

    const data = await response.json();

    console.log(data, 'in api files');


    return {
      data,
      error: null,
      message: 'Successfully fetched chat',
      status: response.status
    }
  } catch (error) {
    return {
      data: null,
      error: error as Error,
      message: 'Failed to fetch chat',
      status: 500
    }
  }
}