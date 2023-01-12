import styled, { css } from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';

interface IBreadCrumbProps {
  category: string[];
  tap: string[][];
}

interface IPaginationProps {
  currentPageNum: number;
  totalPageNum: number;
  getNextPage: () => void;
  getPrevPage: () => void;
  isDeleted?: boolean;
}

export function BreadCrumb({ category, tap }: IBreadCrumbProps) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onClickMenuButton = () => setIsMenuOpened((state) => !state);
  return (
    <BreadCrumbWrapper>
      <BreadCrumbContents>
        <BreadCrumbTitle>
          <h2>{category[0]}</h2>
          <BreadCrumbButton onClick={onClickMenuButton} tapLength={tap.length} />
        </BreadCrumbTitle>
        <p>{category[1]}</p>
        <Menu tap={tap} isOpened={isMenuOpened}>
          {tap.map((e, i) => (
            <li key={`titleMenu${i}`}>
              <Link href={e[2]}>
                <a>{e[0]}</a>
              </Link>
            </li>
          ))}
        </Menu>
      </BreadCrumbContents>
    </BreadCrumbWrapper>
  );
}

const BreadCrumbWrapper = styled.div`
  height: 150px;
  background-color: #1f4788;

  @media screen and (max-width: 820px) {
    height: 50px;
  }
`;

const BreadCrumbContents = styled.div`
  max-width: 1300px;
  height: 100%;
  padding: 0 70px;
  display: flex;
  align-items: center;
  margin: auto;
  position: relative;

  p {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }

  @media screen and (max-width: 820px) {
    padding: 0 20px;
    p {
      display: none;
    }
  }
`;

const BreadCrumbTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;

  h2 {
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
  }

  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 36px;
    margin: 0 20px 0 4px;
    background-color: #fff;
  }

  @media screen and (max-width: 820px) {
    gap: 14px;

    h2 {
      font-size: 18px;
      font-weight: 700;
    }

    &::after {
      content: none;
    }
  }
`;

const BreadCrumbButton = styled.div<{ tapLength: number }>`
  width: 26px;
  height: 26px;
  background: url('/images/arrowBottom.png') no-repeat center/contain;
  cursor: pointer;

  ${({ tapLength }) =>
    tapLength <= 1 &&
    css`
      display: none;
    `}

  @media screen and (max-width: 820px) {
    width: 16px;
    height: 10px;
  }
`;

const Menu = styled.ul<{ tap: string[][]; isOpened: boolean }>`
  width: 300px;
  position: absolute;
  top: 100%;
  left: 30px;
  z-index: 2;
  height: 0;
  transition: 0.5s;
  overflow: hidden;

  ${({ tap, isOpened }) =>
    isOpened &&
    css`
      height: ${tap.length * 75}px;

      @media screen and (max-width: 820px) {
        height: ${tap.length * 42}px;
      }
    `}

  li {
    width: 100%;
    height: 75px;
    background-color: #a4a4a4;
    font-size: 24px;
    font-weight: 500;
    color: #fff;

    a {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #000;
    }

    @media screen and (max-width: 820px) {
      height: 42px;
      font-size: 16px;
    }
  }

  @media screen and (max-width: 820px) {
    width: 145px;
    left: 0;
  }
`;

export function Pagination({
  currentPageNum,
  totalPageNum,
  getNextPage,
  getPrevPage,
  isDeleted = false,
}: IPaginationProps) {
  return (
    <PaginationWrapper>
      <PaginationComponents>
        {currentPageNum > 1 && <PrevArrow onClick={getPrevPage} isDeleted={isDeleted} />}
        {`${currentPageNum} / ${totalPageNum}`}
        {currentPageNum < totalPageNum && <NextArrow onClick={getNextPage} isDeleted={isDeleted} />}
      </PaginationComponents>
      <p>현재 / 전체</p>
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  margin-top: 66px;

  p {
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
  }
`;

const PaginationComponents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin: auto;
  font-size: 24px;
`;

const PrevArrow = styled.div<{ isDeleted: boolean }>`
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url('/images/pageArrowPrev.png') no-repeat center/8px 12px;
  position: absolute;
  left: calc(50% - 60px);
  transform: translateX(-50%);

  ${({ isDeleted }) =>
    isDeleted &&
    css`
      opacity: 0.5;
      cursor: default;
    `}
`;

const NextArrow = styled.div<{ isDeleted: boolean }>`
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url('/images/pageArrowNext.png') no-repeat center/8px 12px;
  position: absolute;
  right: calc(50% - 60px);
  transform: translateX(50%);

  ${({ isDeleted }) =>
    isDeleted &&
    css`
      opacity: 0.5;
      cursor: default;
    `}
`;
