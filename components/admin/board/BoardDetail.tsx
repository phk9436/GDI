import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { IBoardDetailPropsWithDelete } from 'types/pagePropTypes';

const PostViewer = dynamic(() => import('components/viewer/Viewer'), {
  ssr: false,
});

function BoardDetail({ data, deleteBoardItem }: IBoardDetailPropsWithDelete) {

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
              <Button onClick={() => deleteBoardItem(data.id as string)}>삭제</Button>
            </Buttons>
          </DetailFlex>
        </DetailTopContainer>
      </DetailTop>
      <DetailBody>
        <ContentWrapper>
          <PostViewer content={data.content as string} />
        </ContentWrapper>
        <Link href="/admin/board">
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
  max-width: 1300px;
  padding: 56px 60px 140px;
  margin: auto;
`;

const DetailTop = styled.div`
  margin: 0 0 36px;
  display: flex;
  align-items: flex-end;
  gap: 60px;
  border-bottom: 1px solid #000000;
  padding-bottom: 47px;
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
    background: #1F4788;
    border-radius: 15px;
    color: #fff;
    font-size: 18px;
  }

  h3 {
    font-size: 36px;
    font-weight: 700;
    line-height: 50px;
    height: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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
        font-weight: 800;
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
`;

const DetailFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Buttons = styled.div`
  display: flex;
  gap: 4px;
  min-width: 186px;
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
`;
