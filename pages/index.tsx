import type { NextPage } from 'next';
import MainBanner from 'components/main/MainBanner';
import MainSection from 'components/main/MainSection';

const Home: NextPage = () => {
  return (
    <>
      <MainBanner />
      <MainSection />
    </>
  );
};

export default Home;
