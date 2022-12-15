import type { NextPage } from 'next';
import MainBanner from 'components/main/MainBanner';
import MainSectionLab from 'components/main/MainSectionLab';
import MainSectionForum from 'components/main/MainSectionForum';
import MainSectionMovie from 'components/main/MainSectionMovie';
import MainSectionBottom from 'components/main/MainSectionBottom';
import { IBoardData } from 'types/dataTypes';
import { getLabPosts } from 'utils/mainPageUtils';

interface PageProps {
  labList: IBoardData[];
}

const Home: NextPage<PageProps> = ({ labList }) => {
  return (
    <>
      <MainBanner />
      <MainSectionLab data={labList} />
      <MainSectionForum />
      <MainSectionMovie />
      <MainSectionBottom />
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const labList = await getLabPosts();
  return { props: { labList } };
};
