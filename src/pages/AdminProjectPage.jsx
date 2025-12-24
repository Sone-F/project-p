// pages/AdminProjectPage.jsx
import {
  Table,
  Button,
  Space,
  Typography,
  Tag,
  Input,
  Modal,
  Form,
  Select,
  message,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

function AdminProjectPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [ownerFilter, setOwnerFilter] = useState('all');

  const mockTopicCounts = {
    p001: 12,
    p002: 5,
  };


  // mock fetch
  useEffect(() => {
    const fetchProjects = async () => {
      const data = [
        {
          id: 'p001',
          name: 'ระบบจัดการเอกสาร',
          status: 'active',
          owner: 'alice',
        },
        {
          id: 'p002',
          name: 'เว็บไซต์ประชาสัมพันธ์',
          status: 'archived',
          owner: 'ben',
        },
      ];
      setProjects(data);
      setFilteredProjects(data);
    };
    fetchProjects();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.status.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleEdit = (record) => {
    setEditingProject(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: `ยืนยันการลบโปรเจกต์ "${record.name}"`,
      onOk: () => {
        setProjects((prev) => prev.filter((p) => p.id !== record.id));
        setFilteredProjects((prev) => prev.filter((p) => p.id !== record.id));
        message.success(`(mock) ลบโปรเจกต์ "${record.name}" แล้ว`);
      },
    });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingProject) {
        const updated = { ...editingProject, ...values };
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? updated : p))
        );
        setFilteredProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? updated : p))
        );
        message.success(`(mock) อัปเดตโปรเจกต์ "${values.name}" แล้ว`);
      } else {
        const newProject = {
          id: `p${Date.now()}`,
          ...values,
        };
        setProjects((prev) => [...prev, newProject]);
        setFilteredProjects((prev) => [...prev, newProject]);
        message.success(`(mock) เพิ่มโปรเจกต์ "${values.name}" แล้ว`);
      }
      setIsModalOpen(false);
      setEditingProject(null);
      form.resetFields();
    });
  };

  const handleExport = () => {
    message.info('(mock) กำลัง export รายการโปรเจกต์...');
  };

  const columns = [
    {
      title: 'ชื่อโปรเจกต์',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'active' ? 'green' : 'gray';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'ผู้รับผิดชอบ',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'จำนวนหัวข้อ',
      key: 'topicCount',
      render: (_, record) => mockTopicCounts[record.id] || 0,
    },
    {
      title: 'การจัดการ',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            แก้ไข
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            ลบ
          </Button>
          <Button
            type="link"
            onClick={() => navigate(`/projects/${record.id}/topics`)}
          >
            ดูหัวข้อ
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>จัดการโปรเจกต์</Title>

      <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
        <Search
          placeholder="ค้นหาชื่อโปรเจกต์หรือสถานะ"
          allowClear
          enterButton="ค้นหา"
          onSearch={handleSearch}
          style={{ maxWidth: 300 }}
        />
        <Select
          value={ownerFilter}
          onChange={(value) => {
            setOwnerFilter(value);
            const filtered = projects.filter((p) =>
              value === 'all' ? true : p.owner === value
            );
            setFilteredProjects(filtered);
          }}
          style={{ width: 200 }}
        >
          <Option value="all">ผู้รับผิดชอบทั้งหมด</Option>
          {[...new Set(projects.map((p) => p.owner))].map((owner) => (
            <Option key={owner} value={owner}>
              {owner}
            </Option>
          ))}
        </Select>

        <Space>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>
            Export CSV
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            เพิ่มโปรเจกต์
          </Button>
        </Space>
      </Space>

      <Table
        dataSource={filteredProjects}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingProject ? 'แก้ไขโปรเจกต์' : 'เพิ่มโปรเจกต์'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingProject(null);
          form.resetFields();
        }}
        onOk={handleSave}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="ชื่อโปรเจกต์" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="สถานะ" rules={[{ required: true }]}>
            <Select>
              <Option value="active">active</Option>
              <Option value="archived">archived</Option>
            </Select>
          </Form.Item>
          <Form.Item name="owner" label="ผู้รับผิดชอบ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProjectPage;