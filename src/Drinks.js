import Feed from './Feed';

const Drinks = ({ feedItems }) => {
    return (
        <main className="Drinks">
            {feedItems.length ? (
                <Feed feedItems={feedItems} />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No drinks to display.
                </p>
            )}
        </main>
    )
}

export default Drinks