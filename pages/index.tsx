import type { NextPage } from 'next';
import MainBanner from 'components/main/MainBanner';
import MainSectionLab from 'components/main/MainSectionLab';
import MainSectionForum from 'components/main/MainSectionForum';

const Home: NextPage = () => {
  return (
    <>
      <MainBanner />
      <MainSectionLab />
      <MainSectionForum />
    </>
  );
};

export default Home;
