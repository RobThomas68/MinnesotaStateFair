import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const DrinkPage = () => {
    const { drinks, vendors } = useContext(DataContext);
    const { id } = useParams();
    const drink = drinks.find((drink) => drink.id.toString() === id);

    return (
        <main className="PostPage">
            <article className="post">
                {drink && (
                    <>
                        <h2>{drink.name}</h2>
                        <p>New:{drink.isNew.toString()}</p>
                        <p>Only At Fair:{drink.isOnlyAtFair.toString()}</p>
                        <p>Vendors:{drink.vendorIDs.toString()}</p>

                        <ul>
                            {drink.vendorIDs.map(function (id) {
                                const vendor = vendors.find((vendor) => vendor.id === id);

                                    return (
                                        <li key={id}>
                                            {vendor && <p>{vendor.id}-{vendor.name}</p>}
                                            {vendor && <p>{vendor.directions}</p>}
                                            {vendor && <p>({vendor.latitude},{vendor.longitude})</p>}
                                        </li>
                                    );
                            })}
                        </ul>
                    </>
                )}
                {!drink && (
                    <>
                        <h2>Drink Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p><Link to="/">Visit Our Homepage</Link></p>
                    </>
                )}
            </article>
        </main>
    );
};

export default DrinkPage;
