import { BreadCrumb } from 'components/Components';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { IForumData } from 'types/dataTypes';
import { useEffect } from 'react';
import BoardDetail from 'components/lab/BoardDetail';
import dayjs from 'dayjs';

function ForumDetail(props: IForumData) {
  const router = useRouter();
  const Tap = [
    [
      '연구보고서',
      '경기도 북부지역의 정책방향 및 대안 수립을 위한 기본 · 정책 · 수탁 · 기타 · 공공투자에 대한 연구자료 입니다.',
      '/lab',
    ],
    ['학술포럼', '안내내용', '/lab/Forum'],
  ];
  useEffect(() => {
    if (!props.title) {
      alert('잘못된 접근입니다');
      router.push('/lab/Forum');
    }
  }, []);
  return <div>
  <BreadCrumb category={Tap[1]} tap={Tap} />
  <BoardDetail
    data={{
      ...props,
      id: router.query.id as string,
      date: dayjs(props.createdAt).format('YY-MM-DD'),
    }}
    path={Tap[1][2]}
    category="forum"
  />
</div>;
}

export default ForumDetail;

export const getServerSideProps = async ({ params }: { params: IForumData }) => {
  const data = await getDoc(doc(dbService, 'forum', `${params?.id}`));
  const contentData = await getDoc(doc(dbService, 'forumContent', `${params?.id}`));
  return { props: { ...data.data(), ...contentData.data() } };
};
