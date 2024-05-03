import { BreadCrumb, HeadMeta } from 'components/Components';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { IBoardData } from 'types/dataTypes';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import BoardDetail from 'components/board/BoardDetail';
import Loading from 'components/Loading';
import { deleteBoardData } from 'utils/deleteBoardUtils';
import { toast } from 'react-toastify';
import ConfirmModal from 'components/ConfirmModal';
import { useRecoilState } from 'recoil';
import { confirmOpen } from 'atoms/layout';

function Detail(props: IBoardData) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [modalType, setModalType] = useState('');
  const [isOpened, setIsOpened] = useRecoilState(confirmOpen);

  const { id, isvalid } = router.query;

  if (typeof id !== 'string') {
    return <></>
  }

  const Tap = [
    [
      '연구제안',
      '일반 사용자들이 GDI에게 자유롭게 제안하는 참여마당입니다. 관리자와 글 작성자만 확인가능합니다.',
      '/board',
    ],
  ];

  const updateBoardItem = () => {
    setModalType('update');
    setIsOpened(true);
  };

  const deleteBoardItem = () => {
    setModalType('delete');
    setIsOpened(true);
  };

  const checkPasswordForUpdate = () => {
    if (typeof id !== 'string') {
      return;
    }
    if (password !== props.password) {
      toast.error('비밀번호가 맞지 않습니다.');
      setPassword('');
      setIsOpened(false);
      return;
    }
    setPassword('');
    router.push(
      {
        pathname: '/board/update',
        query: {
          ...props,
          id,
          date: dayjs(props.createdAt).format('YY-MM-DD'),
        },
      },
      '/board/update',
    );
  };

  const checkPasswordForDelete = async () => {
    if (typeof id !== 'string') {
      return;
    }
    if (password !== props.password) {
      toast.error('비밀번호가 맞지 않습니다.');
      setPassword('');
      setIsOpened(false);
      return;
    }
    setPassword('');
    setIsLoading(true);
    const isDeleted = await deleteBoardData(id);
    if (!isDeleted) {
      toast.error('알 수 없는 에러가 발생했습니다.');
      router.push('/board');
      return;
    }
    toast.success('삭제되었습니다.', { theme: 'light' });
    router.push('/board');
  };

  const checkPasswordForLanding = () => {
    if (password !== props.password) {
      toast.error('비밀번호가 맞지 않습니다.');
      router.push('/board');
      return;
    }
    setPassword('');
    setIsOpened(false);
  };

  const cancelConfirm = () => {
    router.push('/board');
  }

  const validPage = () => {
    if (!props.title) {
      toast.error('잘못된 접근입니다.');
      router.push('/board');
      return;
    }

    if (!isvalid) {
      setModalType('landing');
      setIsOpened(true);
      return;
    }
  };

  useEffect(() => {
    validPage();
  }, []);

  return (
    <>
      <HeadMeta title={`GDI | 연구제안 | ${props.title}`} />
      <div>
        <BreadCrumb category={Tap[0]} tap={Tap} />
        <BoardDetail
          data={{
            ...props,
            id,
            date: dayjs(props.createdAt).format('YY-MM-DD'),
          }}
          deleteBoardItem={deleteBoardItem}
          updateBoardItem={updateBoardItem}
        />
      </div>
      {isLoading && <Loading />}
      {isOpened && modalType === 'delete' && (
        <ConfirmModal
          password={password}
          setPassword={setPassword}
          checkPassword={checkPasswordForDelete}
        />
      )}
      {isOpened && modalType === 'update' && (
        <ConfirmModal
          password={password}
          setPassword={setPassword}
          checkPassword={checkPasswordForUpdate}
        />
      )}
      {isOpened && modalType === 'landing' && (
        <ConfirmModal
          password={password}
          setPassword={setPassword}
          checkPassword={checkPasswordForLanding}
          isDark={true}
          cancelConfirm={cancelConfirm}
        />
      )}
    </>
  );
}

export default Detail;

export const getServerSideProps = async ({ params }: { params: IBoardData }) => {
  const data = await getDoc(doc(dbService, 'board', `${params?.id}`));
  const contentData = await getDoc(doc(dbService, 'boardContent', `${params?.id}`));
  return { props: { ...data.data(), ...contentData.data() } };
};
