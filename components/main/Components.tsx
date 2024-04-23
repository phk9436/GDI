import styled, { css } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { IMovieData } from 'types/dataTypes';
import { IRedirectDetailProps, ICardProps } from 'types/componentPropTypes';
import { IContent } from 'types/styleTypes';
import { IDarkCheck } from 'types/styleTypes';

export function RedirectDetail({ text = '바로가기', href, isDark = false }: IRedirectDetailProps) {
  return (
    <LinkWrapper isDark={isDark}>
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </LinkWrapper>
  );
}

const LinkWrapper = styled.div<IDarkCheck>`
  padding: 10px 20px;
  width: fit-content;
  border-radius: 29px;
  font-size: 16px;
  font-weight: 700;
  background-color: transparent;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  color: #000;
  transition: 0.5s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }

  span {
    margin-left: 8px;
  }

  ${({ isDark }) =>
    isDark &&
    css`
      color: #fff;
    `}

  @media screen and (max-width: 820px) {
    font-size: 12px;
    padding: 2px 8px;

    span {
      margin-left: 4px;
    }
  }
`;

export function Card({ thumbnailData, title, id, path, date }: ICardProps) {

  if (typeof thumbnailData !== 'string') {
    return <></>;
  }

  return (
    <CardWrapper>
      <Link href={`${path}/${id}`}>
        <a>
          <CardContent>
            <Image src={thumbnailData} layout="fill" alt={title} objectFit="cover" />
            <CardDate>{date}</CardDate>
          </CardContent>
          <CardText>{title}</CardText>
        </a>
      </Link>
    </CardWrapper>
  );
}

const CardContent = styled.div`
  width: 222px;
  height: 314px;
  position: relative;
  border: 1px solid #d9d9d9;
  transition: 0.3s;

  @media screen and (max-width: 820px) {
    width: 140px;
    aspect-ratio: 224/314;
    height: auto;
    margin: auto;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover ${CardContent} {
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const CardDate = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  background-color: rgba(34, 30, 31, 0.3);
  border-radius: 34px;
  width: 83px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  letter-spacing: -0.04em;

  @media screen and (max-width: 820px) {
    left: 8px;
    top: 8px;
    width: 70px;
    height: 22px;
    font-size: 12px;
  }
`;

const CardText = styled.p`
  width: 100%;
  max-width: 222px;
  height: 64px;
  margin-top: 20px;
  font-size: 18px;
  line-height: 32px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;

  @media screen and (max-width: 820px) {
    font-size: 14px;
    line-height: 20px;
    width: 140px;
    height: 60px;
    -webkit-line-clamp: 3;
    margin-top: 12px;
  }
`;

export function MovieCard({ ytbDate, title, ytbFrom, ytbThumbnail }: IMovieData) {
  if (typeof ytbThumbnail !== 'string') {
    return <></>;
  }

  return (
    <MovieCardWrapper>
      <MovieImageWrapper>
        <Image src={ytbThumbnail} layout="fill" alt={title} objectFit="cover" />
        <MovieBg>
          <IconPlay />
        </MovieBg>
      </MovieImageWrapper>
      <MovieTitle>{title}</MovieTitle>
      <MovieInfo>
        <li>{ytbFrom}</li>
        <li>{ytbDate}</li>
      </MovieInfo>
    </MovieCardWrapper>
  );
}

const MovieCardWrapper = styled.div`
  color: #fff;
`;

const MovieImageWrapper = styled.div`
  width: 100%;
  height: 280px;
  position: relative;

  @media screen and (max-width: 820px) {
    height: auto;
    aspect-ratio: 580/314;
  }
`;

const MovieBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: 0.5s;

  &:hover {
    opacity: 0;
  }
`;

const IconPlay = styled.div`
  width: 80px;
  aspect-ratio: 1;
  background: url('/images/moviePlay.png') no-repeat center/cover;

  @media screen and (max-width: 820px) {
    width: 50px;
  }
`;

const MovieTitle = styled.h4`
  font-size: 20px;
  line-height: 24px;
  margin: 22px 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 820px) {
    margin: 16px 0 6px;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }
`;

const MovieInfo = styled.ul`
  display: flex;

  li {
    font-size: 18px;
    font-weight: 300;
    display: flex;
    align-items: center;

    &:first-child::after {
      content: '';
      width: 1px;
      height: 20px;
      background-color: #fff;
      display: block;
      margin: 0 20px;

      @media screen and (max-width: 820px) {
        margin: 0 8px;
        height: 16px;
      }
    }

    @media screen and (max-width: 820px) {
      font-size: 14px;
    }
  }
`;

export function Content({ category }: { category: string }) {
  return (
    <li>
      <ContentBox content={category}>
        <ContentCircle>
          <ContentCircleInner />
        </ContentCircle>
        <ContentCircle>
          <ContentCircleInner />
        </ContentCircle>
        <p>
          {category === 'board' ? (
            <>
              참여를 통해 <br />
              경기 북부 지역의 발전을 도와주세요
            </>
          ) : (
            <>
              경기북부지역발전연구원의 <br />
              인사와 포부를 확인해 보세요
            </>
          )}
        </p>
      </ContentBox>
      <ContentTitle>
        {category === 'board' ? (
          <>
            연구제안
            <RedirectDetail href="/board" />
          </>
        ) : (
          <>
            GDI 소개
            <RedirectDetail href="/intro" />
          </>
        )}
      </ContentTitle>
    </li>
  );
}

const ContentCircle = styled.div`
  width: 130px;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 0;
  top: 36px;

  @media screen and (max-width: 820px) {
    top: 18px;
    width: 34%;
  }
`;

const ContentCircleInner = styled.div`
  width: 60px;
  aspect-ratio: 1;
  border-radius: 50%;

  @media screen and (max-width: 820px) {
    width: 44%;
  }
`;

const ContentBox = styled.div<IContent>`
  height: 216px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid #d9d9d9;
  border-bottom: none;
  position: relative;
  overflow: hidden;

  p {
    font-size: 20px;
    line-height: 30px;
    font-weight: 500;
    padding-left: 28px;
    padding-bottom: 18px;
    z-index: 1;
  }

  ${ContentCircle} {
    &:first-child {
      left: 0;
      transform: translateX(-50%);
    }

    &:nth-child(2) {
      left: 110px;

      @media screen and (max-width: 820px) {
        left: 42%;
        transform: translateX(-50%);
      }
    }
  }

  @media screen and (max-width: 820px) {
    height: auto;
    aspect-ratio: 280/144;
    letter-spacing: -0.01em;
    background-size: 28%;
    background-position: top 24px right 20px;

    p {
      font-size: 16px;
      line-height: 26px;
      padding-left: 18px;
      padding-bottom: 8px;
    }
  }

  ${({ content }) =>
    content === 'board'
      ? css`
          background: #ffc20c url('/images/iconBoard.png') no-repeat top 32px right 24px/124px 124px;

          p {
            color: #5b5859;
          }

          ${ContentCircle} {
            background-color: #ffb600;
          }

          ${ContentCircleInner} {
            background-color: #ffc20c;
          }
        `
      : css`
          background: #57bd84 url('/images/iconIntro.png') no-repeat top 32px right 30px/124px 124px;

          p {
            color: #fff;
          }

          ${ContentCircle} {
            background-color: #44b773;
          }

          ${ContentCircleInner} {
            background-color: #57bd84;
          }
        `}
`;

const ContentTitle = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: #1f4788;
  background-color: #f6f6f6;
  padding: 0 28px;
  font-size: 30px;
  font-weight: 800;
  border: 1px solid #d9d9d9;
  border-top: none;

  @media screen and (max-width: 820px) {
    height: 62px;
    font-size: 18px;
    padding: 0 18px;
  }
`;
