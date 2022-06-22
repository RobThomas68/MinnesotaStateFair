import Layout from './Layout';
import Home from './Home';
import Favorites from './Favorites';
import Food from './Food';
import Drinks from './Drinks';
import Vendors from './Vendors';
import Missing from './Missing';

import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import api from './api/drinks';
//import { DataProvider } from './context/DataContext';

function App() {

  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await api.get('/drinks');
        setDrinks(response.data);

      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchDrinks();

  }, [])

  return (
//    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="food" element={<Food />} />
          <Route path="drinks" element={<Drinks feedItems={drinks}/>} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
//    </DataProvider>
  );
}

export default App;
