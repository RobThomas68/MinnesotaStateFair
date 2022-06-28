import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import { BsStarFill, BsStar } from 'react-icons/bs'

const FeedItem = ({ feedItem }) => {
    const { vendors, isFavorite, onFavoriteClick } = useContext(DataContext);
    const getVendor = (id) => {
        return vendors.find((vendor) => vendor.id === id).name;
    };
    const itemVendors = feedItem.vendorIDs.map((id) => getVendor(id));

    return (
        <article className="post">
                <div className="postHeader">
                    <Link to={`/drink/${feedItem.id}`}>
                        <h3>{feedItem.name}</h3>
                    </Link>
                    <div className="push">
                        {isFavorite(feedItem)  && <BsStarFill onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" />}
                        {!isFavorite(feedItem) && <BsStar     onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" />}
                    </div>
                </div>

                {/* <p>{feedItem.vendorIDs.join(', ')}</p> */}
                <p>{itemVendors.join(', ')}</p>
        </article>
    );
};

export default FeedItem;
