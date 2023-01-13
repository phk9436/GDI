import styled, { css } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { ILabData, IMovieData } from 'types/dataTypes';

interface IDetailProps {
  href: string;
  text?: string;
  isDark?: boolean;
}

interface ICardProps extends ILabData {
  path: string;
}

export function RedirectDetail({ text = '바로가기', href, isDark = false }: IDetailProps) {
  return (
    <LinkWrapper isDark={isDark}>
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </LinkWrapper>
  );
}

const LinkWrapper = styled.div<{ isDark: boolean }>`
  padding: 10px 20px;
  width: fit-content;
  border-radius: 29px;
  font-size: 16px;
  font-weight: 700;
  background-color: transparent;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  color: #000;
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
  return (
    <CardWrapper>
      <Link href={`${path}/${id}`}>
        <a>
          <CardContent>
            <Image src={thumbnailData as string} layout="fill" alt={title} objectFit="cover" />
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
  return (
    <MovieCardWrapper>
      <MovieImageWrapper>
        <Image src={ytbThumbnail as string} layout="fill" alt={title} objectFit="cover" />
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
  margin: 22px 0 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 820px) {
    height: 40px;
    margin: 16px 0 10px;
    white-space: normal;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const MovieInfo = styled.ul`
  display: flex;

  li {
    font-size: 18px;
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
