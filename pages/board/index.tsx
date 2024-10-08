import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BreadCrumb, HeadMeta, Pagination } from 'components/Components';
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
import { IBoardData } from 'types/dataTypes';
import PressSceleton from 'components/notice/PressSceleton';
import BoardItem from 'components/board/BoardItem';
import { UploadButton } from 'components/board/Components';
import { IBoardListProps } from 'types/pagePropTypes';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function index({ dataList }: IBoardListProps) {
  const [isRefetch, setIsRefetch] = useState(false);
  const [postList, setPostList] = useState<IBoardData[]>([]);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalNum, setTotalNum] = useState(0);
  const [prevData, setPrevData] = useState<QueryDocumentSnapshot>();
  const [lastData, setLastData] = useState<QueryDocumentSnapshot>();
  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const Tap = [
    [
      '연구제안',
      '일반 사용자들이 GDI에게 자유롭게 제안하는 참여마당입니다. 관리자와 글 작성자만 확인가능합니다.',
      '/board',
    ],
  ];

  const getPosts = async () => {
    setIsPending(true);
    setPostList([]);
    isInit && setIsInit(false);
    const getResult = await getBoardData('board', 'boardCount', 6, isNext, lastData, prevData);
    if (!getResult) {
      toast.error('알 수 없는 에러가 발생했습니다.');
      router.push('/');
      setIsPending(false);
      return;
    }
    const [dataList, docs, total] = getResult;
    setPostList(dataList);
    dataList.length && setPrevData(docs[0]);
    dataList.length && setLastData(docs[docs.length - 1]);
    isNext && setIsNext(false);
    isPrev && setIsPrev(false);
    setTotalNum(total.data()?.total);
    setTotalPageNum(Math.ceil(total.data()?.total / 6));
    setIsPending(false);
  };

  const setPropsData = async () => {
    try {
      setPostList(dataList);
      const total = await getDoc(doc(dbService, 'meta', 'boardCount'));
      setTotalNum(total.data()?.total);
      setTotalPageNum(Math.ceil(total.data()?.total / 6));
    } catch (err) {
      toast.error('알 수 없는 에러가 발생했습니다.');
      router.push('/');
    }

  };

  const getNextPage = async () => {
    if (currentPageNum < totalPageNum) {
      setIsNext(true);
      lastData && setIsRefetch((state) => !state);
      setCurrentPageNum((state) => state + 1);

      if (!lastData) {
        //최초 ssr시엔 lastData를 세팅할 수 없음(JSON만 받아옴)
        //최초 다음페이지 호출 시 lastData세팅
        try {
          const queryList = query(
            collection(dbService, 'board'),
            limit(6),
            orderBy('createdAt', 'desc'),
          );
          const data = await getDocs(queryList);
          setLastData(data.docs.at(-1));
          setIsRefetch((state) => !state);
        } catch (err) {
          toast.error('알 수 없는 에러가 발생했습니다.');
          router.push('/');
        }
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
    <>
      <HeadMeta title="GDI | 연구제안" />
      <div>
        <BreadCrumb category={Tap[0]} tap={Tap} />
        <Wrapper>
          <UploadButton tap={Tap[0]} />
          <ul>
            {isInit
              ? dataList.map((e) => <BoardItem data={e} key={e.id} />)
              : postList.map((e) => <BoardItem data={e} key={e.id} />)}
            {isPending && <PressSceleton />}
          </ul>
          <Pagination
            currentPageNum={currentPageNum}
            totalPageNum={totalPageNum}
            getPrevPage={getPrevPage}
            getNextPage={getNextPage}
          />
        </Wrapper>
      </div>
    </>
  );
}

export default index;

export const getServerSideProps = async () => {
  const queryList = query(collection(dbService, 'board'), limit(6), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: IBoardData[] = [];
  data.forEach((docs) => {
    const postData: IBoardData = {
      ...docs.data(),
      id: docs.id,
      date: dayjs(docs.data().createdAt).format('YY-MM-DD'),
    };
    dataList.push(postData);
  });
  return { props: { dataList } };
};

const Wrapper = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 56px 60px 180px;

  @media screen and (max-width: 820px) {
    padding: 30px;
    padding-bottom: 140px;
  }
`;
