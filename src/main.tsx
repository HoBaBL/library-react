import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import BooksPages from './components/pages/bookspages.tsx';
import Books from './components/books/books.tsx';
import ContentComponents from './components/users/users.tsx';
import User from './components/user/user.tsx';

const router = createHashRouter([
  {
    path: "/",
    element: <BooksPages/>,
    children: [
      {
        path: '/book',
        element: <Books/>
      },
      {
        path: '/users',
        element: <ContentComponents/>,
      },
      {
        path:'/users/:id',
        element: <User/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
