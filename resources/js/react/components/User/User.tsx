import { useEffect, useId, useState } from "react"
import { getUserByApi } from "../../api/users";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spiner/Spiner";
import Card from "../Card/Card";


export default function User() {
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const key = useId();
  useEffect(() => {
    getUser()

  }, [])

  async function getUser() {
    try {
      if (id) {

        const userData = await getUserByApi({ id })

        setUserData(userData.data);


        if (userData.status !== 200) {

        }
        setLoading(false)
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      {
        loading ? <Spinner /> :
          <>
            <div className="max-w-full pb-16  bg-white shadow-xl rounded-lg text-gray-900">
              <div className=" h-32 overflow-hidden">
                <img
                  className="object-cover object-top w-full"
                  src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
                  alt='Mountain'
                />
              </div>
              <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img
                  className="object-cover object-center h-32"
                  src='/images/person.webp'
                  alt=''
                />
              </div>
              <div className="text-center mt-2">
                <h2 className="font-semibold">{userData.user?.first_name} {userData.user?.last_name}</h2>
              </div>


              <div className="cards">
                {
                  userData.foods?.map((item: any) => (
                    <Card item={item} id={key}/>
                  ))
                }
              </div>
            </div>

          </>
      }

    </>
  )
}
