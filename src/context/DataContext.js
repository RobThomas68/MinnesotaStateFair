import { createContext, useState, useEffect } from "react";
import db from "../data/db.json";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // ---------- Favorites ----------
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );
    const [favoriteSearch, setFavoriteSearch] = useState("");
    const [favoriteSearchResults, setFavoriteSearchResults] = useState([]);

    const isFavorite = (item) => {
        return favorites.includes(item);
    };

    const onFavoriteClick = (item) => {
        if (isFavorite(item)) {
            const favs = favorites.filter(
                (favorite) => item.id !== favorite.id
            );
            setFavorites(favs);
        } else {
            const favs = [...favorites, item];
            if (
                item.hasOwnProperty("vendorIDs") &&
                item.vendorIDs.length === 1
            ) {
                const vendor = vendors.find(
                    (vendor) => vendor.id.toString() === item.vendorIDs[0]
                );
                if (vendor && !isFavorite(vendor)) {
                    favs.push(vendor);
                }
            }
            setFavorites(favs);
        }
    };

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
        localStorage.setItem("favorites", JSON.stringify(favorites));

        const filteredResults = favorites.filter((favorite) =>
            favorite.name.toLowerCase().includes(favoriteSearch.toLowerCase())
        );
        setFavoriteSearchResults(
            filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
        );
    }, [favorites, favoriteSearch]);

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
                favoriteSearch,
                setFavoriteSearch,
                favoriteSearchResults,
                favorites,
                isFavorite,
                onFavoriteClick,

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
