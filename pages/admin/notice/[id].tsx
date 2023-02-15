import { BreadCrumb, HeadMeta } from 'components/Components';
import { useRouter } from 'next/router';
import { INoticeData } from 'types/dataTypes';
import { deleteNoticeData } from 'utils/deleteBoardUtils';
import { useEffect, useState } from 'react';
import Loading from 'components/admin/Loading';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import dayjs from 'dayjs';
import NoticeDetail from 'components/admin/NoticeDetail';
import { toast } from 'react-toastify';

function Detail(props: INoticeData) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const Tap = [
    ['GDI 영상관', '', '/admin/notice/Movie'],
    ['언론보도', '', '/admin/notice/Press'],
    ['공지사항', '', '/admin/notice'],
  ];

  const deleteNoticeItem = async (id: string, fileId: string | undefined) => {
    setIsLoading(true);
    const isDeleted = await deleteNoticeData(id, fileId);
    if (!isDeleted) {
      toast.error('알 수 없는 에러가 발생했습니다.');
      router.push(Tap[2][2]);
      return;
    }
    toast.success('삭제되었습니다.', { theme: 'light' });
    router.push(Tap[2][2]);
  };

  useEffect(() => {
    if (!props.title) {
      toast.error('잘못된 접근입니다');
      router.push(Tap[2][2]);
    }
  }, []);
  return (
    <>
      <HeadMeta title={`GDI | 어드민 | 공지사항 | ${props.title}`} />
      <div>
        <BreadCrumb category={Tap[2]} tap={Tap} />
        <NoticeDetail
          data={{
            ...props,
            id: router.query.id as string,
            date: dayjs(props.createdAt).format('YY-MM-DD'),
          }}
          deleteNoticeItem={deleteNoticeItem}
        />
      </div>
      {isLoading && <Loading />}
    </>
  );
}

export default Detail;

export const getServerSideProps = async ({ params }: { params: INoticeData }) => {
  const data = await getDoc(doc(dbService, 'notice', `${params?.id}`));
  const contentData = await getDoc(doc(dbService, 'noticeContent', `${params?.id}`));
  return { props: { ...data.data(), ...contentData.data() } };
};
