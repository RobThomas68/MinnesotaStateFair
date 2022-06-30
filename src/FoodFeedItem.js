
import { useContext } from "react";
import DataContext from "./context/DataContext";
import { BsStarFill, BsStar } from 'react-icons/bs'

const FoodFeedItem = ({ feedItem }) => {
    const { vendors, isFavorite, onFavoriteClick } = useContext(DataContext);
    const getVendor = (id) => {
        return vendors.find((vendor) => vendor.id === id).name;
    };

    return (
        <article className="post">
            <div className="postHeader">
                <h3>{feedItem.name}</h3>
                <div className="push">
                    {
                        isFavorite(feedItem) ?
                            <BsStarFill onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" /> :
                            <BsStar     onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" />
                    }
                </div>
            </div>
            <p>{getVendor(feedItem.vendorID)}</p>
        </article>
    );
};

export default FoodFeedItem;