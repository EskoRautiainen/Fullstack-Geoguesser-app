// Imports
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Map from './components/Map'

function App() {

  return (
    <Router>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Map/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;