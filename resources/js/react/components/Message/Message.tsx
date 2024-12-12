import React, { useEffect, useId, useState } from 'react'
import { getMessagesByApi, sendMessagesByApi } from '../../api/chat';
import { useNavigate, useParams } from 'react-router-dom';
//@ts-ignore
import { echo } from "../../../../js/echo";
import './message.scss'
import { getProfileByApi } from '../../api/profile';

export default function Message() {
  const navigate = useNavigate();
  const { id } = useParams();


  const [messageValue, setMessageValue] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [userId, setUserId] = useState('');
  const keyId = useId();

  useEffect(() => {
    getProfile();
  }, [])

  async function getProfile() {
    const user = await getProfileByApi()
    if (user.status === 200) {
      setUserId(user.data.profile.user.id)
    } else {
      navigate('/cards');
    }
  }

  useEffect(() => {
    getAllMessages({ id: id! })
    const channel = echo.private(`Chat.${id}`);
    channel.listen('MessageSent', (e: any) => {
      setMessages((prev) => prev.concat(e));

    })

    return () => {
      channel.unsubscribe();
    }
  }, [id])

  async function getAllMessages({ id }: { id: string }) {

    await getMessagesByApi({ chatId: id })
      .then((data) => {
        setMessages(data.data.data)


      })

  }



  async function buttonSubmitSendMessage({ id, message }: { id: string, message: string }) {

    await sendMessagesByApi({ chatId: id, message })
    setMessageValue("");
  }
  useEffect(() => {

    window.scrollTo(0, document.body.scrollHeight);

  }, [messages]);

  return (


    <div className="messages">
      <div className="header fixed w-full top-0 left-0 flex p-3 justify-between bg-indigo-600 z-10">
        <div className="card flex gap-3">
          <img
            src="/images/person.webp"
            alt="Shanay image"
            className="w-10 h-10"
          />
          <div className="info flex flex-col">
            <p className='text-white text-sm font-normal leading-snug'>{messages[0]?.sender.first_name}</p>
            <a href={`/user/${messages[0]?.sender_id}`}>
            <p className='text-white text-sm font-normal leading-snug'>Перейти в профиль</p>
            </a>
          </div>

        </div>
        <div className="btn-order--wrapepr flex items-center justify-center">

          <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Заказать</button>
        </div>

      </div>
      <div className=" relative h-full overflow-hidden ">
        <div className=" w-full h-full">
          <div className="grid pb-8">
            {messages && messages.map((message: any, index: number) => {
              const sender_id = message.sender_id || null;
              if (sender_id === userId) {
                return (
                  <div key={index + keyId + message.message} className="flex gap-2.5 justify-end pb-10">
                    <div>
                      <div className="grid mb-2">
                        <h5 className="text-right text-gray-900 text-sm font-semibold leading-snug pb-1">Вы</h5>
                        <div className="px-3 py-2 bg-indigo-600 rounded">
                          <h2 className=" max-w-64 text-white text-sm font-normal leading-snug">{message.message}</h2>
                        </div>
                        <div className="justify-start items-center inline-flex">
                          <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">{new Date(message.created_at).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</h3>
                        </div>
                      </div>
                    </div>
                    <img
                      src="/images/person.webp"
                      alt="Hailey image"
                      className="w-10 h-10"
                    />
                  </div>
                )
              } else {
                return (
                  <div className="grid pb-8">
                    <div className="flex gap-2.5 mb-4">
                      <img
                        src="/images/person.webp"
                        alt="Shanay image"
                        className="w-10 h-10"
                      />
                      <div className="grid">
                        <h5 className="text-gray-900 text-sm font-semibold leading-snug pb-1">{message.sender.first_name}</h5>
                        <div className="w-max grid">
                          <div className="text-left px-3.5 py-2 bg-gray-100 rounded justify-start items-center gap-3 inline-flex">
                            <h5 className="max-w-64 text-gray-900 text-sm font-normal leading-snug">{message.message}</h5>
                          </div>
                          <div className="justify-end items-center inline-flex mb-2.5">
                            <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">{new Date(message.created_at).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</h6>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>


          <form className='fixed pb-4 bottom-16 left-0 w-full bg-white' onSubmit={(e) => {
            e.preventDefault()
            buttonSubmitSendMessage({ id: id!, message: messageValue })
          }}>
            <div className="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between">

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <g id="User Circle">
                    <path
                      id="icon"
                      d="M6.05 17.6C6.05 15.3218 8.26619 13.475 11 13.475C13.7338 13.475 15.95 15.3218 15.95 17.6M13.475 8.525C13.475 9.89191 12.3669 11 11 11C9.6331 11 8.525 9.89191 8.525 8.525C8.525 7.1581 9.6331 6.05 11 6.05C12.3669 6.05 13.475 7.1581 13.475 8.525ZM19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11C2.75 6.44365 6.44365 2.75 11 2.75C15.5563 2.75 19.25 6.44365 19.25 11Z"
                      stroke="#4F46E5"
                      strokeWidth="1.6"
                    />
                  </g>
                </svg>
                <input
                  className="grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none"
                  value={messageValue} onChange={(e) => setMessageValue(e.target.value)}
                  placeholder="Введите сообщение"
                />
              </div>
              <div className="flex items-center gap-2">

                <button type='submit' className="items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <g id="Send 01">
                      <path id="icon" d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>
                  <h3 className="text-white text-xs font-semibold leading-4 px-2">Отправить</h3>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>




  )
}
