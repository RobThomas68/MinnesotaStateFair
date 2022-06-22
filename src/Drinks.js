import Feed from './Feed';

const Drinks = ({ feedItems, fetchError, isLoading }) => {
    return (
        <main className="Drinks">
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={ {color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (feedItems.length ? (
                <Feed feedItems={feedItems} />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No drinks to display.
                </p>
            ))}
        </main>
    )
}

export default Drinks