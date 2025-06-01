import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';
import Home from './pages/Home';
import Login from './Auth/Login';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './Auth/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigation = useNavigate();
  const location = useLocation();

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Hide sider and header on login page
const hideLayout = location.pathname.startsWith('/') && 
                   (location.pathname === '/' || location.pathname.startsWith('/signup'));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!hideLayout && (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            onClick={({ key }) => navigation(key)}
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={[
              {
                key: '/home',
                icon: <UserOutlined />,
                label: 'Home',
              },
              {
                key: '/about',
                icon: <VideoCameraOutlined />,
                label: 'About',
              },
              {
                key: '/contact',
                icon: <UploadOutlined />,
                label: 'Contact',
              },
            ]}
          />
        </Sider>
      )}
      <Layout>
        {!hideLayout && (
          <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', background: colorBgContainer }}>
  <Button
    type="text"
    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    onClick={() => setCollapsed(!collapsed)}
    style={{ fontSize: '16px' }}
  />


  {isAuthenticated && (
    <Button
      type="primary"
      danger
      onClick={() => {
        localStorage.removeItem('isAuthenticated');
        navigation('/');
      }}
    >
      Logout
    </Button>
  )}


</Header>

        )}
        <Content
          style={{
            margin: hideLayout ? 0 : '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >


          <Routes>
            <Route path="/" element={<Login />} />
                 <Route
              path="/signup"
              element={
               <SignUp />
              }
            />

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route path='/about' element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            } />

            <Route path='/contact'
             element={
                <Contact />
            } />

            {/* Add other private or public routes here */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
