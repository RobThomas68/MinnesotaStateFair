import Feed from './Feed';

import { useContext } from 'react';
import DataContext from './context/DataContext';

const Drinks = () => {

    const { data, fetchError, isLoading } = useContext(DataContext);
    return (
        <main className="Drinks">
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={ {color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (data.length ? (
                <Feed feedItems={data} />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No drinks to display.
                </p>
            ))}
        </main>
    )
}

export default Drinks