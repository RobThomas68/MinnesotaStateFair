import FoodFeedItem from "./FoodFeedItem";

const FoodFeed = ({ feedItems }) => {
    return (
        <>
            {feedItems.map((feedItem) => (
                <FoodFeedItem key={feedItem.id} feedItem={feedItem} />
            ))}
        </>
    );
};

export default FoodFeed;
