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
    return favorites.some((f) => item.id === f.id);
    // return favorites.includes(item);
  };

  const onFavoriteClick = (item) => {
    if (isFavorite(item)) {
      const favs = favorites.filter((favorite) => item.id !== favorite.id);
      setFavorites(favs);
    } else {
      const favs = [...favorites, item];
      const vendorIDs =
        itemToVendors.has(item.id) && itemToVendors.get(item.id).vendorIDs;
      if (vendorIDs && vendorIDs.length === 1) {
        const vendor = vendors.find((vendor) => vendor.id === vendorIDs[0]);
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

  // ---------- Lookups ----------
  const [itemToVendors, setItemToVendors] = useState([]);
  const [vendorToItems, setVendorToItems] = useState([]);

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
    setItemToVendors(new Map(db.itemToVendors.map((obj) => [obj.id, obj])));
    setVendorToItems(new Map(db.vendorToItems.map((obj) => [obj.id, obj])));
  }, []);

  // ---------- Foods ----------
  useEffect(() => {
    const filteredResults = foods.filter((food) =>
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
    const filteredResults = vendors.filter((vendor) =>
      vendor.name.toLowerCase().includes(vendorSearch.toLowerCase())
    );
    setVendorSearchResults(
      filteredResults.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name))
    );
  }, [vendors, vendorSearch]);

  // ---------- Item To Vendor Lookups ----------
  const getVendorName = (id) => {
    return vendors.find((vendor) => vendor.id === id).name;
  };
  const itemVendorNames = (id) => {
    return itemToVendors.get(id).vendorIDs.map((id) => getVendorName(id));
  };

  // ---------- Vendor To Item Lookups ----------
  const getItemVendorIDs = (id) => {
    return vendorToItems.has(id) ? vendorToItems.get(id).itemIDs : [];
  };
  const vendorFavorites = (id) => {
    return favorites.filter((favorite) =>
      getItemVendorIDs(id).includes(favorite.id)
    );
  };
  const vendorFavoriteItemNames = (id) => {
    return vendorFavorites(id).map((favorite) => favorite.name);
  };

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

        itemToVendors,
        vendorToItems,

        itemVendorNames,
        vendorFavoriteItemNames,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
