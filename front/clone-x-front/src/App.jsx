import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/@NiahUwu')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      {data ? (
        <div>Datos: {JSON.stringify(data)}</div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}

export default App;
