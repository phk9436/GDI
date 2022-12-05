import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

interface IDetailProps {
  href: string;
}

interface ICardProps {
  date: string;
  img: string;
  title: string;
}

export function RedirectDetail({ href }: IDetailProps) {
  return (
    <LinkWrapper>
      <Link href={href}>
        <a>
          더보기 <span>+</span>
        </a>
      </Link>
    </LinkWrapper>
  );
}

const LinkWrapper = styled.div`
  padding: 16px;
  width: 130px;
  height: 57px;
  border-radius: 29px;
  font-size: 24px;
  font-weight: 700;
  background-color: #fff;
  transition: 0.3s;
  cursor: pointer;

  a {
    display: flex;
    justify-content: space-between;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 820px) {
    width: 56px;
    height: 20px;
    font-size: 14px;
    padding: 0;
  }
`;

export function Card({ date, img, title }: ICardProps) {
  return (
    <CardWrapper>
      <CardContent>
        <Image src={img} layout="fill" alt={title} />
        <CardDate>{date}</CardDate>
      </CardContent>
      <CardText>{title}</CardText>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContent = styled.div`
  width: 254px;
  height: 360px;
  position: relative;

  @media screen and (max-width: 820px) {
    width: 120px;
    height: 170px;
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
