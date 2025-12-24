import { Form, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo.png';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mockUsers = {
    alice: {
      username: 'alice',
      role: 'admin',
      token: 'token-admin-123',
    },
    ben: {
      username: 'ben',
      role: 'editor',
      token: 'token-editor-456',
    },
    cara: {
      username: 'cara',
      role: 'viewer',
      token: 'token-viewer-789',
    },
  };

  const onFinish = (values) => {
    const userData = mockUsers[values.username];
    if (userData && values.password === '1234') {
      login(userData); // เรียกจาก useAuth()
      navigate('/dashboard');
    } else {
      message.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };


  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5',
      overflow: 'hidden',
    }}>
      <Card
        style={{
          width: 350,
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        bodyStyle={{ padding: '24px 32px' }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: 100, marginBottom: 24 }}
        />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'กรุณากรอกชื่อผู้ใช้' },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: 'กรุณากรอกเป็นภาษาอังกฤษเท่านั้น (a-z, A-Z, 0-9, _)',
              },
            ]}
          >
            <Input placeholder="ชื่อผู้ใช้ (อังกฤษเท่านั้น)" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'กรุณากรอกรหัสผ่าน' },
              {
                pattern: /^[a-zA-Z0-9!@#$%^&*()_+=-]+$/,
                message: 'รหัสผ่านต้องเป็นภาษาอังกฤษและสัญลักษณ์เท่านั้น',
              },
            ]}
          >
            <Input.Password placeholder="รหัสผ่าน (อังกฤษเท่านั้น)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;