import React, { useState } from 'react'
import { CLOSE_SVG } from '../../SVG/SVG'
import './filter.scss'
export default function Filter(
  {
    foodsData,
    setFilterState,
    valueFields,
    setValueFields,
    getOrders
  }:
    {
      foodsData: any
      setFilterState: any,
      valueFields: any,
      setValueFields: any,
      getOrders: any
    }) {

  console.log(foodsData);

  return (
    <div className='filter-w'>
      <div className="filter--container">
        <button className='close' onClick={() => setFilterState(false)}><CLOSE_SVG /></button>
        <div className="city">
          <form action="">
            <label>
              <p>Выбрать город</p>
              <div className="input--field">
                <input type="text" placeholder='Санкт-Петербург' />
                <button>Выбрать</button>
                <span style={{ fontSize: '10px' }}>(В разработке)</span>
              </div>

            </label>
          </form>

        </div>

        {!!foodsData.user && !!foodsData.location.length && (
          <div className="delivery">
            <label>
              <p>С доставкой?</p>
              <input type="checkbox" checked={valueFields.d} onChange={(e) => {
                setValueFields({ ...valueFields, all: false, d: e.target.checked })
                localStorage.getItem('filter') && localStorage.removeItem('filter')
                localStorage.setItem('filter', JSON.stringify({ ...valueFields, all: false, d: e.target.checked }))
              }} />
            </label>

          </div>
        )}


        {!!foodsData.user && !!foodsData.location.length && (
          <div className="radius">
            <p>Рядом с вами</p>

            <input
              type="range"
              max={20000}
              min={100}
              step={100}
              value={localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')!).r : valueFields.r}
              onChange={(e) => {
                setValueFields({ ...valueFields, all: false, r: e.target.value })
                localStorage.getItem('filter') && localStorage.removeItem('filter')
                localStorage.setItem('filter', JSON.stringify({ ...valueFields, all: false, r: e.target.value }))
              }} />
            <div className="num--value">

              <input
                type="number"
                value={localStorage.getItem('filter') ? JSON.parse(localStorage.getItem('filter')!).r : valueFields.r}
                onChange={(e) => {
                  setValueFields({ ...valueFields, all: false, r: e.target.value })
                  localStorage.getItem('filter') && localStorage.removeItem('filter')
                  localStorage.setItem('filter', JSON.stringify({ ...valueFields, all: false, r: e.target.value }))
                }} />
              <span>м.</span>
            </div>
          </div>
        )}
        {!!foodsData.user && !!foodsData.location.length && (
          <div className="btn--wrapper">
            <button className='btn-reset' onClick={() => {
              setValueFields({ d: false, r: 200, all: true })
              localStorage.getItem('filter') && localStorage.removeItem('filter')
              localStorage.setItem('filter', JSON.stringify({ d: false, r: 200, all: true }))
              getOrders({ d: false, r: 200, all: true })
              setFilterState(false)
            }}>Получить все</button>
            <button className='btn-apply' onClick={() => {
              setFilterState(false)
              getOrders()
            }}>Применить</button>
          </div>
        )}

      </div>
    </div>
  )
}
