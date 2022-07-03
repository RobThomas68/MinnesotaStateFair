
import { useContext } from "react";
import DataContext from "./context/DataContext";
import { BsStarFill, BsStar } from 'react-icons/bs'

const FoodFeedItem = ({ feedItem }) => {
    const { itemVendorNames, isFavorite, onFavoriteClick } = useContext(DataContext);

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
            <p>{itemVendorNames(feedItem.id).join(', ')}</p>
        </article>
    );
};

export default FoodFeedItem;