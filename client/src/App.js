import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import { store } from './store/store'
import { Provider } from 'react-redux'
import Contact from './pages/contact';
import Layout from './components/layout/layout';
import Home from './pages/home';
function App() {
  const router = createBrowserRouter([
      {
          path: "/",
          element: <Layout/>,
          children: [
            {
              index:true,
              element: <Home/>,
            },
            {
              path: "login",
              element: <Login/>,
            },
            {
              path: "signup",
              element: <Signup/>,
            },
            {
              path: "contact",
              element: <Contact/>,
            },
          ],
      },
  ]);
  return (
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  );
}

export default App;
