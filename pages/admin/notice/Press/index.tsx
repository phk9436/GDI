import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BreadCrumb, HeadMeta, Pagination } from 'components/Components';
import { UploadButton } from 'components/board/Components';
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
import Loading from 'components/Loading';
import dayjs from 'dayjs';
import { IPressData } from 'types/dataTypes';
import PressItem from 'components/admin/PressItem';
import { deletePressData } from 'utils/deleteBoardUtils';
import PressSceleton from 'components/notice/PressSceleton';
import { toast } from 'react-toastify';
import { IPressListProps } from 'types/pagePropTypes';
import { useRouter } from 'next/router';

function index({ dataList }: IPressListProps) {
  const [isRefetch, setIsRefetch] = useState(false);
  const [postList, setPostList] = useState<IPressData[]>([]);
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
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();

  const Tap = [
    ['GDI 영상관', '', '/admin/notice/Movie'],
    ['언론보도', '', '/admin/notice/Press'],
    ['공지사항', '', '/admin/notice'],
  ];

  const getPosts = async () => {
    setIsPending(true);
    setPostList([]);
    isInit && setIsInit(false);
    const getResult = await getBoardData('press', 'pressCount', 6, isNext, lastData, prevData);
    if (!getResult) {
      toast.error('알 수 없는 에러가 발생했습니다.');
      router.push('/admin');
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
    const total = await getDoc(doc(dbService, 'meta', 'pressCount'));
    setTotalNum(total.data()?.total);
    setTotalPageNum(Math.ceil(total.data()?.total / 6));
  };

  const getNextPage = async () => {
    if (currentPageNum < totalPageNum) {
      if (isDeleted) {
        toast.error('삭제 후에는 새로고침을 해주세요.');
        return;
      }
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
      if (isDeleted) {
        toast.error('삭제 후에는 새로고침을 해주세요.');
        return;
      }
      setIsPrev(true);
      setIsRefetch((state) => !state);
      setCurrentPageNum((state) => state - 1);
    }
  };

  const deletePressItem = async (id: string) => {
    setIsLoading(true);
    const isDeleteSuccessed = await deletePressData(id);
    if (!isDeleteSuccessed) {
      toast.error('알 수 없는 에러가 발생했습니다.');
      router.push('/admin');
      setIsLoading(false);
      return;
    }
    toast.success('삭제되었습니다. 모든 삭제작업 후 데이터 최신화를 위해 새로고침을 해주세요.', {
      theme: 'light',
    });
    setIsLoading(false);
    setPostList(postList.filter((e) => e.id !== id));
    isDeleted || setIsDeleted(true);
    isInit && setIsInit(false);
  };

  useEffect(() => {
    isNext || isPrev ? getPosts() : setPropsData();
  }, [isRefetch]);

  return (
    <>
      <HeadMeta title="GDI | 어드민 | 언론보도" />
      <div>
        <BreadCrumb category={Tap[1]} tap={Tap} />
        <Wrapper>
          <UploadButton tap={Tap[1]} />
          <ul>
            {isInit
              ? dataList.map((e) => (
                  <PressItem data={e} deletePressItem={deletePressItem} key={e.id} />
                ))
              : postList.map((e) => (
                  <PressItem data={e} deletePressItem={deletePressItem} key={e.id} />
                ))}
            {isPending && <PressSceleton />}
          </ul>

          <Pagination
            currentPageNum={currentPageNum}
            totalPageNum={totalPageNum}
            getPrevPage={getPrevPage}
            getNextPage={getNextPage}
            isDeleted={isDeleted}
          />
        </Wrapper>
      </div>
      {isLoading && <Loading />}
    </>
  );
}

export default index;

export const getServerSideProps = async () => {
  const queryList = query(collection(dbService, 'press'), limit(6), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: IPressData[] = [];
  data.forEach((docs) => {
    const postData = {
      ...docs.data(),
      id: docs.id,
      date: dayjs(docs.data().createdAt).format('YY-MM-DD'),
    } as IPressData;
    dataList.push(postData);
  });
  return { props: { dataList } };
};

const Wrapper = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 56px 60px 180px;
`;
