import { BreadCrumb, HeadMeta } from 'components/Components';
import { useRouter } from 'next/router';
import BoardDetail from 'components/admin/BoardDetail';
import { ILabData } from 'types/dataTypes';
import { deletePostData } from 'utils/deleteBoardUtils';
import { useEffect, useState } from 'react';
import Loading from 'components/admin/Loading';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import Head from 'next/head';

function LabDetail(props: ILabData) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
    await deletePostData('lab', 'labCount', id, fileId, thumbnailId);
    toast.success('삭제되었습니다.', { theme: 'light' });
    router.push(Tap[0][2]);
  };

  useEffect(() => {
    if (!props.title) {
      toast.error('잘못된 접근입니다');
      router.push('/admin/lab');
    }
  }, []);

  return (
    <>
      <HeadMeta title={`GDI | 어드민 | 연구보고서 | ${props.title}`} />
      <div>
        <BreadCrumb category={Tap[0]} tap={Tap} />
        <BoardDetail
          data={{
            ...props,
            id: router.query.id as string,
            date: dayjs(props.createdAt).format('YY-MM-DD'),
          }}
          path={Tap[0][2]}
          category="lab"
          deleteBoardItem={deleteBoardItem}
        />
      </div>
      {isLoading && <Loading />}
    </>
  );
}

export default LabDetail;

export const getServerSideProps = async ({ params }: { params: ILabData }) => {
  const data = await getDoc(doc(dbService, 'lab', `${params?.id}`));
  const contentData = await getDoc(doc(dbService, 'labContent', `${params?.id}`));
  return { props: { ...data.data(), ...contentData.data() } };
};
