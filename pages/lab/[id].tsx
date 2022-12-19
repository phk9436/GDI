import { BreadCrumb } from 'components/Components';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { IBoardData } from 'types/dataTypes';
import { useEffect } from 'react';
import BoardDetail from 'components/lab/BoardDetail';
import dayjs from 'dayjs';

function LabDetail(props: IBoardData) {
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
      router.push('/lab');
    }
  }, []);

  return (
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
      />
    </div>
  );
}

export default LabDetail;

export const getServerSideProps = async ({ params }: { params: IBoardData }) => {
  const data = await getDoc(doc(dbService, 'lab', `${params?.id}`));
  const contentData = await getDoc(doc(dbService, 'labContent', `${params?.id}`));
  return { props: { ...data.data(), ...contentData.data() } };
};
