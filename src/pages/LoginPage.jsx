import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function LoginPage() {
  const [code, setCode] = useState('');
  const [users, setUsers] = useState([]);
  const { login } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(setUsers)
      .catch(err => alert('Error loading users.'));
  }, []);

  const handleLogin = () => {
    const user = users.find(u => u.code === code.trim());
    if (user) {
      login(user);
    } else {
      alert('Invalid Code');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', padding: 20, background: 'white', borderRadius: 8 }}>
      <h2 style={{ color: 'var(--primary)' }}>Dealer Login</h2>
      <input
        placeholder="Enter Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: 12,
          background: 'var(--primary)',
          color: 'white',
          border: 'none',
          borderRadius: 4
        }}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;
