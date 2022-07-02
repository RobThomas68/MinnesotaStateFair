
import { distance } from './Utils';

const Lab = () => {
    const a = {latitude:30.3344, longitude:-81.3987};
    const b = {latitude:30.3119, longitude:-81.3965};

    return (
      <main className="Lab">
          <h1>Lab</h1>
          <p>{distance(a,b)}</p>
      </main>
    )
  }

  export default Lab