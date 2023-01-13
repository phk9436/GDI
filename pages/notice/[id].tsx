import { BreadCrumb } from 'components/Components';
import { useRouter } from 'next/router';
import { INoticeData } from 'types/dataTypes';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import dayjs from 'dayjs';
import NoticeDetail from 'components/notice/NoticeDetail';
import { toast } from 'react-toastify';
import Head from 'next/head';

function Detail(props: INoticeData) {
  const router = useRouter();
  const Tap = [
    [
      'GDI 영상관',
      '정책의 방향설정과 실현에 도움을 주고자 작성된 분야별 정책제안이나 아이디어 자료입니다.',
      '/notice/Movie',
    ],
    ['언론보도', '', '/notice/Press'],
    ['공지사항', '', '/notice'],
  ];

  useEffect(() => {
    if (!props.title) {
      toast.error('잘못된 접근입니다');
      router.push(Tap[2][2]);
    }
  }, []);

  return (
    <>
      <Head>
        <title>GDI | 공지사항 | {props.title}</title>
      </Head>
      <div>
        <BreadCrumb category={Tap[2]} tap={Tap} />
        <NoticeDetail
          data={{
            ...props,
            id: router.query.id as string,
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
