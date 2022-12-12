import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { IBoardData, IPressData } from 'types/dataTypes';

interface IDetailProps {
  href: string;
  text?: string;
}

interface ICardProps extends IBoardData {
  path: string;
}

export function RedirectDetail({ text = '더보기', href }: IDetailProps) {
  return (
    <LinkWrapper>
      <Link href={href}>
        <a>
          {text} <span>+</span>
        </a>
      </Link>
    </LinkWrapper>
  );
}

const LinkWrapper = styled.div`
  padding: 16px;
  width: fit-content;
  border-radius: 29px;
  font-size: 24px;
  font-weight: 500;
  background-color: transparent;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  span {
    margin-left: 8px;
  }

  @media screen and (max-width: 820px) {
    font-size: 14px;
    padding: 0;

    span {
      margin-left: 4px;
    }
  }
`;

export function Card({ thumbnailUrl, title, id, path, date }: ICardProps) {
  return (
    <CardWrapper>
      <Link href={`${path}/${id}`}>
        <a>
          <CardContent>
            <Image src={thumbnailUrl as string} layout="fill" alt={title} objectFit='cover' />
            <CardDate>{date}</CardDate>
          </CardContent>
          <CardText>{title}</CardText>
        </a>
      </Link>
    </CardWrapper>
  );
}

const CardContent = styled.div`
  width: 254px;
  height: 360px;
  position: relative;
  border: 1px solid #D9D9D9;
  transition: 0.3s;

  @media screen and (max-width: 820px) {
    width: 120px;
    height: 170px;
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
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 34px;
  width: 100px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 17px;
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
  font-size: 20px;
  line-height: 32px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;

  @media screen and (max-width: 820px) {
    font-size: 14px;
    line-height: 20px;
    width: 152px;
    height: 60px;
    -webkit-line-clamp: 3;
  }
`;

export function MovieCard({ thumbnailUrl, title, press, date, id }: IPressData) {
  return (
    <MovieCardWrapper>
      <MovieImageWrapper>
        <Image src={thumbnailUrl as string} layout="fill" alt={title} objectFit='cover' />
        <MovieBg>
          <IconPlay />
        </MovieBg>
      </MovieImageWrapper>
      <MovieTitle>{title}</MovieTitle>
      <MovieInfo>
        <li>{press}</li>
        <li>{date}</li>
      </MovieInfo>
    </MovieCardWrapper>
  );
}

const MovieCardWrapper = styled.div`
  color: #fff;
`;

const MovieImageWrapper = styled.div`
  width: 100%;
  height: 270px;
  position: relative;

  @media screen and (max-width: 820px) {
    height: 120px;
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
  width: 100px;
  aspect-ratio: 1;
  background: url('/images/moviePlay.png') no-repeat center/cover;

  @media screen and (max-width: 820px) {
    width: 50px;
  }
`;

const MovieTitle = styled.h4`
  font-size: 24px;
  line-height: 27px;
  margin: 22px 0 22px;
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
    font-size: 20px;
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
