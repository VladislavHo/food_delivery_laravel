
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { getFoodsWithLocationByApi } from '../../api/foods'
import { useEffect, useId, useState } from 'react'
import { CASTOM_MARKERS, START_LOCATION } from '../../config'
import { useNavigate } from 'react-router-dom'
import './map.scss'

export default function Map() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  const id = useId()
  useEffect(() => {
    getOrders()
  }, [])

  async function getOrders() {
    try {
      const orders = await getFoodsWithLocationByApi()

     

      setOrders(orders.data)


    } catch (error) {
      console.log(error)
    }

  }

  return (

    <div className="map--wrapper">
      <MapContainer id='map' center={START_LOCATION} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {orders && orders.map((order: any, index: number) => {


          const location = order?.locations[0];
          const latitude = location?.latitude;
          const longitude = location?.longitude;

          if (latitude !== undefined && longitude !== undefined) {
            return (
              <Marker icon={CASTOM_MARKERS[index >= CASTOM_MARKERS.length ? 0 : index]} key={order.user_id + id + index} position={[latitude, longitude]}>
                <Popup>
                  {order && order.foods.map((food: any, i: number) => (
                    <div key={id + i} className="food--marker" style={{ width: '200px' }}>
                      <a href={`/food?search=${food.food_id}`}>
                        <img src="/images/food.jpg" alt="" />
                        <div className="food-marker--info">
                          <p>{food.title}</p>
                          <p> Продовец:{order.user.first_name} {order.user.last_name}</p>
                          <p>
                            {location.street}, {location.house}, {location.city}
                          </p>

                        </div>

                      </a>
                    </div>
                  ))}
                </Popup>
              </Marker>
            );
          }

          return null;
        })}
      </MapContainer>

    </div>
  )
}
