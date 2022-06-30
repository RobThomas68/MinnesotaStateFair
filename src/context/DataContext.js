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
            let id = undefined;
            if (
                item.hasOwnProperty("vendorIDs") &&
                item.vendorIDs.length === 1
            ) {
                id = item.vendorIDs[0];
            } else if (item.hasOwnProperty("vendorID")) {
                id = item.vendorID;
            }
            if (id) {
                const vendor = vendors.find((vendor) => vendor.id === id);
                if (vendor && !isFavorite(vendor)) {
                    favs.push(vendor);
                }
            }
            setFavorites(favs);
        }
    };

    // ---------- Foods ----------
    const [foodSearch, setFoodSearch] = useState("");
    const [foodSearchResults, setFoodSearchResults] = useState([]);
    const [foods, setFoods] = useState([]);

    // ---------- Drinks ----------
    const [drinkSearch, setDrinkSearch] = useState("");
    const [drinkSearchResults, setDrinkSearchResults] = useState([]);
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
        setFoods(db.foods);
        setDrinks(db.drinks);
        setVendors(db.vendors);
    }, []);

    // ---------- Foods ----------
    useEffect(() => {
        const filteredResults = foods.filter(
            (food) =>
                food.name.toLowerCase().includes(foodSearch.toLowerCase())
        );
        setFoodSearchResults(
            filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
        );
    }, [foods, foodSearch]);

    // ---------- Drinks ----------
    useEffect(() => {
        const filteredResults = drinks.filter(
            (drink) =>
                drink.name.toLowerCase().includes(drinkSearch.toLowerCase()) &&
                drink.isOnlyAtFair === isOnlyAtFair &&
                drink.isNew === isNew
        );
        setDrinkSearchResults(
            filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
        );
    }, [drinks, drinkSearch, isOnlyAtFair, isNew]);

    // ---------- Vendors ----------
    useEffect(() => {
        const filteredResults = vendors.filter(
            (vendor) =>
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

                foodSearch,
                setFoodSearch,
                foodSearchResults,
                foods,
                setFoods,

                drinkSearch,
                setDrinkSearch,
                drinkSearchResults,
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
