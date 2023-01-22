import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { faUserFriends, faDesktop, faD } from '@fortawesome/free-solid-svg-icons';

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
import ForgotPassword from './Components/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import ChessOption from './Components/ChessOption';
import CreateGame from './Components/CreateGame';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
function App() {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <>
          <Navbar />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </>,
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
                height: "570px",
                background: colorBgContainer,
                display: "flex",
                justifyContent: "center",
                boxShadow: "15px 15px 15px rgba(0,0,0,0.05)"
              }}
            >

              <ChessOption icon1={faUserFriends}
                text2="Play with computer"
                icon2={faDesktop} text1="Play a friend"
                route1={"./friend"}
                route2={"./computer"}
              />
              <Outlet />


            </Content>,

        }, {
          path: "/chess/friend",
          element:
            <Content
              style={{
                margin: '24px 16px',
                height: "570px",
                background: colorBgContainer,
                display: "flex",
                justifyContent: "center",
                boxShadow: "15px 15px 15px rgba(0,0,0,0.05)"
              }}
            >

              <ChessOption
                text2="Join a game"
                route1={"./create"}
                route2={"./join-game"}
                text1="Create a game" />
              <Outlet />


            </Content>,
        }, {
          path: "/chess/computer",
          element: ""
        }, {
          path: "/forgot-password",
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
            <ForgotPassword />
          </Content>
        }, {
          path: "/chess/friend/create",
          element: <Content
            style={{
              margin: '24px 16px',
              height: "570px",
              background: colorBgContainer,
              display: "flex",
              justifyContent: "center",
              boxShadow: "15px 15px 15px rgba(0,0,0,0.05)"
            }}
          >
            <CreateGame gameType={"Chess"} name={user?.displayName} />
          </Content>,
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
