import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BreadCrumb, Pagination } from 'components/Components';
import { BoardItem } from 'components/lab/BoardItem';
import dayjs from 'dayjs';
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
import { IForumData } from 'types/dataTypes';
import { getBoardData } from 'utils/getBoardUtils';

interface PageProps {
  dataList: IForumData[];
}

function index({ dataList }: PageProps) {
  const [isRefetch, setIsRefetch] = useState(false);
  const [postList, setPostList] = useState<IForumData[]>([]);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalNum, setTotalNum] = useState(0);
  const [prevData, setPrevData] = useState<QueryDocumentSnapshot>();
  const [lastData, setLastData] = useState<QueryDocumentSnapshot>();
  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isInit, setIsInit] = useState(true);

  const Tap = [
    [
      '연구보고서',
      '경기도 북부지역의 정책방향 및 대안 수립을 위한 기본 · 정책 · 수탁 · 기타 · 공공투자에 대한 연구자료 입니다.',
      '/lab',
    ],
    ['학술포럼', '안내내용', '/lab/Forum'],
  ];

  const getPosts = async () => {
    console.log('fetching...');
    setPostList([]);
    isInit && setIsInit(false);
    const [dataList, docs, total] = await getBoardData(
      'forum',
      'forumCount',
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
  };

  const setPropsData = async () => {
    setPostList(dataList);
    const total = await getDoc(doc(dbService, 'meta', 'forumCount'));
    setTotalNum(total.data()?.total);
    setTotalPageNum(Math.ceil(total.data()?.total / 10));
  };

  const getNextPage = async () => {
    if (currentPageNum < totalPageNum) {
      setIsNext(true);
      lastData && setIsRefetch((state) => !state);
      setCurrentPageNum((state) => state + 1);

      if (!lastData) {
        //최초 다음페이지 호출 시 lastData세팅
        const queryList = query(
          collection(dbService, 'forum'),
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
      <BreadCrumb category={Tap[1]} tap={Tap} />
      <Wrapper>
        <ul>
          {isInit
            ? dataList.map((e) => (
                <BoardItem data={e} path={Tap[1][2]} key={e.id} category="forum" />
              ))
            : postList.map((e) => (
                <BoardItem data={e} path={Tap[1][2]} key={e.id} category="forum" />
              ))}
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
  const queryList = query(collection(dbService, 'forum'), limit(10), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: IForumData[] = [];
  data.forEach((docs) => {
    const postData = {
      ...docs.data(),
      id: docs.id,
      date: dayjs(docs.data().createdAt).format('YY-MM-DD'),
    } as IForumData;
    dataList.push(postData);
  });
  return { props: { dataList } };
};

const Wrapper = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 56px 60px 180px;

  @media screen and (max-width: 820px) {
    padding: 20px;
    padding-bottom: 140px;
  }

  & > ul {
    @media screen and (max-width: 820px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
  }
`;
