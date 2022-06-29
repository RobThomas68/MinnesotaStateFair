import DrinkFeedItem from './DrinkFeedItem';

const DrinkFeed = ({ feedItems }) => {
    return (
        <>
            {feedItems.map(feedItem => (
                <DrinkFeedItem key={feedItem.id} feedItem={feedItem} />
            ))}
        </>
    )
}

export default DrinkFeed