import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BreadCrumb, Pagination } from 'components/Components';
import { UploadButton } from 'components/admin/Component';
import { BoardItem } from 'components/admin/BoardItem';
import {
  query,
  collection,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  startAfter,
  QueryDocumentSnapshot,
  endBefore,
  limitToLast,
} from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { IBoardData } from 'types/dataTypes';

interface PageProps {
  dataList: IBoardData[];
}

function index({ dataList }: PageProps) {
  const [isRefetch, setIsRefetch] = useState(false);
  const [postList, setPostList] = useState<IBoardData[]>([]);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalNum, setTotalNum] = useState(0);
  const [prevData, setPrevData] = useState<QueryDocumentSnapshot>();
  const [lastData, setLastData] = useState<QueryDocumentSnapshot>();
  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const Tap = [
    [
      '연구보고서',
      '경기도 북부지역의 정책방향 및 대안 수립을 위한 기본 · 정책 · 수탁 · 기타 · 공공투자에 대한 연구자료 입니다.',
      '/admin/lab',
    ],
    ['학술포럼', '안내내용', '/admin/lab/Forum'],
  ];

  const getPosts = async () => {
    console.log('fetching...');
    setPostList([]);
    let queryList;
    if (isNext) {
      queryList = query(
        collection(dbService, 'lab'),
        limit(10),
        orderBy('createdAt'),
        startAfter(lastData),
      );
    } else {
      queryList = query(
        collection(dbService, 'lab'),
        limitToLast(10),
        orderBy('createdAt'),
        endBefore(prevData),
      );
    }
    const data = await getDocs(queryList);
    const dataList: IBoardData[] = [];
    data.forEach((docs) => {
      const postData = { ...docs.data(), id: docs.id } as IBoardData;
      dataList.push(postData);
    });
    setPostList(dataList);
    dataList.length && setPrevData(data.docs[0]);
    dataList.length && setLastData(data.docs[data.docs.length - 1]);
    isNext && setIsNext(false);
    isPrev && setIsPrev(false);

    const total = await getDoc(doc(dbService, 'meta', 'labCount'));
    setTotalNum(total.data()?.total);
    setTotalPageNum(Math.ceil(total.data()?.total / 10));
  };

  const setPropsData = async () => {
    setPostList(dataList);
    const total = await getDoc(doc(dbService, 'meta', 'labCount'));
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
        const queryList = query(collection(dbService, 'lab'), limit(10), orderBy('createdAt'));
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
      <BreadCrumb category={Tap[0]} tap={Tap} />
      <Wrapper>
        <UploadButton tap={Tap[0]} />
        <ul>
          {postList.map((e) => (
            <BoardItem data={e} path={Tap[0][2]} key={e.id} />
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
  const queryList = query(collection(dbService, 'lab'), limit(10), orderBy('createdAt'));
  const data = await getDocs(queryList);
  const dataList: IBoardData[] = [];
  data.forEach((docs) => {
    const postData = { ...docs.data(), id: docs.id } as IBoardData;
    dataList.push(postData);
  });
  return { props: { dataList } };
};

const Wrapper = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 56px 60px 180px;
`;
