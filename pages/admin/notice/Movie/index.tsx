import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BreadCrumb, Pagination } from 'components/Components';
import { UploadButton } from 'components/admin/Component';
import { MovieItem } from 'components/admin/MovieItem';
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
import Loading from 'components/admin/Loading';
import { deleteMovieData } from 'utils/deleteBoardUtils';
import dayjs from 'dayjs';
import { IMovieData } from 'types/dataTypes';
import MovieSceleton from 'components/notice/MovieSceleton';
import { toast } from 'react-toastify';

interface PageProps {
  dataList: IMovieData[];
}

function index({ dataList }: PageProps) {
  const [isRefetch, setIsRefetch] = useState(false);
  const [postList, setPostList] = useState<IMovieData[]>([]);
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
      '/admin/notice/Movie',
    ],
    ['언론보도', '', '/admin/notice/Press'],
    ['공지사항', '', '/admin/notice'],
  ];

  const getPosts = async () => {
    setIsPending(true);
    setPostList([]);
    isInit && setIsInit(false);
    const [dataList, docs, total] = await getBoardData(
      'movie',
      'movieCount',
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
    const total = await getDoc(doc(dbService, 'meta', 'movieCount'));
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
          collection(dbService, 'movie'),
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

  const deleteMovieItem = async (id: string) => {
    setIsLoading(true);
    await deleteMovieData(id);
    toast.success('삭제되었습니다. 모든 삭제작업 후 데이터 최신화를 위해 새로고침을 해주세요.', { theme: 'light' });
    setIsLoading(false);
    setPostList(postList.filter((e) => e.id !== id));
    isInit && setIsInit(false);
  };

  useEffect(() => {
    isNext || isPrev ? getPosts() : setPropsData();
  }, [isRefetch]);
  return (
    <>
      <div>
        <BreadCrumb category={Tap[0]} tap={Tap} />
        <Wrapper>
          <UploadButton tap={Tap[0]} />
          <MovieItemWrapper>
            {isInit
              ? dataList.map((e) => (
                  <MovieItem data={e} deleteMovieItem={deleteMovieItem} key={e.id} />
                ))
              : postList.map((e) => (
                  <MovieItem data={e} deleteMovieItem={deleteMovieItem} key={e.id} />
                ))}
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
      {isLoading && <Loading />}
    </>
  );
}

export default index;

export const getServerSideProps = async () => {
  const queryList = query(collection(dbService, 'movie'), limit(10), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: IMovieData[] = [];
  data.forEach((docs) => {
    const postData = {
      ...docs.data(),
      id: docs.id,
      date: dayjs(docs.data().createdAt).format('YY-MM-DD'),
    } as IMovieData;
    dataList.push(postData);
  });
  return { props: { dataList } };
};

const Wrapper = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 56px 60px 180px;
`;

const MovieItemWrapper = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 150px 100px;

  li {
    overflow-x: hidden;
  }
`;
