// pages/UploadPage.jsx
import { Form, Input, Button, Upload, message, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


const { Dragger } = Upload;

function UploadPage() {
  const [form] = Form.useForm();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const projectId = params.get('projectId');

  useEffect(() => {
    // mock fetch project name
    if (projectId) {
      console.log('กำลังอัพโหลดหัวข้อให้โปรเจกต์:', projectId);
    }
  }, [projectId]);

  const props = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => {
      const isAllowed = ['image/', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument', 'text/plain'].some(type =>
        file.type.startsWith(type)
      );
      if (!isAllowed) {
        message.error(`${file.name} ไม่รองรับไฟล์ประเภทนี้`);
        return Upload.LIST_IGNORE;
      }
      return false; // ป้องกันการอัพโหลดทันที
    },
    onChange(info) {
      const { fileList } = info;
      console.log('ไฟล์ที่เลือก:', fileList);
    },
  };

  const onFinish = (values) => {
    console.log('ข้อมูลหัวข้อ:', values);
    message.success('สร้างหัวข้อสำเร็จ (mock)');
    form.resetFields();
  };

  return (
    <div style={{ padding: '24px', maxWidth: 600, margin: 'auto' }}>
      <Card title="สร้างหัวข้อใหม่" bordered>
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

          <Form.Item label="อัพโหลดไฟล์">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์</p>
              <p className="ant-upload-hint">รองรับ PDF, Word, PPT, รูปภาพ</p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              สร้างหัวข้อ
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default UploadPage;