import styled from 'styled-components';
import Link from 'next/link';
import { downloadFile } from 'utils/downloadUtils';
import { INoticeItemProps } from 'types/componentPropTypes';

function NoticeItem({ data, category }: INoticeItemProps) {
  const { id, title, date, fileId, fileName } = data;
  return (
    <li>
      <NoticeItemWrapper>
        <Link href={`/notice/${id}`}>
          <a>
            <NoticeItemContainer>
              <h3>{title}</h3>
              <InfoWrapper>
                <Info>
                  <Title>작성일자</Title>
                  <Detail>{date}</Detail>
                </Info>
              </InfoWrapper>
            </NoticeItemContainer>
          </a>
        </Link>

        <NoticeButtons>
          {fileId && (
            <ButtonDownLoad>
              <a onClick={() => downloadFile(fileId, category, fileName)}>
                자료 다운로드
              </a>
            </ButtonDownLoad>
          )}
          <Link href={`/notice/${id}`}>
            <a>
              <ButtonLink>상세내용확인</ButtonLink>
            </a>
          </Link>
        </NoticeButtons>
      </NoticeItemWrapper>
    </li>
  );
}

export default NoticeItem;

const NoticeItemWrapper = styled.div`
  padding-bottom: 35px;
  margin-bottom: 46px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  gap: 40px;

  a {
    display: contents;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 820px) {
    flex-direction: column;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
`;

const NoticeItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  max-width: calc(100% - 226px);
  width: 100%;

  h3 {
    font-size: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 820px) {
    max-width: none;
    gap: 12px;

    h3 {
      font-size: 14px;
      margin-bottom: 0;
      white-space: wrap;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
`;

const InfoWrapper = styled.ul`
  display: flex;
  gap: 82px;
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

const NoticeButtons = styled.div`
  min-width: 186px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;

  @media screen and (max-width: 820px) {
    display: none;
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
  background: #1f4788 url('/images/arrowLink.png') no-repeat center right 20px/28px 28px;

  &:hover {
    background-color: #092d68;
  }
`;
