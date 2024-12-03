import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import searchQueryParams from '../../hook/searchQueryParams';
import { getFoodByApi, getFoodsByApi } from '../../api/foods';
import Recomendation from '../Recomendation/Swiper';
import './food.scss'
import OrdersButton from '../Buttons/OrdersButton';
import { createChatByApi } from '../../api/chat';


export default function Food() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = searchQueryParams({ params: 'search', location });
  const [foods, setFoods] = useState<any>([]);
  const [recomendation, setRecomendation] = useState<any>([]);
  const [seller, setSeller] = useState<any>();

  useEffect(() => {
    getFood()
    getRecomendation()

  }, [])



  async function getFood() {
    await getFoodByApi({ food_id: id }).then((data) => {

      if (data.status !== 200) return

      setSeller(data.seller)
      setFoods(data.data)


    })
  }

  async function getRecomendation() {
    try {
      const response = await getFoodsByApi({ d: seller?.locations?.city, r: seller?.locations?.region, all: true })
      if (response.status !== 200) return
      setRecomendation(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  async function buttonSubmitCreateChat({ friendId }: { friendId: number }) {
    console.log(foods);
    

    const response = await createChatByApi({ friendId });


    if (response.status === 200) {

      navigate(`/message/${response.data.chat_id}`)
    }

  }

  return (
    <>
      <div className="food">
        <div className="food-wrapper">
          <img src="./images/food.jpg" alt="" />
          <div className="food--info">
            <h2>{foods.title}</h2>
            <p>{foods.description}</p>
            <a href={`/user/${seller?.id}`}>
              {seller?.name!}
            </a>

            <p>{seller?.locations?.city}</p>
            <div className="btn-wrapper">
              <button onClick={() => buttonSubmitCreateChat({ friendId: foods.user_id })}>Заказать</button>
              {/* <OrdersButton text="Заказать" /> */}
            </div>
          </div>
        </div>



        {/* <div className="recomendation">
          <h3>Рядом с вами</h3>
          <div className="recomendation--wrapper">
            {
              <Recomendation recomendation={recomendation} />
            }
          </div>
        </div> */}
      </div>
    </>
  )
}
