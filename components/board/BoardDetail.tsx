import styled from 'styled-components';
import { IBoardData } from 'types/dataTypes';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IBoardDetailProps {
  data: IBoardData;
  deleteBoardItem: (id: string) => Promise<void>;
}

const PostViewer = dynamic(() => import('components/viewer/Viewer'), {
  ssr: false,
});

function BoardDetail({ data, deleteBoardItem }: IBoardDetailProps) {
  const router = useRouter();

  const redirectUpdate = () => {
    if (prompt('비밀번호를 다시 한 번 입력해주세요.') !== data.password) {
      alert('비밀번호가 맞지 않습니다.');
      return;
    }
    router.push(
      {
        pathname: '/board/update',
        query: {
          ...data,
        },
      },
      '/board/update',
    );
  };

  return (
    <Wrapper>
      <DetailTop>
        <DetailTopContainer>
          <p>{data.date}</p>
          <h3>{data.title}</h3>
          <DetailFlex>
            <InfoWrapper>
              <ul>
                <li>
                  <p>작성자</p>
                </li>
                <li>{data.author}</li>
              </ul>
              <ul>
                <li>
                  <p>이메일</p>
                </li>
                <li>{data.email}</li>
              </ul>
            </InfoWrapper>
            <Buttons>
              <Button onClick={redirectUpdate}>수정</Button>
              <Button onClick={() => deleteBoardItem(data.id as string)}>삭제</Button>
            </Buttons>
          </DetailFlex>
        </DetailTopContainer>
      </DetailTop>
      <DetailBody>
        <ContentWrapper>
          <PostViewer content={data.content as string} />
        </ContentWrapper>
        <Link href="/board">
          <a>
            <ButtonBack>목록으로 이동</ButtonBack>
          </a>
        </Link>
      </DetailBody>
    </Wrapper>
  );
}

export default BoardDetail;

const Wrapper = styled.div`
  max-width: 1440px;
  padding: 56px 60px 140px;
  margin: auto;

  @media screen and (max-width: 820px) {
    padding: 20px;
  }
`;

const DetailTop = styled.div`
  margin: 0 0 36px;
  display: flex;
  align-items: flex-end;
  gap: 60px;
  border-bottom: 1px solid #000000;
  padding-bottom: 47px;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    gap: 20px;
    margin: 0 0 12px;
    padding-bottom: 12px;
  }
`;

const DetailTopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > p {
    width: 112px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    color: #fff;
    font-size: 18px;

    @media screen and (max-width: 820px) {
      width: 70px;
      height: 22px;
      font-size: 11px;
    }
  }

  h3 {
    font-size: 36px;
    font-weight: 500;
    line-height: 50px;
    height: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    @media screen and (max-width: 820px) {
      font-size: 16px;
      font-weight: 700;
      line-height: 20px;
      height: 40px;
      -webkit-line-clamp: 2;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ul {
    display: flex;
    align-items: center;

    li {
      font-size: 18px;

      p {
        width: 74px;
      }

      &:first-child {
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
        }
      }
    }
  }

  @media screen and (max-width: 820px) {
    gap: 8px;

    ul li {
      font-size: 12px;

      p {
        width: fit-content;
      }

      &:first-child::after {
        height: 12px;
        margin: 0 6px;
      }
    }
  }
`;

const DetailBody = styled.div``;

const ContentWrapper = styled.div`
  padding: 28px;
  background-color: #f7f7f7;
  min-height: 400px;
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
  color: #5b5859;

  @media screen and (max-width: 820px) {
    padding: 15px;
    font-size: 12px;
    line-height: 20px;
  }
`;

const ButtonBack = styled.div`
  width: 186px;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 22px;
  padding-right: 26px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background: #1f4788 url('/images/arrowLinkBack.png') no-repeat left 20px center/28px 28px;
  cursor: pointer;

  @media screen and (max-width: 820px) {
    width: 160px;
    height: 30px;
    margin-top: 20px;
    padding-right: 30px;
    font-size: 14px;
    background: #1f4788 url('/images/arrowLinkBackMo.png') no-repeat left 15px center/19px 14px;
  }
`;

const DetailFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 4px;
  min-width: 186px;

  @media screen and (max-width: 820px) {
    min-width: 180px;
  }
`;

const Button = styled.div`
  width: 100%;
  height: 50px;
  background-color: #c7c7c7;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #fff;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #a4a4a4;
  }

  @media screen and (max-width: 820px) {
    height: 36px;
    font-size: 14px;
  }
`;
