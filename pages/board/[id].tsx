import { BreadCrumb } from 'components/Components';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { IBoardData } from 'types/dataTypes';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import BoardDetail from 'components/board/BoardDetail';
import Loading from 'components/admin/Loading';
import { deleteBoardData } from 'utils/deleteBoardUtils';

function Detail(props: IBoardData) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const Tap = [
    [
      '연구제안',
      '일반 사용자들이 GDI에게 자유롭게 제안하는 연구 주제입니다. 관리자와 글 작성자만 확인가능합니다.',
      '/board',
    ],
  ];

  const deleteBoardItem = async (id: string) => {
    if (prompt('비밀번호를 다시 한 번 입력해주세요.') !== props.password) {
      alert('비밀번호가 맞지 않습니다.');
      return;
    }
    setIsLoading(true);
    await deleteBoardData(id);
    alert('삭제되었습니다');
    router.push('/board');
  };

  useEffect(() => {
    if (!props.title) {
      alert('잘못된 접근입니다');
      router.push('/board');
    }
  }, []);

  return (
    <>
      <div>
        <BreadCrumb category={Tap[0]} tap={Tap} />
        <BoardDetail
          data={{
            ...props,
            id: router.query.id as string,
            date: dayjs(props.createdAt).format('YY-MM-DD'),
          }}
          deleteBoardItem={deleteBoardItem}
        />
      </div>
      {isLoading && <Loading />}
    </>
  );
}

export default Detail;

export const getServerSideProps = async ({ params }: { params: IBoardData }) => {
  const data = await getDoc(doc(dbService, 'board', `${params?.id}`));
  const contentData = await getDoc(doc(dbService, 'boardContent', `${params?.id}`));
  return { props: { ...data.data(), ...contentData.data() } };
};
