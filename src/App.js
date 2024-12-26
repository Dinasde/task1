
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './Components/Login';
import Schedule from './Components/Schedule';

function App() {
  return (
    <div className="App">
    
     <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/schedule' element={<Schedule/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
