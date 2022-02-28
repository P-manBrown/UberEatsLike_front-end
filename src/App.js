import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Restaurants } from './containers/Restaurants';
import { Foods } from './containers/Foods';
import { Orders } from './containers/Orders';

function App() {
  return (
    <Router>
    {/* <Routes>で<Route>を囲む */}
    <Routes>
        {/* path="Url" element={コンポーネント} */}
       <Route path="restaurants" element={<Restaurants />} />
       <Route path="restaurants/:restaurantsId/foods" element={<Foods />} />
       <Route path="orders" element={<Orders />} />
    </Routes>
  </Router>
  );
}
export default App;

