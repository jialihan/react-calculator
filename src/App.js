import { useState } from 'react';
import { Calculator } from 'component/calculator/Calculator';
import './App.css';

function App() {
  const [result, setResult] = useState(0);
  const updateResulsHandler = (val) => {
    if (val === '') {
      setResult('0');
    } else setResult(val);
  };
  return (
    <div>
      <Calculator />
    </div>
  );
}

export default App;
