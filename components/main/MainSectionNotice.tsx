import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import { RedirectDetail } from './Components';
import { INoticeData, IPressData } from 'types/dataTypes';
import { getNotice } from 'utils/mainPageUtils';
import SceletonNotice from './SceletonNotice';

interface PageProps {
  data: IPressData[];
}

function MainSectionNotice({ data }: PageProps) {
  const [tapIndex, setTapIndex] = useState(0);
  const [isInit, setIsInit] = useState(true);
  const [noticeList, setNoticeList] = useState<INoticeData[]>([]);
  const [isPending, setIsPending] = useState(false);
  const taps = [
    ['언론보도', '/notice/Press'],
    ['공지사항', '/notice'],
  ];

  const onClickTap = async (i: number) => {
    setTapIndex(i);
    if (i === 1 && isInit) {
      setIsPending(true);
      const noticeData = await getNotice();
      setNoticeList(noticeData);
      setIsInit(false);
      setIsPending(false);
    }
  };

  return (
    <Wrapper>
      <TopWrapper>
        <h4>
          <span>GDI</span> 소식
        </h4>
        <Taps>
          {taps.map(([title, path], i) => (
            <Tap key={`tap${i}`} onClick={() => onClickTap(i)}>
              <p>{title}</p>
              {tapIndex === i && <LinkMarker />}
            </Tap>
          ))}
        </Taps>
      </TopWrapper>
      <List>
        {tapIndex === 0 && (
          <>
            {data?.map((e, i) => (
              <ListContent key={`Press${i}`}>
                <a href={e.pressUrl} target="_blank">
                  <h3>{e.title}</h3>
                  <ContentInfo>
                    <li key={`PressInfo${i}-1`}>{e.pressFrom}</li>
                    <li key={`PressInfo${i}-2`}>{e.pressDate}</li>
                  </ContentInfo>
                </a>
              </ListContent>
            ))}
            {data?.length >= 4 && (
              <li>
                <RedirectWrapper>
                  <RedirectDetail text={'더보기 +'} href={taps[tapIndex][1]} />
                </RedirectWrapper>
                <RedirectMo>
                  <Link href={taps[tapIndex][1]}>
                    <a>더보기 +</a>
                  </Link>
                </RedirectMo>
              </li>
            )}
          </>
        )}
        {tapIndex === 1 && (
          <>
            {noticeList.map((e, i) => (
              <ListContent key={`Notice${i}`}>
                <Link href={`${taps[tapIndex][1]}/${e.id}`}>
                  <a>
                    <h3>{e.title}</h3>
                    <p>{e.date}</p>
                  </a>
                </Link>
              </ListContent>
            ))}
            {noticeList.length >= 4 && (
              <li>
                <RedirectWrapper>
                  <RedirectDetail text={'더보기 +'} href={taps[tapIndex][1]} />
                </RedirectWrapper>
                <RedirectMo>
                  <Link href={taps[tapIndex][1]}>
                    <a>더보기 +</a>
                  </Link>
                </RedirectMo>
              </li>
            )}
          </>
        )}
        {isPending && <SceletonNotice />}
      </List>
    </Wrapper>
  );
}

export default MainSectionNotice;

const Wrapper = styled.div`
  width: 100%;
  max-width: calc(100% - 548px);

  @media screen and (max-width: 820px) {
    max-width: none;
  }
`;
const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #221e1f;
  margin-bottom: 16px;
  padding-left: 20px;
  color: #221e1f;

  h4 {
    font-size: 30px;
    font-weight: 900;
    line-height: 34px;
    letter-spacing: -0.04em;

    span {
      color: #1f4788;
    }
  }

  @media screen and (max-width: 820px) {
    width: calc(100% + 40px);
    margin-left: -20px;
    padding: 0 20px;
    height: auto;

    h4 {
      font-size: 18px;
    }
  }
`;

const Taps = styled.ul`
  display: flex;
  gap: 30px;

  @media screen and (max-width: 820px) {
    gap: 20px;
  }
`;

const Tap = styled.li`
  font-size: 24px;
  font-weight: 700;
  position: relative;
  cursor: pointer;

  p {
    z-index: 1;
    position: relative;
  }

  @media screen and (max-width: 820px) {
    font-size: 14px;
  }
`;

const LinkMarker = styled.div`
  position: absolute;
  left: 50%;
  bottom: calc(50% - 20px);
  transform: translateX(-50%);
  width: 116px;
  height: 20px;
  border-radius: 10px;
  background-color: #f58472;

  @media screen and (max-width: 820px) {
    width: 70px;
    height: 10px;
    top: calc(50%);
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContent = styled.li`
  width: 100%;
  margin-bottom: 16px;
  border-bottom: 1px solid #221e1f;
  padding-left: 20px;

  h3 {
    font-size: 20px;
    font-weight: 900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 18px;
    margin: 10px 0 14px;
  }

  @media screen and (max-width: 820px) {
    margin-bottom: 12px;
    padding-left: 0;

    h3 {
      font-size: 14px;
    }

    p {
      font-size: 14px;
      margin: 10px 0 12px;
    }

    &:nth-last-child(2) {
      margin-bottom: 24px;
    }
  }
`;

const ContentInfo = styled.ul`
  display: flex;
  align-items: center;
  margin: 10px 0 14px;

  li {
    font-size: 18px;
    display: flex;
    align-items: center;

    &:first-child::after {
      content: '';
      width: 1px;
      height: 20px;
      background-color: #000;
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

  @media screen and (max-width: 820px) {
    margin: 10px 0 12px;
  }
`;

const RedirectWrapper = styled.div`
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const RedirectMo = styled.div`
  font-size: 14px;
  font-weight: 700;
  display: none;

  @media screen and (max-width: 820px) {
    display: block;
  }
`;
