import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout/RootLayout';
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import NotFound from './pages/NotFound';
import PostPage from './pages/PostPage';
import { AnimatePresence } from 'framer-motion';

// async function loadData() {
//   const res = await fetch('/data/data.json');
//   const resData = await res.json();
//   return {
//     SOCIALS: resData.socials,
//     resumeUrl: resData.resumeUrl,
//     NAVBAR: resData.navbar,
//     CERTIFICATES: resData.certificates,
//   };
// }

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // loader: loadData,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/post/:postTitle',
        element: <PostPage />,
      },
    ],
  },
  {
    path: '*',
    element: <RootLayout />,
    // loader: loadData,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '*',
        element: <NotFound page="Page" />,
      },
    ],
  },
]);

function App() {
  // return <RouterProvider router={router} />;
  return <RouterProvider router={router} />;
}

export default App;
