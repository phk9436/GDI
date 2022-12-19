import styled, { css } from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { IBoardData, IForumData } from 'types/dataTypes';
import { useRouter } from 'next/router';
import { downloadFile } from 'utils/downloadUtils';

interface IBoardItemProps {
  data: IBoardData | IForumData;
  path: string;
  category: string;
}

export function BoardItem({ data, path, category }: IBoardItemProps) {
  const router = useRouter();

  const onClickNavigate = () => router.push(`${path}/${data.id}`);

  return (
    <li>
      <BoardItemWrapper>
        <BoardItemContainer onClick={onClickNavigate}>
          <BoardItemImage>
            <Image
              src={data.thumbnailData as string}
              layout="fill"
              alt={data.title}
              objectFit="cover"
            />
          </BoardItemImage>
          <BoardItemContents>
            <TitleWrapper>
              <p>{data.date}</p>
              <h3>{data.title}</h3>
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
          <ButtonLink onClick={onClickNavigate}>내용확인</ButtonLink>
          {data.fileId && (
            <ButtonDownLoad>
              <a onClick={() => downloadFile(data.fileId, category, data.fileName)}>
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

  @media screen and (max-width: 820px) {
    flex-direction: column;
    gap: 6px;
    padding-bottom: 10px;
    border: none;
    margin-bottom: 0;
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

  @media screen and (max-width: 820px) {
    min-width: auto;
    width: 100%;
    aspect-ratio: 132/187;
    height: auto;
  }
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
    background: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    color: #fff;
    font-size: 18px;
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
  }

  @media screen and (max-width: 820px) {
    gap: 8px;

    p {
      width: 70px;
      height: 22px;
      font-size: 11px;
    }

    h3 {
      font-size: 12px;
      font-weight: 700;
      line-height: 16px;
      height: 32px;
      margin-bottom: 10px;
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
    gap: 4px;
    margin-top: 6px;

    ul {
      li {
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
