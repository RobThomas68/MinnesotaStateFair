import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [drinks, setDrinks] = useState([]);
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:35000/drinks');

    useEffect(() => {
        setDrinks(data);
      }, [data])

      return (
        <DataContext.Provider value={{
            drinks, setDrinks,
            data, fetchError, isLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
