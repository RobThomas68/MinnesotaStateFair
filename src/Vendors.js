import VendorFeed from "./VendorFeed";

import { useContext } from "react";
import DataContext from "./context/DataContext";

const Vendors = () => {
    const {
        vendorSearchResults,
        vendorSearch,
        setVendorSearch,
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
                        type="text"
                        placeholder="Search Vendors"
                        value={vendorSearch}
                        onChange={(e) => setVendorSearch(e.target.value)}
                    />
                </form>
            </div>
            <main className="Vendors">
                {vendorSearchResults.length ? (
                    <VendorFeed feedItems={vendorSearchResults} />
                ) : (
                    <p style={{ marginTop: "2rem" }}>No vendors to display.</p>
                )}
            </main>
        </>
    );
};

export default Vendors;