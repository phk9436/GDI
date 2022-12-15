import { BreadCrumb } from 'components/Components';
import { useRouter } from 'next/router';
import BoardDetail from 'components/admin/BoardDetail';
import { IBoardData } from 'types/dataTypes';
import { deleteBoardData } from 'utils/deleteBoardUtils';
import { useEffect, useState } from 'react';
import Loading from 'components/admin/Loading';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';

function LabDetail(props: IBoardData) {
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
    await deleteBoardData('lab', 'labCount', id, fileId, thumbnailId);
    alert('삭제되었습니다.');
    router.push(Tap[0][2]);
  };

  useEffect(() => {
    if (!props.title) {
      alert('잘못된 접근입니다');
      router.push('/admin/lab');
    }
  }, []);

  return (
    <>
      <div>
        <BreadCrumb category={Tap[0]} tap={Tap} />
        <BoardDetail
          data={{ ...props, id: router.query.id as string }}
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

export const getServerSideProps = async ({ params }: { params: IBoardData }) => {
  const data = await getDoc(doc(dbService, 'lab', `${params?.id}`));
  return { props: data.data() };
};
