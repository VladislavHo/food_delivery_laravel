import React, { useEffect, useId, useState } from 'react'
import './card_services.scss'
import { getFoodsByApi } from '../../api/foods'
import { useNavigate } from 'react-router-dom'
import { FILTER_SVG } from '../SVG/SVG'
import Filter from './Filter/Filter'
import Spinner from '../Spiner/Spiner'
import Card from '../Card/Card'
import { checkedAuthByApi } from '../../api/profile'
export default function CardServices() {
  const navigate = useNavigate()
  const id = useId()
  const [foodsData, setFoodsData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filterState, setFilterState] = useState(false)
  const [valueFields, setValueFields] = useState({
    d: true,
    r: 200,
    all: false,
  })
  // const [isLodaing, setIsLodaing] = useState(true)
  useEffect(() => {
    getOrders()
    checkedAuth()
  }, [])

  async function checkedAuth() {
    setIsLoading(true)
    await checkedAuthByApi()
      .then((data) => {
        if (data.status !== 200) {
          setIsLoading(false)
          // return navigate('/login')
        }


        setIsLoading(false)
      });
  }
  console.log(foodsData, 'foodsData');


  async function getOrders() {


    try {
      setIsLoading(true)
      const orders = await getFoodsByApi({
        d: localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')!).d : valueFields.d,
        r: localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')!).r : valueFields.r,
        all: localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')!).all : valueFields.all && true,
      }).finally(() => (setIsLoading(false)))
      // const foods = orders.data[0].foods

      // if (orders.status !== 200) {

      // }

      console.log(orders.data, 'orders.data');

      setFoodsData(orders.data)



    } catch (error) {
      console.log(error)

      setFoodsData([])
    }

  }
  console.log(filterState);
  return (

    <>
      {isLoading ?

        <div className="spinner-container flex justify-center items-center h-screen">

          <Spinner />
        </div> : <>
          <div className="offer--field">
            {!!filterState &&
              <Filter
                foodsData={foodsData}
                valueFields={valueFields}
                setValueFields={setValueFields}
                setFilterState={setFilterState}
                getOrders={getOrders} />}

            {!isLoading && (() => {
              const filter = JSON.parse(localStorage.getItem('filter')!);
              const isAll = filter?.all || valueFields.all;
              const hasUserData = foodsData?.user;
              const hasLocation = Array.isArray(foodsData?.location) && foodsData.location.length > 0;
              console.log(isAll, hasUserData, hasLocation);

              if (isAll || !hasUserData || !hasLocation) {
                return <h2 className='all'>Все</h2>;
              }

              const radius = filter ? filter.r : valueFields.r;

              return <h2>Рядом с вами в пределах {radius} м</h2>;
            })()}
            <div className="filter-btn--wrapper">
              <input type="text" placeholder='Поиск (в разработке)' />
              <button className='filter-btn' onClick={() => setFilterState(true)}><span>Фильтр</span> <FILTER_SVG /></button>
            </div>

            <div className="bg-white pb-16">
              <div className="mx-auto lg:max-w-2xl  px-4 py-6 sm:px-6 sm:py-12 lg:px-8">

                <div className="">
                  {foodsData && foodsData.foods ? (
                    foodsData.foods.map((food: any, index: number) => (
                      <Card item={food} />
                    ))) : (
                    <li>Нет доступных продуктов</li>
                  )
                  }
                </div>
              </div>
            </div>

            {/* <span>{rangeValue}</span> */}

            {/* <ul style={!!foodsData.foods && foodsData.foods.length > 2 ? { justifyContent: 'space-between' } : { justifyContent: 'flex-start' }}>
        {isLoading ? <Spinner /> :

          foodsData.foods ? (
            foodsData.foods.map((food: any, index: number) => (
              <li key={index}>
                <a href={`/food?search=${food.id}`}>
                  <img src="./images/food.jpg" alt="" />
                  <div className="card-info--wrapper">
                    <span>{food.title}</span>
                    <div className="price">
                      <span>Заказать</span>
                    </div>
                  </div>
                </a>
              </li>
            ))
          ) : (
            <li>Нет доступных продуктов</li>
          )
        }
      </ul> */}
          </div></>}
    </>


  )
}
