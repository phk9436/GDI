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
import { IMovieData } from 'types/dataTypes';
import { MovieItem } from 'components/notice/MovieItem';
import MovieSceleton from 'components/notice/MovieSceleton';
import { IMovieListProps } from 'types/pagePropTypes';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function Movie({ dataList }: IMovieListProps) {
  const [isRefetch, setIsRefetch] = useState(false);
  const [postList, setPostList] = useState<IMovieData[]>([]);
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
    ['GDI 영상관', '', '/notice/Movie'],
    ['언론보도', '', '/notice/Press'],
    ['공지사항', '', '/notice'],
  ];

  const getPosts = async () => {
    setIsPending(true);
    setPostList([]);
    isInit && setIsInit(false);
    const getResult = await getBoardData('movie', 'movieCount', 6, isNext, lastData, prevData);
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
    setPostList(dataList);
    const total = await getDoc(doc(dbService, 'meta', 'movieCount'));
    setTotalNum(total.data()?.total);
    setTotalPageNum(Math.ceil(total.data()?.total / 6));
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
          collection(dbService, 'movie'),
          limit(6),
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
    <>
      <HeadMeta title="GDI | GDI 영상관" />
      <div>
        <BreadCrumb category={Tap[0]} tap={Tap} />
        <Wrapper>
          <MovieItemWrapper>
            {isInit
              ? dataList.map((e) => <MovieItem data={e} key={e.id} />)
              : postList.map((e) => <MovieItem data={e} key={e.id} />)}
            {isPending && <MovieSceleton />}
          </MovieItemWrapper>
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

export default Movie;

export const getServerSideProps = async () => {
  const queryList = query(collection(dbService, 'movie'), limit(6), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: IMovieData[] = [];
  data.forEach((docs) => {
    const postData:IMovieData = {
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

const MovieItemWrapper = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 150px 100px;

  li {
    overflow-x: hidden;
  }

  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 35px;
  }
`;
