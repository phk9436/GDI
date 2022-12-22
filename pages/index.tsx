import type { NextPage } from 'next';
import MainBanner from 'components/main/MainBanner';
import MainSectionLab from 'components/main/MainSectionLab';
import MainSectionForum from 'components/main/MainSectionForum';
import MainSectionMovie from 'components/main/MainSectionMovie';
import MainSectionBottom from 'components/main/MainSectionBottom';
import { IBoardData, IForumData } from 'types/dataTypes';
import { getMovies, getPosts } from 'utils/mainPageUtils';

interface PageProps {
  labList: IBoardData[];
  forumList: IForumData[];
}

const Home: NextPage<PageProps> = ({ labList, forumList, movieList }) => {
  return (
    <>
      <MainBanner />
      <MainSectionLab data={labList} />
      <MainSectionForum data={forumList} />
      <MainSectionMovie data={movieList} />
      <MainSectionBottom />
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const labList = await getPosts('lab');
  const forumList = await getPosts('forum');
  const movieList = await getMovies();
  return { props: { labList, forumList, movieList } };
};
