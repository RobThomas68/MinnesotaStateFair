import DrinkFeed from "./DrinkFeed";

import { useContext } from "react";
import DataContext from "./context/DataContext";

const Drinks = () => {
    const {
        drinkSearchResults,
        drinkSearch,
        setDrinkSearch,
        isOnlyAtFair,
        setIsOnlyAtFair,
        isNew,
        setIsNew,
    } = useContext(DataContext);

    const handleIsOnlyAtTheFairOnChange = () => {
        setIsOnlyAtFair(!isOnlyAtFair);
    };

    const handleIsNewOnChange = () => {
        setIsNew(!isNew);
    };

    return (
        <>
            <div className="searchBar">
                <form
                    className="searchForm"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <label htmlFor="search">Search Drinks</label>
                    <input
                        id="search"
                        type="search"
                        placeholder="Search Drinks"
                        value={drinkSearch}
                        onChange={(e) => setDrinkSearch(e.target.value)}
                    />
                </form>
                <input
                    id="fair"
                    type="checkbox"
                    checked={isOnlyAtFair}
                    onChange={handleIsOnlyAtTheFairOnChange}
                ></input>
                <label htmlFor="fair">Only At Fair</label>
                <input
                    id="new"
                    type="checkbox"
                    checked={isNew}
                    onChange={handleIsNewOnChange}
                ></input>
                <label htmlFor="new">New</label>
            </div>

            <main className="Drinks">
                {drinkSearchResults.length ? (
                    <DrinkFeed feedItems={drinkSearchResults} />
                ) : (
                    <p style={{ marginTop: "2rem" }}>No drinks to display.</p>
                )}
            </main>
        </>
    );
};

export default Drinks;