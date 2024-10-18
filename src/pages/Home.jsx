import { useMemo } from 'react';
import HomeWrapper from '../components/HomeWrapper/HomeWrapper';
import Home from '../components/Home/Home';
import SubredditSidebar from '../components/SubredditSidebar/SubredditSidebar';

export default function HomePage() {
  // const memoizedChild = useMemo(() => <Home />, []);

  return (
    <>
      <Home />
      {/* <HomeWrapper>
        {memoizedChild}
        <SubredditSidebar />
      </HomeWrapper> */}
    </>
  );
}
