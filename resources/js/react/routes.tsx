import { createBrowserRouter } from 'react-router-dom';
import App from './components/App';
import Login from './components/FormData/Login/Login';
import Register from './components/FormData/Register/Register';
import Profile from './components/Profile/Profile';
import Map from './components/Map/Map';
import User from './components/User/User';
import Settings from './components/Profile/Role/Settings/Settings';
import CardServices from './components/CardServices/CardServices';
import Food from './components/Food/Food';
import Chat from './components/Chat/Chat';
import Active from './components/Active/Active';

import Message from './components/Message/Message';
import CreateProduct from './components/Profile/Role/CreateProduct/CreateProduct';
import EditProduct from './components/Profile/Role/EditProduct/EditProduct';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,

    children: [
      {
        path: '/map',
        element: <Map />
      },

      {
        path: '/profile',
        element: <Profile />,

      },
      {
        path: '/profile/settings',
        element: <Settings />
      },
      {
        path: '/user/:id',
        element: <User />,
      },
      {
        path: '/cards',
        element: <CardServices />,
      },
      {
        path: '/food',
        element: <Food />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/active',
        element: <Active />,
      },
      {
        path: '/message/:id',
        element: <Message />,
      },
      {
        path: '/chats',
        element: <Chat />,
      },
      {
        path: '/profile/create-product',
        element: <CreateProduct />
      },
      {
        path: '/profile/edit-product/:id',
        element: <EditProduct />
      }
    ],

  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />,
  },


]);



export default router