import { createContext, useState, useEffect } from "react";
import db from "../data/db.json";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // ---------- Drinks ----------
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [isOnlyAtFair, setIsOnlyAtFair] = useState(false);
    const [isNew, setIsNew] = useState(false);

    // ---------- Vendors ----------
    const [vendorSearch, setVendorSearch] = useState("");
    const [vendorSearchResults, setVendorSearchResults] = useState([]);
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        setDrinks(db.drinks);
        setVendors(db.vendors);
    }, []);

    // ---------- Drinks ----------
    useEffect(() => {
        const filteredResults = drinks.filter(
            (drink) =>
                drink.name.toLowerCase().includes(search.toLowerCase()) &&
                drink.isOnlyAtFair === isOnlyAtFair &&
                drink.isNew === isNew
        );
        setSearchResults(
            filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
        );
    }, [drinks, search, isOnlyAtFair, isNew]);

    // ---------- Vendors ----------
    useEffect(() => {
        const filteredResults = vendors.filter((vendor) =>
            vendor.name.toLowerCase().includes(vendorSearch.toLowerCase())
        );
        setVendorSearchResults(
            filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
        );
    }, [vendors, vendorSearch]);

    return (
        <DataContext.Provider
            value={{
                search,
                setSearch,
                searchResults,

                drinks,
                setDrinks,
                isOnlyAtFair,
                setIsOnlyAtFair,
                isNew,
                setIsNew,

                vendorSearch,
                setVendorSearch,
                vendorSearchResults,
                vendors,
                setVendors,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
