import FeedItem from './FeedItem';

const Feed = ({ feedItems }) => {
    return (
        <>
            {feedItems.map(feedItem => (
                <FeedItem key={feedItem.id} feedItem={feedItem} />
            ))}
        </>
    )
}

export default Feed