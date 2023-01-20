import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faGamepad, faHome, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter, createBrowserRouter, Link, Outlet, Route, RouterProvider, useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth'

const { Header, Sider, Content } = Layout;
const Navbar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const { pathname } = useLocation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate("");
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} >
                <div className="log" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: '1',
                            icon: <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>,
                            label:
                                <Link to="/">Home</Link>,


                        },
                        {
                            key: '2',
                            icon: <FontAwesomeIcon icon={faGamepad}></FontAwesomeIcon>,
                            label:
                                <Link to="/matches">Matches</Link>

                        },
                        {
                            key: '3',
                            icon: user ?
                                <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
                                :
                                <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>,
                            label: user ?
                                <button >Sign out</button>

                                :
                                <Link to="login">Sign In</Link>,
                            onClick: () => {
                                signOut(auth)

                            }

                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Outlet />

            </Layout>

        </Layout>
    );
};
export default Navbar;