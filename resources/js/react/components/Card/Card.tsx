import { useNavigate } from 'react-router-dom'

export default function Card({ item, id }: any) {
  const navigate = useNavigate()
  return (
    <>
      <article key={id} className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-3" onClick={() => navigate(`/food?search=${item.id}`)}>
        <img
          src='/images/food.jpg'
          alt="University of Southern California"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>

        <h3 className="z-10 mt-3 mb-2 text-3xl font-bold text-white">{item.title}</h3>
        {
          !!item.delivery && (
            <p className="rounded-md max-w-24 text-center  px-3 py-0.4 z-10 gap-y-1 overflow-hidden text-sm leading-6 bg-green-500 text-white">Доставка</p>
          )
        }
      </article>
    </>
  )
}
