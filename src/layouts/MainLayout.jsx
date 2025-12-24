import { Layout, Menu, Dropdown, Avatar, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  DashboardOutlined,
  InboxOutlined,
  SettingOutlined
} from '@ant-design/icons';
import logo from '../assets/project-p-logo.png'; // เพิ่มโลโก้

const { Header, Sider, Content, Footer } = Layout;

function MainLayout({ children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      logout();
      navigate('/login');
    } else if (key === 'profile') {
      navigate('/profile');
    }
  };

  const userMenu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        { key: 'profile', icon: <ProfileOutlined />, label: 'ข้อมูลของฉัน' },
        { key: 'logout', icon: <LogoutOutlined />, label: 'ออกจากระบบ' },
      ]}
    />
  );

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'แดชบอร์ด',
    },
    ...(user?.role === 'admin' || user?.role === 'editor'
      ? [
        {
          key: '/upload',
          icon: <InboxOutlined />,
          label: 'อัพโหลดหัวข้อ',
        },
      ]
      : []),
    ...(user?.role === 'admin'
      ? [
        {
          key: '/admin',
          icon: <SettingOutlined />,
          label: 'จัดการระบบ',
        },
        {
          key: '/projects',
          icon: <SettingOutlined />,
          label: 'จัดการโปรเจกต์',
        },
      ]
      : []),

  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 0',
          }}
        >
          <img
            src={logo}
            alt="Project-P Logo"
            style={{ height: 40, objectFit: 'contain' }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/dashboard']}
          onClick={(e) => navigate(e.key)}
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>{user?.username}</span>
            </Space>
          </Dropdown>
        </Header>

        <Content style={{ margin: '24px', background: '#fff', padding: 24 }}>
          {children}
        </Content>

        <Footer style={{ textAlign: 'center' }}>© 2025 Project-P</Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;