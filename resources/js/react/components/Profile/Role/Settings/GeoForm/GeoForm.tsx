import React, {  useId, useState } from 'react'
import { IAddress } from '../../../../../types/types';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import getGeoApi from '../../../../../api/geo';

import { createLocationByApi } from '../../../../../api/location';
import { useNavigate } from 'react-router-dom';

import SuccessForm from '../SuccessForm/Success';


const GeoForm = observer(({ locationData }: any) => {
  const id = useId();
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState({
    state: false,
    success: false
  });
  const { register, handleSubmit } = useForm<IAddress>({
    defaultValues: {
      country: locationData[0]?.country! || '',
      city: locationData[0]?.city! || '',
      street: locationData[0]?.street! || '',
      house: locationData[0]?.house! || '',
    },
  });
  const [geoData, setGeoData] = useState<any[]>();
  const [coordinates, setCoordinates] = useState<any>();
  const onSubmit = (data: IAddress) => {
    getGeoData({ ...data })
  };


  async function getGeoData({ ...data }: IAddress) {
    const geo = await getGeoApi({ ...data })

    console.log(geo.data);

    if (geo.status !== 200) {
      return navigate('/profile')
    }


    setGeoData(geo.data)
  }

  async function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = e.target.value;


    console.log(selectedValue, 'selectedValue');
    const [latitude, longitude, country, city, street, house] = selectedValue.split(',');


    await setCoordinates({ latitude: Number(latitude), longitude: Number(longitude), country, city, street, house });
  }


  async function handleSubmitGeo() {
    await createLocationByApi(coordinates)
      .then((response) => {
        console.log(response);
        setIsSuccess({
          state: true,
          success: true
        })
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
  }




  return (
    <>
      {/* {isSuccess.state && isSuccess.success && ( */}
      <SuccessForm
        state={isSuccess.state}
        success={isSuccess.success}
        setIsSuccess={setIsSuccess}
      />

      <div className="geo_form--wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="address_country">
            <input className='p-2 rounded' type="text" id="address_country" {...register("country")} placeholder="Ваша страна" />
          </label>
          <label htmlFor="address_city">
            <input className='p-2 rounded' type="text" id="address_city" {...register("city")} placeholder="Ваш город" />
          </label>
          <div className="street">
            <label htmlFor="address_street">
              <input className='p-2 rounded' type="text" id="address_street" {...register("street")} placeholder="Ваша улица" />
            </label>
            <label htmlFor="address_house">
              <input className='p-2 rounded' type="text" id="address_house" {...register("house")} placeholder="Ваш Дом" />
            </label>
          </div>
          <div className="btn-wrapper--settings-address">
            {
              !geoData && (
                <button className='checked' type='submit' >Проверить</button>
              )
            }
          </div>


        </form>
        {!!geoData && (
          <>
            <select name="" id="" onChange={handleSelectChange}>
              <option value="" >Выберите ваш адресс</option>
              {geoData?.map((item: any, i: number) => (
                <option key={item.id + id + i} value={[item.lat, item.lon, item.address.country, item.address.city_district, item.address.road, item.address.house_number]} >
                  {item.address.country},
                  {item.address.city_district},
                  {item.address.road},
                  {item.address.house_number}
                  {item.address.building && item.address.building}

                </option>
              ))}
            </select>
            <div className="btn-wrapper--settings-address-success">

              <button className='success' type='submit' onClick={() => handleSubmitGeo()}>Поддвердить</button>
            </div>
          </>

        )}

      </div>

    </>

  )
})

export default GeoForm
