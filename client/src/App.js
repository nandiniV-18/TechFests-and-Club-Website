import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreens';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
function App() {
  return (
    
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
        <Route path='/home' exact element={<HomeScreen />}/>
        <Route path='/book/:roomid/:fromdate/:todate' exact element={<Bookingscreen />}/>
        <Route path='/register' exact element={<Registerscreen/>}/>
        <Route path='/login' exact element={<Loginscreen/>}/>
        <Route path='/profile' exact element={<Profilescreen/>}/>
        <Route path='/admin' exact element={<Adminscreen/>}/>
        <Route path='/' exact element={<Landingscreen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
