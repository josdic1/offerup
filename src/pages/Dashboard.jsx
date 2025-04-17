import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function Dashboard() {
  const { user, logout } = useContext(UserContext);
  const [brand, setBrand] = useState(user?.brands?.[0] || '');
  const navigate = useNavigate();

  const handleSelect = (type) => {
    localStorage.setItem('selectedBrand', brand);
    localStorage.setItem('selectedOfferType', type);
    navigate('/form');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto', background: 'white', borderRadius: 8 }}>
      <h2 style={{ color: 'var(--primary)' }}>Welcome, {user?.dealer_name}</h2>

      <label>Choose Brand:</label>
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        style={{ padding: 10, width: '100%', marginBottom: 20 }}
      >
        {user?.brands.map(b => (
          <option key={b} value={b}>{b.charAt(0).toUpperCase() + b.slice(1)}</option>
        ))}
      </select>

      <button
        onClick={() => handleSelect('lease')}
        style={{ background: 'var(--primary)', color: 'white', padding: 12, width: '100%', marginBottom: 10 }}
      >
        Lease
      </button>

      <button
        onClick={() => handleSelect('buy')}
        style={{ background: 'var(--yellow)', color: '#222', padding: 12, width: '100%' }}
      >
        Buy
      </button>

      <button
        onClick={logout}
        style={{ marginTop: 30, background: 'var(--red)', color: 'white', padding: 10, width: '100%' }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
