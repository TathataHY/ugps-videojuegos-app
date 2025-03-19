import React, { useState } from 'react';
import axios from 'axios';

const ApiTest: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const testApi = async () => {
    setLoading(true);
    try {
      const KEY = '328c7603ac77465895cf471fdbba8270';
      const response = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page=1&page_size=1`, {
        headers: {
          'User-Agent': 'UGPS-Videojuegos-App',
          'Content-Type': 'application/json'
        },
        timeout: 5000
      });
      
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResult(JSON.stringify({
          message: error.message,
          code: error.code,
          response: error.response ? {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data
          } : 'No response',
          request: error.request ? 'Request exists' : 'No request'
        }, null, 2));
      } else {
        setResult(`Error desconocido: ${String(error)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '10px 0', padding: '15px', backgroundColor: '#1e1e1e', borderRadius: '8px' }}>
      <button 
        onClick={() => setExpanded(!expanded)}
        style={{ padding: '8px 12px', marginRight: '10px', background: '#444', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        {expanded ? 'Ocultar' : 'Mostrar'} Test API
      </button>
      
      {expanded && (
        <div style={{ marginTop: '10px' }}>
          <button 
            onClick={testApi} 
            disabled={loading}
            style={{ padding: '8px 12px', background: '#2196f3', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            {loading ? 'Probando...' : 'Probar conexión a API'}
          </button>
          
          {result && (
            <pre style={{ 
              marginTop: '10px', 
              padding: '10px', 
              backgroundColor: '#2a2a2a', 
              color: '#eee',
              borderRadius: '4px',
              maxHeight: '300px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {result}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiTest; 