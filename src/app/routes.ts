import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Completion from './pages/Completion';
import Collection from './pages/Collection';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/practice/:articleId',
    Component: Practice,
  },
  {
    path: '/completion/:articleId',
    Component: Completion,
  },
  {
    path: '/collection',
    Component: Collection,
  },
]);
