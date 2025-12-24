// components/UserEditModal.jsx
import {
    Modal,
    Input,
    Select,
    Upload,
    Button,
    Avatar,
    Space,
    message,
} from 'antd';
import { InboxOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;

function UserEditModal({ open, user, onCancel, onSave, disableRoleEdit = false }) {
    const [formData, setFormData] = useState({
        username: user?.username || '',
        role: user?.role || '',
        avatar: user?.avatar || '',
    });

    // อัปเดตเมื่อ user เปลี่ยน
    useState(() => {
        if (user) {
            setFormData({
                username: user.username,
                role: user.role,
                avatar: user.avatar,
            });
        }
    }, [user]);

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.onload = () => callback(reader.result);
        reader.readAsDataURL(file);
    };

    const handleUpload = (info) => {
        const file = info.fileList?.[0]?.originFileObj;
        if (!file) {
            message.error('ไม่พบไฟล์ที่อัพโหลด');
            return;
        }

        const isImage = file.type?.startsWith('image/');
        if (!isImage) {
            message.error('กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setFormData((prev) => ({ ...prev, avatar: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const validateImageUrl = (url) => {
        try {
            new URL(url);
            return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
        } catch {
            return false;
        }
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        if (validateImageUrl(url)) {
            setFormData({ ...formData, avatar: url });
        } else {
            message.error('URL ไม่ถูกต้องหรือไม่ใช่ไฟล์รูปภาพ');
        }
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Modal
            title={`แก้ไขผู้ใช้: ${user?.username}`}
            open={open}
            onCancel={onCancel}
            onOk={handleSave}
            okText="บันทึก"
            cancelText="ยกเลิก"
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <Input
                    addonBefore="ชื่อผู้ใช้"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />

                <Select
                    value={formData.role}
                    onChange={(value) => setFormData({ ...formData, role: value })}
                    style={{ width: '100%' }}
                    disabled={disableRoleEdit}
                >
                    <Option value="admin">admin</Option>
                    <Option value="editor">editor</Option>
                    <Option value="viewer">viewer</Option>
                </Select>

                <Input
                    addonBefore="รูปโปรไฟล์ (URL)"
                    value={formData.avatar}
                    onChange={handleUrlChange}
                />

                <Upload
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleUpload}
                    accept="image/*"
                >
                    <Button icon={<InboxOutlined />}>อัพโหลดรูปภาพ</Button>
                </Upload>

                <Avatar src={formData.avatar} size={64} icon={<UserOutlined />} />
            </Space>
        </Modal>
    );
}

export default UserEditModal;