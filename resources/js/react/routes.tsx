import { createBrowserRouter } from 'react-router-dom';
import App from './components/App';
import Profile from './components/Profile/Profile';
import Map from './components/Map/Map';
import User from './components/User/User';
import Settings from './components/Profile/Role/Settings/Settings';
import CardServices from './components/CardServices/Cards';
import Food from './components/Food/Food';
import Chat from './components/Chat/Chat';
import Active from './components/Active/Active';

import Message from './components/Message/Message';
import CreateProduct from './components/Profile/Role/CreateProduct/CreateProduct';
import EditProduct from './components/Profile/Role/EditProduct/EditProduct';
import Test from './components/Test/Test';
import NotFound from './components/NotFound/NotFound';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound/>,

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
      },
      {
        path: '/test',
        element: <Test />
      }
    ],

  },


]);



export default router