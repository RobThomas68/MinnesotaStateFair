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
            <Link to={`/drink/${feedItem.id}`}>
                <h3>{feedItem.name}</h3>
                <p style={{whiteSpace: 'pre-wrap', overflowWrap:'break-word'}}>{feedItem.vendorIDs.toString()}</p>
                {/* <p>{feedItem.vendorIDs.reduce((str,id) => `${str} ${getVendor(id)}`, '')}</p> */}
                <p>{itemVendors.join(",")}</p>
            </Link>
            {isFavorite(feedItem)  && <BsStarFill onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" />}
            {!isFavorite(feedItem) && <BsStar     onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" />}
        </article>
    );
};

export default FeedItem;
