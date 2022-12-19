import type { NextPage } from 'next';
import MainBanner from 'components/main/MainBanner';
import MainSectionLab from 'components/main/MainSectionLab';
import MainSectionForum from 'components/main/MainSectionForum';
import MainSectionMovie from 'components/main/MainSectionMovie';
import MainSectionBottom from 'components/main/MainSectionBottom';
import { IBoardData, IForumData } from 'types/dataTypes';
import { getForumPosts, getLabPosts } from 'utils/mainPageUtils';

interface PageProps {
  labList: IBoardData[];
  forumList: IForumData[];
}

const Home: NextPage<PageProps> = ({ labList, forumList }) => {
  return (
    <>
      <MainBanner />
      <MainSectionLab data={labList} />
      <MainSectionForum data={forumList} />
      <MainSectionMovie />
      <MainSectionBottom />
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const labList = await getLabPosts();
  const forumList = await getForumPosts();
  return { props: { labList, forumList } };
};
