import FavoriteFeed from "./FavoriteFeed";

import { useContext } from "react";
import DataContext from "./context/DataContext";

const Favorites = () => {
    const {
        favoriteSearchResults,
        favoriteSearch,
        setFavoriteSearch,
    } = useContext(DataContext);

    return (
        <>
            <div className="searchBar">
                <form
                    className="searchForm"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <label htmlFor="search">Search Vendors</label>
                    <input
                        id="search"
                        type="search"
                        placeholder="Search Favorites"
                        value={favoriteSearch}
                        onChange={(e) => setFavoriteSearch(e.target.value)}
                    />
                </form>
            </div>
            <main className="Favorites">
                {favoriteSearchResults.length ? (
                    <FavoriteFeed feedItems={favoriteSearchResults} />
                ) : (
                    <p style={{ marginTop: "2rem" }}>No favorites to display.</p>
                )}
            </main>
        </>
    );
};

export default Favorites;