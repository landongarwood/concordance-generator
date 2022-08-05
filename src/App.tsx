import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import { ConcordanceGenerator } from './components/ConcordanceGenerator';

function App() {
  return (
    <div className="App">
      <Container className='mt-4'>
        <h1 className='text-center mb-4'>
          Concordance Generator
        </h1>
        <ConcordanceGenerator />
      </Container>
    </div>
  );
}

export default App;
