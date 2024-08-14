import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BreadCrumb, HeadMeta, Pagination } from 'components/Components';
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
import { ILabData } from 'types/dataTypes';
import { getBoardData } from 'utils/getBoardUtils';
import BoardSceleton from 'components/lab/BoardSceleton';
import { ILabListProps } from 'types/pagePropTypes';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function index({ dataList }: ILabListProps) {
  const [isRefetch, setIsRefetch] = useState(false);
  const [postList, setPostList] = useState<ILabData[]>([]);
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
      '연구보고서',
      '경기도 북부지역의 정책방향 및 대안 수립을 위한 기본 · 정책 · 수탁 · 기타 · 공공투자에 대한 연구자료 입니다.',
      '/lab',
    ],
    ['학술포럼', '', '/lab/Forum'],
  ];

  const getPosts = async () => {
    setIsPending(true);
    setPostList([]);
    isInit && setIsInit(false);
    const getResult = await getBoardData('lab', 'labCount', 6, isNext, lastData, prevData);
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
      const total = await getDoc(doc(dbService, 'meta', 'labCount'));
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
        //최초 다음페이지 호출 시 lastData세팅
        try {
          const queryList = query(
            collection(dbService, 'lab'),
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
      <HeadMeta title="GDI | 연구보고서" />
      <div>
        <BreadCrumb category={Tap[0]} tap={Tap} />
        <Wrapper>
          <ul>
            {isInit
              ? dataList.map((e) => (
                <BoardItem data={e} path={Tap[0][2]} key={e.id} category="lab" />
              ))
              : postList.map((e) => (
                <BoardItem data={e} path={Tap[0][2]} key={e.id} category="lab" />
              ))}
            {isPending && <BoardSceleton />}
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
  const queryList = query(collection(dbService, 'lab'), limit(6), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: ILabData[] = [];
  data.forEach((docs) => {
    const postData: ILabData = {
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
    padding: 20px;
    padding-bottom: 140px;
  }

  & > ul {
    @media screen and (max-width: 820px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;

      li {
        overflow: hidden;
      }
    }
  }
`;
