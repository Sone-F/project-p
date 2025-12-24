import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const items = [
  { label: 'Dashboard', key: '/dashboard' },
];

function Navbar() {
  const navigate = useNavigate();
  return (
    <Menu mode="horizontal" theme="dark" onClick={(e) => navigate(e.key)} items={items} />
  );
}

export default Navbar;