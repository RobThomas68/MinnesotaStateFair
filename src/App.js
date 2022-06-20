import Layout from './Layout';
import Home from './Home';
import Favorites from './Favorites';
import Food from './Food';
import Drinks from './Drinks';
import Vendors from './Vendors';
import Missing from './Missing';

import {Route, Routes} from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="food" element={<Food />} />
        <Route path="drinks" element={<Drinks />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
