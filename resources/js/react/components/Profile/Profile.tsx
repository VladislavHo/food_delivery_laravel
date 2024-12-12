import { useEffect, useState } from "react"
import { getProfileByApi } from "../../api/profile";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spiner/Spiner";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import Seller from "./Role/Seller";
import { CLOSE_SVG, SETTING_SVG } from "../SVG/SVG";

const Profile = observer(() => {
  const { sessionUserActions } = store
  // const [isSeller, setIsSeller] = useState(false);
  const [profileData, setProfileData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [closeInfo, setCloseInfo] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {

    getProfile();

  }, [])

  async function getProfile() {
    const user = await getProfileByApi().finally(() => setLoading(false));

    if (user.status === 200) {
      setProfileData(user.data);
      sessionUserActions(true)
    } else {
      sessionUserActions(false)
      navigate('/cards');

    }

  }
  return (
    <>


      {
        loading ? <>
          <div className="spinner-container flex justify-center items-center h-screen">

            <Spinner />
          </div>
        </> :
          <>
            {
              !profileData.profile.locations && (
                closeInfo && (
                  <div className="info bg-orange-400 rounded-2xl pl-3 pr-7 py-5">
                    <button className="close-wrapepr absolute top-2 right-4" onClick={() => setCloseInfo(false)}>
                      <CLOSE_SVG />
                    </button>
                    <p className='text-white text '>Что создать карточку заполните свой профиль в
                      <a className='underline' href="/profile/settings"> настройках</a>
                    </p>
                  </div>
                )
              )
            }
            <div className="header--profile flex justify-end absolute top-0 right-0 z-10 ">

              <button onClick={() => navigate('/profile/settings')}>
                <SETTING_SVG />
              </button>
            </div>
            <Seller profileData={profileData} />
          </>
      }
    </>

  )
})

export default Profile
