
import { useContext } from "react";
import DataContext from "./context/DataContext";
import { BsStarFill, BsStar } from 'react-icons/bs'

const VendorFeedItem = ({ feedItem }) => {
    const { isFavorite, onFavoriteClick } = useContext(DataContext);

    return (
        <article className="post">
            <div className="postHeader">
                <h3>{feedItem.name}</h3>
                <div className="push">
                    {isFavorite(feedItem)  && <BsStarFill onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" />}
                    {!isFavorite(feedItem) && <BsStar     onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" />}
                </div>
            </div>
            <p>{feedItem.id}</p>
            <p>{feedItem.directions}</p>
            <p>({feedItem.latitude},{feedItem.longitude})</p>
        </article>
    );
};

export default VendorFeedItem;