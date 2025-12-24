// pages/AdminTopicPage.jsx
import {
  Table,
  Typography,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
} from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function AdminTopicPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [topics, setTopics] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [editingTopic, setEditingTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // mock fetch
    const fetchTopics = async () => {
      const mockProject = {
        id: projectId,
        name: 'ระบบจัดการเอกสาร',
        topics: [
          { id: 't001', title: 'โครงสร้างไฟล์', createdAt: '2025-10-01' },
          { id: 't002', title: 'สิทธิ์การเข้าถึง', createdAt: '2025-10-05' },
        ],
      };
      setProjectName(mockProject.name);
      setTopics(mockProject.topics);
    };
    fetchTopics();
  }, [projectId]);

  const handleAdd = () => {
    setEditingTopic(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingTopic(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: `ยืนยันการลบหัวข้อ "${record.title}"`,
      onOk: () => {
        setTopics((prev) => prev.filter((t) => t.id !== record.id));
        message.success(`(mock) ลบหัวข้อ "${record.title}" แล้ว`);
      },
    });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingTopic) {
        const updated = { ...editingTopic, ...values };
        setTopics((prev) =>
          prev.map((t) => (t.id === editingTopic.id ? updated : t))
        );
        message.success(`(mock) อัปเดตหัวข้อ "${values.title}" แล้ว`);
      } else {
        const newTopic = {
          id: `t${Date.now()}`,
          ...values,
          createdAt: new Date().toISOString().slice(0, 10),
        };
        setTopics((prev) => [...prev, newTopic]);
        message.success(`(mock) เพิ่มหัวข้อ "${values.title}" แล้ว`);
      }
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: 'หัวข้อ',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'วันที่สร้าง',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'การจัดการ',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/topics/${record.id}/edit`)}
          >
            แก้ไข
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            ลบ
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>หัวข้อในโปรเจกต์: {projectName}</Title>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
        onClick={handleAdd}
      >
        เพิ่มหัวข้อ
      </Button>

      <Table
        dataSource={topics}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingTopic ? 'แก้ไขหัวข้อ' : 'เพิ่มหัวข้อ'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="ชื่อหัวข้อ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminTopicPage;