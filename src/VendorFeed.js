import VendorFeedItem from "./VendorFeedItem";

const VendorFeed = ({ feedItems }) => {
    return (
        <>
            {feedItems.map((feedItem) => (
                <VendorFeedItem key={feedItem.id} feedItem={feedItem} />
            ))}
        </>
    );
};

export default VendorFeed;
