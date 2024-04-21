import styled from 'styled-components';
import { IBoardData } from 'types/dataTypes';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import ConfirmModal from 'components/ConfirmModal';
import { useRecoilState } from 'recoil';
import { confirmOpen } from 'atoms/layout';
import { useState } from 'react';
import { IBoardItemProps } from 'types/pagePropTypes';

function BoardItem({ data }: IBoardItemProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isOpened, setIsOpened] = useRecoilState(confirmOpen);
  const [modalId, setModalId] = useState('');

  const { title, author, date, id } = data;

  if (typeof id !== 'string') {
    return <></>;
  }

  const checkPassword = (id: string) => {
    if (password !== data.password) {
      toast.error('비밀번호가 맞지 않습니다.');
      setPassword('');
      setIsOpened(false);
      return;
    }
    setPassword('');
    router.push(
      {
        pathname: `/board/${id}`,
        query: {
          isvalid: true,
        },
      },
      `/board/${id}`,
    );
  };

  const onClickLink = () => {
    setModalId(id);
    setIsOpened(true);
  };

  return (
    <>
      <li>
        <BoardItemWrapper onClick={onClickLink}>
          <BoardItemContainer>
            <h3>{title}</h3>
            <InfoWrapper>
              <Info>
                <Title>작성자</Title>
                <Detail>{author}</Detail>
              </Info>
              <Info>
                <Title>작성일자</Title>
                <Detail>{date}</Detail>
              </Info>
            </InfoWrapper>
          </BoardItemContainer>

          <BoardButtons>
            <ButtonLink>상세내용확인</ButtonLink>
          </BoardButtons>
        </BoardItemWrapper>
      </li>
      {isOpened && modalId === id && (
        <ConfirmModal
          password={password}
          setPassword={setPassword}
          checkPassword={() => checkPassword(id)}
        />
      )}
    </>
  );
}

export default BoardItem;

const BoardItemWrapper = styled.div`
  padding-bottom: 36px;
  margin-bottom: 46px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  position: relative;
  cursor: pointer;

  & > a {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 820px) {
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
`;

const BoardItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;

  h3 {
    font-size: 30px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  @media screen and (max-width: 820px) {
    gap: 12px;

    h3 {
      font-size: 14px;
      -webkit-line-clamp: 3;
    }
  }
`;

const InfoWrapper = styled.ul`
  display: flex;
  gap: 82px;
  margin-bottom: 10px;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    gap: 4px;
    margin: 0;
  }
`;
const Info = styled.li`
  display: flex;
  align-items: center;
  font-size: 20px;

  @media screen and (max-width: 820px) {
    font-size: 12px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 28px;
    background-color: #000;
    margin: 0 18px;

    @media screen and (max-width: 820px) {
      height: 12px;
      margin: 0 6px;
    }
  }
`;
const Detail = styled.div``;

const BoardButtons = styled.div`
  min-width: 186px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  position: absolute;
  right: 0;
  bottom: 36px;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const ButtonLink = styled.div`
  height: 50px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  color: #fff;
  transition: 0.3s;
  cursor: pointer;
  background: #1f4788 url('/images/lock.png') no-repeat center right 20px/28px 28px;

  &:hover {
    background-color: #092d68;
  }
`;
