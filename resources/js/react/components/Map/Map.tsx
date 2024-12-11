import React, { useEffect, useId, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { getFoodsWithLocationByApi } from '../../api/foods';
import { CASTOM_MARKERS } from '../../config';
import './map.scss';

interface Order {
  user_id: string;
  user: {
    first_name: string;
    last_name: string;
  };
  foods: Array<{
    food_id: string;
    title: string;
  }>;
  locations: Array<{
    latitude: number;
    longitude: number;
    street: string;
    house: string;
    city: string;
  }>;
}

interface Address {
  latitude: number;
  longitude: number;
}

export default function Map() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [address, setAddress] = useState<Address>({
    latitude: 52.5200,
    longitude: 13.4050
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const id = useId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getOrders();
        await getLocation();
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function getOrders() {
    try {
      const response = await getFoodsWithLocationByApi();
      setOrders(response.data);
    } catch (error) {
      console.log(error);
      setError("Не удалось получить заказы.");
    }
  }

  async function getLocation() {
    try {
      const response = await fetch('http://ipinfo.io/json');
      const data = await response.json();
      const [latitude, longitude] = data.loc.split(",");

      setAddress({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      });
    } catch (error) {
      console.log(error);
      setError("Не удалось получить местоположение.");
    }
  }

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="map--wrapper">
      <MapContainer id='map' center={[address.latitude, address.longitude]} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {orders.map((order, index) => {
          const location = order?.locations[0];
          const latitude = location?.latitude;
          const longitude = location?.longitude;

          if (latitude !== undefined && longitude !== undefined) {
            return (
              <Marker
                icon={CASTOM_MARKERS[index % CASTOM_MARKERS.length]}
                key={order.user_id + id + index}
                position={[latitude, longitude]}
              >
                <Popup>
                  {order.foods.map((food, i) => (
                    <div key={id + i} className="food--marker" style={{ width: '200px' }}>
                      <a href={`/food?search=${food.food_id}`}>
                        <img src="/images/food.jpg" alt="" />
                        <div className="food-marker--info">
                          <p>{food.title}</p>
                          <p>Продавец: {order.user.first_name} {order.user.last_name}</p>
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
  );
}