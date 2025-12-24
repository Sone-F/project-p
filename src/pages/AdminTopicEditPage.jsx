// pages/AdminTopicEditPage.jsx
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Card,
  Typography,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Title } = Typography;
const { Dragger } = Upload;

function AdminTopicEditPage() {
  const { topicId } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // mock fetch topic data
    const fetchTopic = async () => {
      const mockTopic = {
        id: topicId,
        title: 'โครงสร้างไฟล์',
        description: 'อธิบายโฟลเดอร์และการจัดเก็บเอกสาร',
      };
      form.setFieldsValue(mockTopic);
      setLoading(false);
    };
    fetchTopic();
  }, [topicId, form]);

  const uploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => {
      const isAllowed = [
        'image/',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument',
        'text/plain',
      ].some((type) => file.type.startsWith(type));
      if (!isAllowed) {
        message.error(`${file.name} ไม่รองรับไฟล์ประเภทนี้`);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange(info) {
      console.log('ไฟล์ใหม่ที่เลือก:', info.fileList);
    },
  };

  const onFinish = (values) => {
    console.log('อัปเดตหัวข้อ:', values);
    message.success('บันทึกการแก้ไขหัวข้อเรียบร้อย (mock)');
  };

  return (
    <div style={{ padding: '24px', maxWidth: 600, margin: 'auto' }}>
      <Title level={3}>แก้ไขหัวข้อ</Title>
      <Card bordered loading={loading}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="ชื่อเรื่อง"
            name="title"
            rules={[{ required: true, message: 'กรุณากรอกชื่อเรื่อง' }]}
          >
            <Input placeholder="เช่น วิธีตั้งค่า VPN" />
          </Form.Item>

          <Form.Item
            label="คำอธิบาย"
            name="description"
            rules={[{ required: true, message: 'กรุณากรอกรายละเอียด' }]}
          >
            <Input.TextArea rows={3} placeholder="อธิบายเกี่ยวกับหัวข้อนี้" />
          </Form.Item>

          <Form.Item label="อัพโหลดไฟล์ใหม่">
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์</p>
              <p className="ant-upload-hint">รองรับ PDF, Word, PPT, รูปภาพ</p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              บันทึกการแก้ไข
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AdminTopicEditPage;