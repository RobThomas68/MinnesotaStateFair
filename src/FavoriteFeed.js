import FavoriteFeedItem from "./FavoriteFeedItem";

const FavoriteFeed = ({ feedItems }) => {
    return (
        <>
            {feedItems.map((feedItem) => (
                <FavoriteFeedItem key={feedItem.id} feedItem={feedItem} />
            ))}
        </>
    );
};

export default FavoriteFeed;
