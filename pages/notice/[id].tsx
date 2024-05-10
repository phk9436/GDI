import { BreadCrumb, HeadMeta } from 'components/Components';
import { useRouter } from 'next/router';
import { INoticeData } from 'types/dataTypes';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import dayjs from 'dayjs';
import NoticeDetail from 'components/notice/NoticeDetail';
import { toast } from 'react-toastify';

function Detail(props: INoticeData) {
  const router = useRouter();

  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>
  }

  const Tap = [
    [
      'GDI 영상관',
      '',
      '/notice/Movie',
    ],
    ['언론보도', '', '/notice/Press'],
    ['공지사항', '', '/notice'],
  ];

  useEffect(() => {
    if (!props.title) {
      toast.error('잘못된 접근입니다.');
      router.push(Tap[2][2]);
    }
  }, []);

  return (
    <>
      <HeadMeta title={`GDI | 공지사항 | ${props.title}`} />
      <div>
        <BreadCrumb category={Tap[2]} tap={Tap} />
        <NoticeDetail
          data={{
            ...props,
            id,
            date: dayjs(props.createdAt).format('YY-MM-DD'),
          }}
        />
      </div>
    </>
  );
}

export default Detail;

export const getServerSideProps = async ({ params }: { params: INoticeData }) => {
  const data = await getDoc(doc(dbService, 'notice', `${params?.id}`));
  const contentData = await getDoc(doc(dbService, 'noticeContent', `${params?.id}`));
  return { props: { ...data.data(), ...contentData.data() } };
};
