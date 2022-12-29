import styled from 'styled-components';
import { INoticeData } from 'types/dataTypes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { downloadFile } from 'utils/downloadUtils';

interface INoticeItemProps {
  data: INoticeData;
  category: string;
}

function NoticeItem({ data, category }: INoticeItemProps) {
  const router = useRouter();

  return (
    <li>
      <NoticeItemWrapper>
        <Link href={`/notice/${data.id}`}>
          <a>
            <NoticeItemContainer>
              <h3>{data.title}</h3>
              <InfoWrapper>
                <Info>
                  <Title>작성일자</Title>
                  <Detail>{data.date}</Detail>
                </Info>
              </InfoWrapper>
            </NoticeItemContainer>
          </a>
        </Link>

        <NoticeButtons>
          {data.fileId && (
            <ButtonDownLoad>
              <a onClick={() => downloadFile(data.fileId, category, data.fileName)}>
                자료 다운로드
              </a>
            </ButtonDownLoad>
          )}
          <Link href={`/notice/${data.id}`}>
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
`;

const NoticeItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  max-width: calc(100% - 226px);
  width: 100%;

  h3 {
    font-size: 36px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
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
  }
`;
const Detail = styled.div``;

const NoticeButtons = styled.div`
  min-width: 186px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
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
