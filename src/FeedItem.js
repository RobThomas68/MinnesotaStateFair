import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const FeedItem = ({ feedItem }) => {
    const { vendors } = useContext(DataContext);
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
        </article>
    );
};

export default FeedItem;
