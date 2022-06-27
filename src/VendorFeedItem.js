
const VendorFeedItem = ({ feedItem }) => {
    return (
        <article className="post">
            <h3>{feedItem.name}</h3>
            <p>{feedItem.id}</p>
            <p>{feedItem.directions}</p>
            <p>({feedItem.latitude},{feedItem.longitude})</p>

        </article>
    );
};

export default VendorFeedItem;
