import { BreadCrumb } from 'components/Components';
import { useRouter } from 'next/router';
import BoardDetail from 'components/admin/BoardDetail';
import { IForumData } from 'types/dataTypes';
import { deletePostData } from 'utils/deleteBoardUtils';
import { useEffect, useState } from 'react';
import Loading from 'components/admin/Loading';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

function ForumDetail(props: IForumData) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const Tap = [
    [
      '연구보고서',
      '경기도 북부지역의 정책방향 및 대안 수립을 위한 기본 · 정책 · 수탁 · 기타 · 공공투자에 대한 연구자료 입니다.',
      '/admin/lab',
    ],
    ['학술포럼', '안내내용', '/admin/lab/Forum'],
  ];

  const deleteBoardItem = async (
    id: string,
    fileId: string | undefined,
    thumbnailId: string | undefined,
  ) => {
    setIsLoading(true);
    await deletePostData('forum', 'forumCount', id, fileId, thumbnailId);
    toast.success('삭제되었습니다.');
    router.push(Tap[1][2]);
  };

  useEffect(() => {
    if (!props.title) {
      toast.error('잘못된 접근입니다');
      router.push('/admin/lab/Forum');
    }
  }, []);
  return (
    <>
      <div>
        <BreadCrumb category={Tap[1]} tap={Tap} />
        <BoardDetail
          data={{
            ...props,
            id: router.query.id as string,
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
