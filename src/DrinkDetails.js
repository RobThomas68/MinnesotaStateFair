import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";

import { BsStarFill, BsStar } from 'react-icons/bs'

const DrinkDetails = () => {
    const { drinks, vendors, itemToVendors, isFavorite, onFavoriteClick } = useContext(DataContext);
    const { id } = useParams();
    const drink = drinks.find((drink) => drink.id === id);
    const itemVendors = itemToVendors.get(id).vendorIDs;
    return (
        <main className="PostPage">
            <article className="post">
                {drink && (
                    <>
                        <div className="postHeader">
                            <h2>{drink.name}</h2>
                            <div className="push">
                                {isFavorite(drink)  && <BsStarFill onClick={() => onFavoriteClick(drink)} role="button" tabIndex="0" />}
                                {!isFavorite(drink) && <BsStar     onClick={() => onFavoriteClick(drink)} role="button" tabIndex="0" />}
                            </div>
                        </div>
                        {/* <p>New:{drink.isNew.toString()}</p> */}
                        {/* <p>Only At Fair:{drink.isOnlyAtFair.toString()}</p> */}
                        <ul>
                            {itemVendors.map(function (id) {
                                const vendor = vendors.find((vendor) => vendor.id === id);

                                    return (
                                        <li key={id}>
                                            {vendor && <p>{vendor.name}</p>}
                                            {vendor && <p>{vendor.directions}</p>}
                                            {/* {vendor && <p>({vendor.latitude},{vendor.longitude})</p>} */}
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

export default DrinkDetails;
