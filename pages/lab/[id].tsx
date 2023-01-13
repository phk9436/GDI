import { BreadCrumb, HeadMeta } from 'components/Components';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { ILabData } from 'types/dataTypes';
import { useEffect } from 'react';
import BoardDetail from 'components/lab/BoardDetail';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import Head from 'next/head';

function LabDetail(props: ILabData) {
  const router = useRouter();

  const Tap = [
    [
      '연구보고서',
      '경기도 북부지역의 정책방향 및 대안 수립을 위한 기본 · 정책 · 수탁 · 기타 · 공공투자에 대한 연구자료 입니다.',
      '/lab',
    ],
    ['학술포럼', '', '/lab/Forum'],
  ];

  useEffect(() => {
    if (!props.title) {
      toast.error('잘못된 접근입니다');
      router.push('/lab');
    }
  }, []);

  return (
    <>
      <HeadMeta title={`GDI | 연구보고서 | ${props.title}`} />
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
    </>
  );
}

export default LabDetail;

export const getServerSideProps = async ({ params }: { params: ILabData }) => {
  const data = await getDoc(doc(dbService, 'lab', `${params?.id}`));
  const contentData = await getDoc(doc(dbService, 'labContent', `${params?.id}`));
  return { props: { ...data.data(), ...contentData.data() } };
};
