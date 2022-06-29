import Layout from './Layout';
import Favorites from './Favorites';
import Foods from './Foods';
import Drinks from './Drinks';
import DrinkDetails from './DrinkDetails';
import Vendors from './Vendors';
import Map from './Map';
import Missing from './Missing';

import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Favorites />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="foods" element={<Foods />} />
          <Route path="drinks" element={<Drinks />} />
          <Route path="drink/:id" element={<DrinkDetails/>} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="map" element={<Map />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
