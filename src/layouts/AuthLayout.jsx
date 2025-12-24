// layouts/AuthLayout.jsx
import { Layout } from 'antd';

const { Content } = Layout;

function AuthLayout({ children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ background: '#fff' }}>
        {children}
      </Content>
    </Layout>
  );
}

export default AuthLayout;