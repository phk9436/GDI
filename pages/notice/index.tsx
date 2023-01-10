import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BreadCrumb, Pagination } from 'components/Components';
import {
  query,
  collection,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { getBoardData } from 'utils/getBoardUtils';
import dayjs from 'dayjs';
import { INoticeData } from 'types/dataTypes';
import NoticeItem from 'components/notice/NoticeItem';
import NoticeSceleton from 'components/notice/NoticeSceleton';

interface PageProps {
  dataList: INoticeData[];
}

function index({ dataList }: PageProps) {
  const [isRefetch, setIsRefetch] = useState(false);
  const [postList, setPostList] = useState<INoticeData[]>([]);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalNum, setTotalNum] = useState(0);
  const [prevData, setPrevData] = useState<QueryDocumentSnapshot>();
  const [lastData, setLastData] = useState<QueryDocumentSnapshot>();
  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const Tap = [
    [
      'GDI 영상관',
      '정책의 방향설정과 실현에 도움을 주고자 작성된 분야별 정책제안이나 아이디어 자료입니다.',
      '/notice/Movie',
    ],
    ['언론보도', '안내내용', '/notice/Press'],
    ['공지사항', '안내내용', '/notice'],
  ];

  const getPosts = async () => {
    setIsPending(true);
    setPostList([]);
    isInit && setIsInit(false);
    const [dataList, docs, total] = await getBoardData(
      'notice',
      'noticeCount',
      10,
      isNext,
      lastData,
      prevData,
    );
    setPostList(dataList);
    dataList.length && setPrevData(docs[0]);
    dataList.length && setLastData(docs[docs.length - 1]);
    isNext && setIsNext(false);
    isPrev && setIsPrev(false);
    setTotalNum(total.data()?.total);
    setTotalPageNum(Math.ceil(total.data()?.total / 10));
    setIsPending(false);
  };

  const setPropsData = async () => {
    setPostList(dataList);
    const total = await getDoc(doc(dbService, 'meta', 'noticeCount'));
    setTotalNum(total.data()?.total);
    setTotalPageNum(Math.ceil(total.data()?.total / 10));
  };

  const getNextPage = async () => {
    if (currentPageNum < totalPageNum) {
      setIsNext(true);
      lastData && setIsRefetch((state) => !state);
      setCurrentPageNum((state) => state + 1);

      if (!lastData) {
        //최초 ssr시엔 lastData를 세팅할 수 없음(JSON만 받아옴)
        //최초 다음페이지 호출 시 lastData세팅
        const queryList = query(
          collection(dbService, 'notice'),
          limit(10),
          orderBy('createdAt', 'desc'),
        );
        const data = await getDocs(queryList);
        setLastData(data.docs.at(-1));
        setIsRefetch((state) => !state);
      }
    }
  };

  const getPrevPage = () => {
    if (currentPageNum > 1) {
      setIsPrev(true);
      setIsRefetch((state) => !state);
      setCurrentPageNum((state) => state - 1);
    }
  };

  useEffect(() => {
    isNext || isPrev ? getPosts() : setPropsData();
  }, [isRefetch]);

  return (
    <div>
      <BreadCrumb category={Tap[2]} tap={Tap} />
      <Wrapper>
        <ul>
          {isInit
            ? dataList.map((e) => <NoticeItem data={e} key={e.id} category="notice" />)
            : postList.map((e) => <NoticeItem data={e} key={e.id} category="notice" />)}
          {isPending && <NoticeSceleton />}
        </ul>
        <Pagination
          currentPageNum={currentPageNum}
          totalPageNum={totalPageNum}
          getPrevPage={getPrevPage}
          getNextPage={getNextPage}
        />
      </Wrapper>
    </div>
  );
}

export default index;

export const getServerSideProps = async () => {
  const queryList = query(collection(dbService, 'notice'), limit(10), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: INoticeData[] = [];
  data.forEach((docs) => {
    const postData = {
      ...docs.data(),
      id: docs.id,
      date: dayjs(docs.data().createdAt).format('YY-MM-DD'),
    } as INoticeData;
    dataList.push(postData);
  });
  return { props: { dataList } };
};

const Wrapper = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 56px 60px 180px;

  @media screen and (max-width: 820px) {
    padding: 20px;
    padding-bottom: 140px;
  }
`;
