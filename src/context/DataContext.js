import { createContext, useState, useEffect } from "react";


import api from './api/drinks';
import useAxios from '../hooks/useAxios';


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    return (
        <DataContext.Provider value={{

        }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContext;
