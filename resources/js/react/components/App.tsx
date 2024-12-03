
import Header from './Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'

import "leaflet/dist/leaflet.css";
import { checkedAuthByApi } from '../api/profile';
import { useEffect } from 'react';
export default function App() {
  const navigate = useNavigate()



  return (
    <>
      <Outlet />
      <Header />

    </>
  )
}
