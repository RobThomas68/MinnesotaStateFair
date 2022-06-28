
import { useContext } from "react";
import DataContext from "./context/DataContext";
import { BsStarFill, BsStar } from 'react-icons/bs'

const FavoriteFeedItem = ({ feedItem }) => {
    const { isFavorite, onFavoriteClick } = useContext(DataContext);

    return (
        <article className="post">
            <h3>{feedItem.name}</h3>
            {feedItem.hasOwnProperty('directions') && <p>{feedItem.directions}</p>}
            {isFavorite(feedItem)  && <BsStarFill onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" />}
            {!isFavorite(feedItem) && <BsStar     onClick={() => onFavoriteClick(feedItem)} role="button" tabIndex="0" />}

        </article>
    );
};

export default FavoriteFeedItem;
