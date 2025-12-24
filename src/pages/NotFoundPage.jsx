import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '48px', textAlign: 'center' }}>
      <h1>404 - ไม่พบหน้านี้</h1>
      <p>ขออภัย หน้าที่คุณค้นหาไม่มีอยู่ในระบบ</p>
      <Button type="primary" onClick={() => navigate('/dashboard')}>
        กลับหน้าแรก
      </Button>
    </div>
  );
}

export default NotFoundPage;