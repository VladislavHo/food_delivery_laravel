import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import searchQueryParams from '../../hook/searchQueryParams';
import { getFoodByApi, getFoodsFilterByApi } from '../../api/foods';
import Recomendation from '../Recomendation/Swiper';
import './food.scss'
import OrdersButton from '../Buttons/OrdersButton';
import { createChatByApi } from '../../api/chat';
import { checkedAuthByApi } from '../../api/profile';
import Spinner from '../Spiner/Spiner';


export default function Food() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = searchQueryParams({ params: 'search', location });
  const [foods, setFoods] = useState<any>([]);
  const [seller, setSeller] = useState<any>();
  const [isSeller, setIsSeller] = useState(true);
  const [isLodaing, setIsLodaing] = useState(true);
  // const [userId, setUserId] = useState<any>();
  useEffect(() => {
    getFood()

    // checkedAuth()
  }, [])

  async function checkedAuth({ sellerId }: any) {

    await checkedAuthByApi().then((data) => {
      setIsSeller(data.data.profile.user.id !== sellerId)
    }).then(() => setIsLodaing(false))

  }

  async function getFood() {
    setIsLodaing(true)
    await getFoodByApi({ food_id: id }).then((data) => {

      if (data.status !== 200) return
      setSeller(data.seller)
      setFoods(data.data)
      checkedAuth({ sellerId: data?.seller?.id })
    })
  }




  async function buttonSubmitCreateChat({ friendId }: { friendId: number }) {



    const response = await createChatByApi({ friendId });


    if (response.status === 200) {

      navigate(`/message/${response.data.chat_id}`)
    }

  }


  return (
    <>
      {isLodaing && <div className="spinner-container flex justify-center items-center h-screen">
        <Spinner />
      </div>}
      {!isLodaing && (
        <div className="food">
          <div className="food-wrapper">
            <img src="./images/food.jpg" alt="" />
            <div className="food--info">
              <h2>{foods.title}</h2>
              <p>{foods.description}</p>
              <p>{!!foods.delivery ? 'C доставкой' : 'Самовывоз'}</p>
              <a href={`/user/${seller?.id}`}>
                {seller?.first_name + ' ' + seller?.last_name}
              </a>

              <p>{seller?.locations?.city}</p>
              <div className="btn-wrapper">
                {isSeller && (
                  <button onClick={() => buttonSubmitCreateChat({ friendId: foods.user_id })}>Заказать</button>
                )}
                {/* <OrdersButton text="Заказать" /> */}
              </div>
            </div>
          </div>



          <div className="recomendation">
            <h3>Рядом с вами</h3>
            <div className="recomendation--wrapper">
              {
                <Recomendation />
              }
            </div>
          </div>
        </div>
      )}
    </>
  )
}
