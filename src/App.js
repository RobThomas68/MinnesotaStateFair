import Layout from './Layout';
import Home from './Home';
import Favorites from './Favorites';
import Food from './Food';
import Drinks from './Drinks';
import DrinkPage from './DrinkPage';
import Vendors from './Vendors';
import Missing from './Missing';

import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="food" element={<Food />} />
          <Route path="drinks" element={<Drinks />} />
          <Route path="drink/:id" element={<DrinkPage/>} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
