// pages/AdminUserPage.jsx
import {
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Avatar,
  Input,
  message,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import UserEditModal from '../components/UserEditModal';
import useAuth from '../hooks/useAuth';

const { Title } = Typography;
const { Search } = Input;

function AdminUserPage() {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Mock fetch from API
  useEffect(() => {
    const fetchUsers = async () => {
      // mock API call
      const data = [
        {
          id: 'u001',
          username: 'alice',
          role: 'admin',
          avatar: 'https://i.pravatar.cc/150?u=alice',
        },
        {
          id: 'u002',
          username: 'ben',
          role: 'editor',
          avatar: 'https://i.pravatar.cc/150?u=ben',
        },
        {
          id: 'u003',
          username: 'cara',
          role: 'viewer',
          avatar: 'https://i.pravatar.cc/150?u=cara',
        },
      ];
      setUsers(data);
      setFilteredUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = users.filter(
      (u) =>
        u.username.toLowerCase().includes(value.toLowerCase()) ||
        u.role.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (record) => {
    setEditingUser(record);
  };

  const handleDelete = (record) => {
    message.warning(`(mock) ลบผู้ใช้ ${record.username}`);
  };

  const handleSaveUser = (updatedData) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id ? { ...u, ...updatedData } : u
      )
    );
    setFilteredUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id ? { ...u, ...updatedData } : u
      )
    );
    message.success(`(mock) อัปเดตข้อมูลของ ${updatedData.username} แล้ว`);
    setEditingUser(null);
  };

  const handleExport = () => {
    message.info('(mock) กำลัง export รายชื่อผู้ใช้เป็น CSV...');
  };

  const columns = [
    {
      title: 'ผู้ใช้',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          {text}
        </Space>
      ),
    },
    {
      title: 'สิทธิ์',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const color = role === 'admin' ? 'red' : role === 'editor' ? 'blue' : 'gray';
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'การจัดการ',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={record.username === currentUser.username}
          >
            แก้ไข
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            disabled={record.username === currentUser.username}
          >
            ลบ
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>จัดการผู้ใช้</Title>

      <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
        <Search
          placeholder="ค้นหาชื่อผู้ใช้หรือ role"
          allowClear
          enterButton="ค้นหา"
          onSearch={handleSearch}
          style={{ maxWidth: 300 }}
        />
        <Button icon={<DownloadOutlined />} onClick={handleExport}>
          Export CSV
        </Button>
      </Space>

      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <UserEditModal
        open={!!editingUser}
        user={editingUser}
        onCancel={() => setEditingUser(null)}
        onSave={handleSaveUser}
        disableRoleEdit={editingUser?.username === currentUser.username}
      />
    </div>
  );
}

export default AdminUserPage;