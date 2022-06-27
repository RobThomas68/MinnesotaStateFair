import Feed from "./Feed";

import { useContext } from "react";
import DataContext from "./context/DataContext";

const Drinks = () => {
    const {
        searchResults,
        search,
        setSearch,
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
        <main className="Drinks">
            <div>
                <form
                    className="searchForm"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <label htmlFor="search">Search Drinks</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search Drinks"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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

            {searchResults.length ? (
                <Feed feedItems={searchResults} />
            ) : (
                <p style={{ marginTop: "2rem" }}>No drinks to display.</p>
            )}
        </main>
    );
};

export default Drinks;