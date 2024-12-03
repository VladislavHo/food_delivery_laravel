import React, { useEffect, useId } from 'react'
import { createChatByApi, getChatsByApi } from '../../api/chat';
import { useNavigate } from 'react-router-dom';
import './chat.scss'
export default function Chat() {
  const id = useId();
  const [chatData, setChatData] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getChat()
  }, [])


  async function getChat() {
    await getChatsByApi()
      .then((data) => {
        setChatData(data.data.data)

      })
  }




  return (
    <>
      <div className="chat">
        <h2>Чаты</h2>


        {chatData && chatData.map((item: any, index: number) => {
          return (
            <a href={`/message/${item.id}`}>
              < div key={index + id} className="flex items-center gap-6 p-1 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6" >
                <img
                  className="block h-14 rounded-full "
                  src="/images/person.webp"
                  alt="Женское лицо"
                />
                <div className="w-full text-start space-y-2 sm:text-left">
                  <div className="space-y-0.5">
                    <div className="title-chat  flex justify-between items-center" >
                      <p className="text-lg text-black font-semibold">
                        {item.friend}
                      </p>
                      <p className='text-sm text-slate-700 font-semibold'>
                        14:00 12.12.24
                      </p>
                    </div>
                    <p className="text-slate-500 font-medium">
                      Пока что тут пусто
                    </p>
                  </div>
                </div>
              </div>
            </a>
          )
        })}

      </div >
    </>
  )
}
