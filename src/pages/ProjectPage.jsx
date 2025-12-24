// pages/ProjectPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, List, Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// mock data สำหรับหัวข้อภายในโปรเจกต์
const mockProject = {
  id: 'proj-001',
  name: 'Onboarding Guide',
  description: 'รวมไฟล์คู่มือสำหรับพนักงานใหม่',
  topics: [
    {
      id: 'topic-001',
      title: 'วิธีตั้งค่า VPN',
      description: 'ขั้นตอนการติดตั้ง VPN สำหรับพนักงานใหม่',
    },
    {
      id: 'topic-002',
      title: 'การใช้งานระบบ HR',
      description: 'คู่มือการเข้าใช้งานระบบ HR',
    },
  ],
};

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ในอนาคตสามารถ fetch โปรเจกต์จริงจาก API ด้วย id ได้
  const project = mockProject; // mock สำหรับตอนนี้

  return (
    <div style={{ padding: '24px', maxWidth: 800, margin: 'auto' }}>
      <Card bordered>
        <Title level={3}>{project.name}</Title>
        <Paragraph>{project.description}</Paragraph>

        <List
          itemLayout="horizontal"
          dataSource={project.topics}
          header={<strong>หัวข้อในโปรเจกต์นี้</strong>}
          renderItem={(topic) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => navigate(`/topic/${topic.id}`)}
                >
                  ดูรายละเอียด
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<FileTextOutlined style={{ fontSize: 24 }} />}
                title={topic.title}
                description={topic.description}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default ProjectPage;