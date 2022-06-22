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
import useAxiosFetch from './hooks/useAxiosFetch';

//import { DataProvider } from './context/DataContext';

function App() {

  const [drinks, setDrinks] = useState([]);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:35000/drinks');

  useEffect(() => {
    setDrinks(data);
  }, [data])

  return (
//    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="food" element={<Food />} />
          <Route path="drinks" element={<Drinks feedItems={drinks} fetchError={fetchError} isLoading={isLoading} />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
//    </DataProvider>
  );
}

export default App;
