
import { useEffect, useState } from 'react';
import checkedStatusProfile from '../../hook/checkedStatusProfile';
import logoutByApi from '../../api/logout';
import { useNavigate, useNavigation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';
import './header.scss';
import { CHAT_SVG, MAP_SVG, PROFILE_SVG, SLIDER_SVG, SPEED_SVG } from '../SVG/SVG';


const Header = observer(() => {
  const { sessionUser } = store
  const navigate = useNavigate();



  console.log(sessionUser)
  return (
    <header className='header'>

      <nav >
        <ul>
          <li>
            <a href="/cards">
              <SLIDER_SVG />
            </a>
          </li>
          <li>
            <a href="/map">
              <MAP_SVG />
            </a>
          </li>
          <li>
            <a href="/chat">
              <CHAT_SVG />
            </a>
          </li>
          <li>
            <a href="/profile">
              <PROFILE_SVG />
            </a>
          </li>
          <li>
            <a href="/active">
              <SPEED_SVG />
            </a>
          </li>
        </ul>

      </nav>
    </header>
  );
})
export default Header
