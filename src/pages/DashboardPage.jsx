// pages/DashboardPage.jsx
import { Card, Row, Col, Typography } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import useAuth from '../hooks/useAuth';

const { Title } = Typography;

const mockProjects = [
  {
    id: 'proj-001',
    name: 'Onboarding Guide',
    description: 'รวมไฟล์คู่มือสำหรับพนักงานใหม่',
  },
  {
    id: 'proj-002',
    name: 'DevOps Setup',
    description: 'ขั้นตอนการติดตั้ง CI/CD และเซิร์ฟเวอร์',
  },
  {
    id: 'proj-003',
    name: 'Accounting Tools',
    description: 'วิธีใช้งานระบบบัญชีภายใน',
  },
];

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>สวัสดีคุณ {user?.username}</Title>
      <p>โปรเจกต์ที่คุณสามารถเข้าถึงได้:</p>

      <Row gutter={[16, 16]}>
        {mockProjects.map((project) => (
          <Col xs={24} sm={12} md={8} key={project.id}>
            <Card
              title={project.name}
              bordered
              hoverable
              onClick={() => window.location.href = `/project/${project.id}`}
              style={{ cursor: 'pointer' }}
            >
              <FolderOpenOutlined style={{ fontSize: 24, marginBottom: 12 }} />
              <p>{project.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default DashboardPage;