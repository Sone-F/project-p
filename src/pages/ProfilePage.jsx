import { Card, Avatar, Descriptions, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5',
    }}>
      <Card
        title="ข้อมูลผู้ใช้"
        style={{ width: 400 }}
        actions={[
          <Button type="primary" block onClick={() => navigate('/dashboard')}>
            กลับแดชบอร์ด
          </Button>,
        ]}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <h3 style={{ marginTop: 12 }}>{user?.username}</h3>
        </div>

        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="ชื่อผู้ใช้">
            {user?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Token (mock)">
            {user?.token}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default ProfilePage;