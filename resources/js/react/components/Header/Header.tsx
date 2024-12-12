
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import './header.scss';
import { CHAT_SVG, MAP_SVG, PROFILE_SVG, SLIDER_SVG, SPEED_SVG } from '../SVG/SVG';
import TelegramLoginButton from '../Buttons/TelegramLoginButton';


const Header = observer(() => {

  const [session, setSession] = useState(true)


  useEffect(() => {

    // setSession(!!id)
    setSession(!!localStorage.getItem('authToken'))

  }, [session])

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
          {session && (
            <li>
              <a href="/chat">
                <CHAT_SVG />
              </a>
            </li>
          )}
          {session ? (
            <li>
              <a href="/profile">
                <PROFILE_SVG />
              </a>
            </li>
          ) : (
            <TelegramLoginButton />
          )}

          {
            session && (
              <li>
                <a href="/active">
                  <SPEED_SVG />
                </a>
              </li>
            )
          }

        </ul>

      </nav>
    </header>
  );
})
export default Header
