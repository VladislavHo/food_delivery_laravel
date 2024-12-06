import React, { useEffect, useId, useState } from 'react'
import { createChatByApi, getChatsByApi } from '../../api/chat';
import { useNavigate } from 'react-router-dom';
import './chat.scss'
import { checkedAuthByApi } from '../../api/profile';
import Spinner from '../Spiner/Spiner';
import formatDateTime from '../../hook/formatDateTime';
export default function Chat() {
  const id = useId();
  const [chatData, setChatData] = useState([]);
  const [isLodaing, setIsLodaing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getChat()
    checkedAuth()
  }, [])

console.log(chatData, "chatData");


  async function getChat() {
    await getChatsByApi()
      .then((data) => {
        setChatData(data.data.data)
        console.log(data);
        
      })
  }
  useEffect(() => {

  }, [])

  async function checkedAuth() {
    setIsLodaing(true)
    await checkedAuthByApi()
      .then((data) => {
        if (data.status !== 200) {
          setIsLodaing(false)
          return navigate('/cards')
        }
        setIsLodaing(false)
      });
  }



  return (
    <>
      {isLodaing ?

        <div className="spinner-container flex justify-center items-center h-screen">

          <Spinner />
        </div> :
        <>
          <div className="chat flex gap-2 flex-col">
            <h2>Чаты</h2>


            {chatData && chatData.map((item: any, index: number) => {
              return (
                <a href={`/message/${item.id}`} >
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
                            {formatDateTime(item.updated_at)}
                          </p>
                        </div>
                        <p className="text-slate-500 font-medium">
                          {item.message || "Нет сообщений.."}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              )
            })}

          </div >
        </>
      }

    </>
  )
}
