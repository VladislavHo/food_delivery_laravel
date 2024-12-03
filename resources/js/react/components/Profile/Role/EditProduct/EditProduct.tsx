import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { editFoodsByApi, getFoodByApi } from '../../../../api/foods';
import { useEffect, useState } from 'react';
import EditModal from '../../../Modal/Modal';

export default function ChangeProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState<any>();
  const [isSuccess, setIsSuccess] = useState({
    state: false,
    success: true,
    text: '',
  })
  const { register, handleSubmit, formState: { errors } } = useForm<any>(
    {
      defaultValues: {
        title: foodData?.title,
        description: foodData?.description,
        delivery: foodData?.delivery,
      },
    }
  )


  async function getProduct() {
    const data = await getFoodByApi({ food_id: id })

    if (data.status !== 200) {
      navigate('/profile')
    }
    setFoodData(data.data)

  }


  useEffect(() => {
    getProduct()
  }, [])

  const isSubmit = async (data: any) => {
    console.log(data)
    editProduct(data)
  }

  async function editProduct(data: any) {
    await editFoodsByApi({ id, ...data })
      .then((response) => {
        console.log(response);
        if (response.status !== 200) {
          setIsSuccess({
            state: true,
            success: false,
            text: 'Произошла ошибка при обнавлении продукта! Попробуйте позже'
          });
          return; // Early return to prevent setting success to true
        }
        setIsSuccess({
          success: true,
          state: true,
          text: 'Продукт успешно обнавлен!'
        });
      })
  }


  return (
    <>

      {isSuccess.state && isSuccess.success && (
        <>
          <EditModal text={isSuccess.text} />
        </>
      )}
      <form className="mb-24" onSubmit={handleSubmit(isSubmit)}>
        <div className="space-y-12 p-5">
          <div className="border-b border-gray-900/10">
            <h2 className="text-base/7 font-semibold text-gray-900">Меняем вашу карточку</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Эта информация будет доступна всем, поэтому будьте осторожны, делясь ей.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                  Название
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="title"
                      // name="title"
                      defaultValue={foodData?.title}
                      type="text"
                      {...register('title', {
                        required: 'Это поле обязательно для заполнения',
                        minLength: {
                          value: 3,
                          message: 'Минимум 3 символа'
                        },
                        maxLength: {
                          value: 15,
                          message: 'Максимум 15 символов'
                        }
                      })}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    />

                  </div>
                  {errors.title && (
                    <p className="text-red-600 text-sm">{errors.title.message?.toString()}</p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                  Описание
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"

                    // name="about"
                    rows={3}
                    {...register('description', {
                      required: 'Это поле обязательно для заполнения',
                      minLength: {
                        value: 6,
                        message: 'Минимум 6 символа'
                      },
                      maxLength: {
                        value: 45,
                        message: 'Максимум 45 символов'
                      }
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    defaultValue={foodData?.description}
                  />
                </div>

                <p className="mt-3 text-sm/6 text-gray-600">Напишите несколько предложений о вашей карточке</p>
                {errors.title && (
                  <p className="text-red-600 text-sm">{errors.title.message?.toString()}</p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="delivery" className="block text-sm/6 font-medium text-gray-900">
                  Доставка?
                </label>
                <div className="mt-2">
                  <select
                    id="delivery"
                    autoComplete="delivery-name"

                    {...register('delivery')}
                    defaultValue={'yes'}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                  >
                    <option value={1}>Да</option>
                    <option value={0}>Нет</option>

                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                  Добавьте фото (в разработке)
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {/* <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" /> */}
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm/6 font-semibold text-gray-900" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>

        </div>


      </form>
    </>

  )
}
