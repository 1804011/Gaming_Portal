import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import { Content } from 'antd/es/layout/layout';
import { theme } from 'antd';
import Login from './Components/Login';
import Register from './Components/Register';
import GameSelection from './Components/GameSelection';
function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              height: "570px",
              background: colorBgContainer,
            }}
          >
            <GameSelection />

          </Content>
        },
        {
          path: "/matches",
          element: <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              height: "570px",
              background: colorBgContainer,
            }}
          >
            Matches
          </Content>
        },
        {
          path: "/register",
          element:
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                height: "570px",
                background: colorBgContainer,
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div style={{ width: "450px" }}>
                <Register />

              </div>
            </Content>
        },
        {
          path: "/login",
          element: <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              height: "570px",
              background: colorBgContainer,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div style={{ width: "450px" }}>
              <Login />

            </div>
          </Content>
        },
        {
          path: "/chess",
          element:
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                height: "570px",
                background: colorBgContainer,
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div style={{ width: "450px" }}>
                <Link to="./friend">Play with friend</Link>
                <Link to="./computer">Play with computer</Link>
                <Outlet />

              </div>
            </Content>
        }, {
          path: "/chess/friend",
          element: "Playing with friend"
        }, {
          path: "/chess/computer",
          element: ""
        }

      ]
    },
  ]);
  return (
    <div>

      <RouterProvider router={router}></RouterProvider>

    </div >
  );
}

export default App;
