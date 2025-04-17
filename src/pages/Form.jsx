import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { DataContext } from '../contexts/DataContext';
import replacePlaceholders from '../utils/replacePlaceholders';
import sendEmail from '../utils/sendEmail';

function FormPage() {
  const { user } = useContext(UserContext);
  const { templates, variables } = useContext(DataContext);
  const [inputs, setInputs] = useState({});
  const [template, setTemplate] = useState('');
  const [placeholders, setPlaceholders] = useState([]);
  const [offerPreview, setOfferPreview] = useState('');
  const navigate = useNavigate();

  const brand = localStorage.getItem('selectedBrand');
  const offerType = localStorage.getItem('selectedOfferType');

  useEffect(() => {
    const t = templates?.[brand]?.[offerType];
    if (!t) {
      alert('No template found.');
      navigate('/dashboard');
      return;
    }
    setTemplate(t);

    const matches = [...t.matchAll(/\{([^}]+)\}/g)].map(m => m[1]);
    const defaults = matches.reduce((obj, key) => {
      obj[key] = variables?.[brand]?.[key] || '';
      return obj;
    }, {});
    setPlaceholders(matches);
    setInputs(defaults);
  }, [templates, brand, offerType]);

  useEffect(() => {
    const filled = replacePlaceholders(template, inputs);
    setOfferPreview(filled);
  }, [inputs, template]);

  const handleChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const offerText = replacePlaceholders(template, inputs);
    const payload = {
      dealer_name: user.dealer_name,
      dealer_id: user.dealer_id,
      dealer_email: user.email,
      selectedBrand: brand,
      offerType,
      offerText,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch('http://localhost:3000/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      await sendEmail(payload);
      alert('Offer submitted!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to submit.');
    }
  };

  return (
    <div style={{ display: 'flex', gap: 20, padding: 20 }}>
      {/* Form */}
      <div style={{ flex: 1, background: 'white', padding: 20, borderRadius: 8 }}>
        <h2 style={{ color: 'var(--primary)' }}>{brand.toUpperCase()} - {offerType.toUpperCase()}</h2>
        {placeholders.map(key => (
          <div key={key} style={{ marginBottom: 12 }}>
            <label>{key}</label>
            <input
              value={inputs[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          style={{ marginTop: 20, background: 'var(--primary)', color: 'white', padding: 12, width: '100%' }}
        >
          Submit Offer
        </button>
      </div>

      {/* Preview */}
      <div style={{ flex: 1, background: '#f0ece5', padding: 20, borderRadius: 8 }}>
        <h3 style={{ marginBottom: 10 }}>Preview</h3>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>{offerPreview}</pre>
      </div>
    </div>
  );
}

export default FormPage;
