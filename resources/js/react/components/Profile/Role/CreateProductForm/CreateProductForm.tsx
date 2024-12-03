import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createOrderByApi } from '../../../../api/foods'
import { CLOSE_SVG } from '../../../SVG/SVG'
import './create_product_form.scss'
export default function CreateProduct({ setIsOpenCreateProductForm }: any) {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState({
    state: false,
    success: true,
    text: '',
  })
  const { register, handleSubmit } = useForm<any>(
    {
      defaultValues: {
        title: '',
        description: '',
        delivery: false,
        price: '',
      },
    }
  )

  const onSubmit = (data: any) => {

    createProduct(data)
    // setIsOpenCreateProductForm(false)
  }


  async function createProduct(data: any) {
    setIsLoading(true)
    await createOrderByApi(data)
      .then((response) => {
        console.log(response);
        setIsLoading(false);

        if (response.status !== 200) {
          setIsSuccess({
            state: true,
            success: false,
            text: 'Произошла ошибка при добавлении продукта! Попробуйте позже'
          });
          return; // Early return to prevent setting success to true
        }

        setIsSuccess({
          state: true,
          success: true,
          text: 'Продукт добавлен!'
        });
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        setIsLoading(false);
        setIsSuccess({
          state: true,
          success: false,
          text: 'Произошла ошибка при добавлении продукта!'
        });
      });
    // .catch((error) => {
    //   setIsLoading(false)
    //   setIsSuccess({
    //     success: false,
    //     text: `Продукт не добавлен! ${error}`
    //   })
    // })
  }


  return (

    <div className='create-product-form'>

      {

        <div className="create-product-form--wrapper py-5 px-2 rounded-md">
          <button className='close-wrapepr absolute top-1 right-9' onClick={() => setIsOpenCreateProductForm(false)}>
            <CLOSE_SVG />
          </button>
          {!isSuccess.success || !!isSuccess.text ? (
            <div className='create-product-form--success'>
              <p>{isSuccess.text}</p>
            </div>
          ) :
            (
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">
                  <span>Название:</span>
                  <span>(Должно быть кратким и понятным)</span>
                  <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' type="text" {...register('title')} />
                </label>
                <label htmlFor="description">
                  <span>Описание:</span>
                  <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' type="text" {...register('description')} />
                </label>

                <label htmlFor="delivery">
                  <span>С доставкой?</span>
                  <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' {...register('delivery')}>
                    <option value='1'>Да</option>
                    <option value='0'>Нет</option>
                  </select>
                </label>

                <button type='submit' className='text-white flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                  <span>Save</span>
                </button>
              </form>
            )
          }

        </div>

      }


    </div>
  )
}
