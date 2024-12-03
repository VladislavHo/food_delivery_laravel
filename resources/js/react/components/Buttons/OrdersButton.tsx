import './buttons.scss'

export default function OrdersButton({text}: {text: string}) {
  return (
    <button className='order-btn'>{text}</button>
  )
}
