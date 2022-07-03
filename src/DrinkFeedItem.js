import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import { BsStarFill, BsStar } from 'react-icons/bs'

const DrinkFeedItem = ({ feedItem }) => {
    const { itemVendorNames, isFavorite, onFavoriteClick } = useContext(DataContext);

    return (
        <article className="post">
            <div className="postHeader">
                <Link to={`/drink/${feedItem.id}`}>
                    <h3>{feedItem.name}</h3>
                </Link>
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

export default DrinkFeedItem;
