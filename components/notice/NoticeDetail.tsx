import styled from 'styled-components';
import { INoticeData } from 'types/dataTypes';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { downloadFile } from 'utils/downloadUtils';

interface IBoardDetailProps {
  data: INoticeData;
}

const PostViewer = dynamic(() => import('components/viewer/Viewer'), {
  ssr: false,
});

function NoticeDetail({ data }: IBoardDetailProps) {
  return (
    <Wrapper>
      <DetailTop>
        <DetailTopContainer>
          <p>{data.date}</p>
          <h3>{data.title}</h3>
          <InfoWrapper>
            <ul>
              <li>
                <p>작성일자</p>
              </li>
              <li>{data.date}</li>
            </ul>
          </InfoWrapper>
        </DetailTopContainer>
        <DetailButtonWrapper>
          {data.fileId && (
            <ButtonDownLoad>
              <a onClick={() => downloadFile(data.fileId, 'notice', data.fileName)}>
                자료 다운로드
                <img src="/images/iconDownloadMo.png" alt="Download" />
              </a>
            </ButtonDownLoad>
          )}
        </DetailButtonWrapper>
      </DetailTop>
      <DetailBody>
        <ContentWrapper>
          <PostViewer content={data.content as string} />
        </ContentWrapper>
        <Link href="/notice">
          <a>
            <ButtonBack>목록으로 이동</ButtonBack>
          </a>
        </Link>
      </DetailBody>
    </Wrapper>
  );
}

export default NoticeDetail;

const Wrapper = styled.div`
  max-width: 1300px;
  padding: 56px 60px 140px;
  margin: auto;

  @media screen and (max-width: 820px) {
    padding: 40px 20px 90px;
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
    margin: 0 0 12px;
    padding-bottom: 12px;
    flex-direction: column;
    gap: 20px;
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
    background: #1F4788;
    border-radius: 15px;
    color: #fff;

    @media screen and (max-width: 820px) {
      width: 70px;
      height: 22px;
      font-size: 11px;
    }
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

const DetailButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 186px;
  width: 186px;
  margin-top: auto;

  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

const ButtonDownLoad = styled.div`
  height: 50px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  background: #000 url('/images/iconDownload.png') no-repeat center right 20px/28px 28px;

  a {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 50px;

    img {
      display: none;
    }
  }

  @media screen and (max-width: 820px) {
    height: 30px;
    padding: 0;
    background: #000;

    a {
      line-height: 30px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      img {
        display: inline;
        width: 14px;
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
  font-weight: 700;
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
