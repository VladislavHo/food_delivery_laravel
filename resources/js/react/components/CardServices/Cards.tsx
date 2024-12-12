import { useEffect, useId, useState } from 'react'
import './cards.scss'
import { getFoodsByApi, getFoodsFilterByApi } from '../../api/foods'

import { FILTER_SVG } from '../SVG/SVG'
import Filter from './Filter/Filter'
import Spinner from '../Spiner/Spiner'
import Card from '../Card/Card'
import { checkedAuthByApi } from '../../api/profile'
import { FILTER_DEFAULT_VALUE } from '../../config'
export default function Cards() {

  const id = useId()
  const [foodsData, setFoodsData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filterState, setFilterState] = useState(false)
  const [valueFields, setValueFields] = useState(FILTER_DEFAULT_VALUE)
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
        }
        setIsLoading(false)
      });
  }



  async function getOrders() {


    try {
      setIsLoading(true)
      await getFoodsFilterByApi({
        d: localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')!).d : valueFields.d,
        r: localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')!).r : valueFields.r,
        all: localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')!).all : valueFields.all && true,
      }).then((data) => {
        if (data.status !== 200) {
          getFoodsByApi().then((data) => {
            setFoodsData(data.data)
          })
        }
        setFoodsData(data.data)
      })
        .finally(() => (setIsLoading(false)))

    } catch (error) {
      console.log(error, 'ERROR');

      setFoodsData([])
    }
  }

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
                    foodsData.foods.map((food: any) => (
                      <Card item={food} key={id} />
                    ))) : (
                    <li>Нет доступных продуктов</li>
                  )
                  }
                </div>
              </div>
            </div>
          </div></>}
    </>


  )
}
