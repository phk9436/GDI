import type { NextPage } from 'next';
import MainBanner from 'components/main/MainBanner';
import MainSectionLab from 'components/main/MainSectionLab';
import MainSectionForum from 'components/main/MainSectionForum';
import MainSectionMovie from 'components/main/MainSectionMovie';
import MainSectionBottom from 'components/main/MainSectionBottom';

const Home: NextPage = () => {
  return (
    <>
      <MainBanner />
      <MainSectionLab />
      <MainSectionForum />
      <MainSectionMovie />
      <MainSectionBottom />
    </>
  );
};

export default Home;
