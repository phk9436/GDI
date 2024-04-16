import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { downloadFile } from 'utils/downloadUtils';
import { IBoardItemProps } from 'types/componentPropTypes';

export function BoardItem({ data, path, category, deleteBoardItem }: IBoardItemProps) {
  const router = useRouter();

  const { id, thumbnailData, title, fileId, thumbnailId, fileName, date } = data;

  if (typeof thumbnailData !== 'string' || typeof id !== 'string') {
    return <></>;
  }

  const onClickNavigate = () => router.push(`${path}/${id}`);

  const redirectUpdate = () => {
    router.push(
      {
        pathname: `${path}/update`,
        query: {
          ...data,
          category,
        },
      },
      `${path}/update`,
    );
  };

  return (
    <li>
      <BoardItemWrapper>
        <BoardItemContainer onClick={onClickNavigate}>
          <BoardItemImage>
            <Image
              src={thumbnailData}
              layout="fill"
              alt={title}
              objectFit="cover"
            />
          </BoardItemImage>
          <BoardItemContents>
            <TitleWrapper>
              <p>{date}</p>
              <h3>{title}</h3>
            </TitleWrapper>
            <InfoWrapper>
              <ul>
                {'author' in data && (
                  <>
                    <li>
                      <p>저자</p>
                    </li>
                    <li>{data.author}</li>
                  </>
                )}
                {'forumDate' in data && (
                  <>
                    <li>
                      <p>일시</p>
                    </li>
                    <li>{data.forumDate}</li>
                  </>
                )}
              </ul>
              <ul>
                {'year' in data && (
                  <>
                    <li>
                      <p>발행년도</p>
                    </li>
                    <li>{data.year}</li>
                  </>
                )}
                {'place' in data && (
                  <>
                    <li>
                      <p>장소</p>
                    </li>
                    <li>{data.place}</li>
                  </>
                )}
              </ul>
            </InfoWrapper>
          </BoardItemContents>
        </BoardItemContainer>

        <BoardButtons>
          <AdminButtons>
            <AdminButton onClick={redirectUpdate}>수정</AdminButton>
            <AdminButton
              onClick={() => deleteBoardItem(id, fileId, thumbnailId)}
            >
              삭제
            </AdminButton>
          </AdminButtons>
          <ButtonLink onClick={onClickNavigate}>내용확인</ButtonLink>
          {fileId && (
            <ButtonDownLoad>
              <a onClick={() => downloadFile(fileId, category, fileName)}>
                자료 다운로드
              </a>
            </ButtonDownLoad>
          )}
        </BoardButtons>
      </BoardItemWrapper>
    </li>
  );
}

const BoardItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 60px;
  border-bottom: 1px solid #000;
  padding-bottom: 46px;
  margin-bottom: 46px;
  cursor: pointer;

  a {
    display: contents;
  }
`;

const BoardItemContainer = styled.div`
  display: contents;
`;

const BoardItemImage = styled.div`
  min-width: 210px;
  height: 297px;
  position: relative;
  border: 1px solid #d9d9d9;
`;

const BoardItemContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    width: 112px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1F4788;
    border-radius: 15px;
    color: #fff;
  }

  h3 {
    font-size: 30px;
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

const BoardButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12px;
  min-width: 186px;
  width: 186px;
  min-height: 100%;
  cursor: default;
`;

const AdminButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const AdminButton = styled.div`
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
