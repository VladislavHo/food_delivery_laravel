import logoutByApi from "../../../../api/logout";
import GeoForm from "./GeoForm/GeoForm";
import { useNavigate } from "react-router-dom";
import "./settings.scss"
import { checkedAuthByApi } from "../../../../api/profile";
import { useEffect, useState } from "react";
import Spinner from "../../../Spiner/Spiner";
// import { sessionUserActions } from "../../store/sessionUser";

export default function Settings() {
  const navigate = useNavigate();
  const [isLodaing, setIsLodaing] = useState(true);
  const [locationData, setLocationData] = useState<any>();

  useEffect(() => {
    checkedAuth()
  }, [])

  async function checkedAuth() {
    setIsLodaing(true)
    await checkedAuthByApi()
      .then((data) => {
        if (data.status !== 200) {
          setIsLodaing(false)
          return navigate('/cards')
        }

        setLocationData(data.data.profile.locations)
        setIsLodaing(false)
      });
  }



  return (
    <>
      {isLodaing && <Spinner />}
      {
        !isLodaing && (
          <div className="settings">
            <h2>Настройки профиля</h2>
            <div className="settings-address">
              {!locationData[0] ? <h3>Настроить адрес</h3> : <h3>Поменять адрес</h3>}
              <GeoForm locationData={locationData} />
            </div>
            <div className="settings-fullname">
              <h3>Поменять Имя</h3>

            </div>
            <div className="btn--wrapper">
              <button onClick={() => {
                logoutByApi();
                localStorage.removeItem('authToken');
                localStorage.removeItem('id');
                localStorage.removeItem('filter');
                navigate('/cards')
                window.location.reload();
              }} type="button">Выход</button>
            </div>
              
          </div>
        )}

    </>
  )
}
