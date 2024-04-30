import { BreadCrumb, HeadMeta } from 'components/Components';
import { useRouter } from 'next/router';
import BoardDetail from 'components/admin/BoardDetail';
import { IForumData } from 'types/dataTypes';
import { deletePostData } from 'utils/deleteBoardUtils';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

function ForumDetail(props: IForumData) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const Tap = [
    [
      '연구보고서',
      '경기도 북부지역의 정책방향 및 대안 수립을 위한 기본 · 정책 · 수탁 · 기타 · 공공투자에 대한 연구자료 입니다.',
      '/admin/lab',
    ],
    ['학술포럼', '', '/admin/lab/Forum'],
  ];

  const deleteBoardItem = async (
    id: string,
    fileId: string | undefined,
    thumbnailId: string | undefined,
  ) => {
    setIsLoading(true);
    const isDeleted = await deletePostData('forum', 'forumCount', id, fileId, thumbnailId);
    if (!isDeleted) {
      toast.error('알 수 없는 에러가 발생했습니다.');
      router.push(Tap[1][2]);
      return;
    }
    toast.success('삭제되었습니다.', { theme: 'light' });
    router.push(Tap[1][2]);
  };

  useEffect(() => {
    if (!props.title) {
      toast.error('잘못된 접근입니다.');
      router.push('/admin/lab/Forum');
    }
  }, []);
  return (
    <>
      <HeadMeta title={`GDI | 어드민 | 학술포럼 | ${props.title}`} />
      <div>
        <BreadCrumb category={Tap[1]} tap={Tap} />
        <BoardDetail
          data={{
            ...props,
            id,
            date: dayjs(props.createdAt).format('YY-MM-DD'),
          }}
          path={Tap[1][2]}
          category="forum"
          deleteBoardItem={deleteBoardItem}
        />
      </div>
      {isLoading && <Loading />}
    </>
  );
}

export default ForumDetail;

export const getServerSideProps = async ({ params }: { params: IForumData }) => {
  const data = await getDoc(doc(dbService, 'forum', `${params?.id}`));
  const contentData = await getDoc(doc(dbService, 'forumContent', `${params?.id}`));
  return { props: { ...data.data(), ...contentData.data() } };
};
