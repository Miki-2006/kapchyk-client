import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './pages/Main';
import Userpage from './pages/Userpage';
import History from './pages/History';
import Transfer from './pages/Transfer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Main/>}/>
        <Route path='/' element={<Userpage/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/transfer' element={<Transfer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
