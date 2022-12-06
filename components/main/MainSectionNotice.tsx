import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import { RedirectDetail } from './Components';

const DUMMY_DATA_PRESS = [
  {
    title: `여야 의원 64명 뭉쳤다…'GTX 플러스' 공론화 시동`,
    press: 'OBS',
    date: '2022-09-12',
  },
  {
    title: `여야 의원 64명 뭉쳤다…'GTX 플러스' 공론화 시동`,
    press: 'OBS',
    date: '2022-09-12',
  },
  {
    title: `여야 의원 64명 뭉쳤다…'GTX 플러스' 공론화 시동`,
    press: 'OBS',
    date: '2022-09-12',
  },
  {
    title: `여야 의원 64명 뭉쳤다…'GTX 플러스' 공론화 시동`,
    press: 'OBS',
    date: '2022-09-12',
  },
];

const DUMMY_DATA_NOTICE = [
  {
    title: `경기도 탄소중립을 위한 '정의로운 전환' 플랫폼 구축 기초연구`,
    date: '2022-09-12',
  },
  {
    title: `경기도 탄소중립을 위한 '정의로운 전환' 플랫폼 구축 기초연구`,
    date: '2022-09-12',
  },
  {
    title: `경기도 탄소중립을 위한 '정의로운 전환' 플랫폼 구축 기초연구`,
    date: '2022-09-12',
  },
  {
    title: `경기도 탄소중립을 위한 '정의로운 전환' 플랫폼 구축 기초연구`,
    date: '2022-09-12',
  },
];

function MainSectionNotice() {
  const [tapIndex, setTapIndex] = useState(0);
  const taps = [
    ['언론보도', '/notice/Press'],
    ['공지사항', '/notice'],
  ];

  const onClickTap = (i: number) => setTapIndex(i);

  return (
    <Wrapper>
      <TopWrapper>
        <h4>GDI 소식</h4>
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
        {tapIndex === 0 &&
          DUMMY_DATA_PRESS.map((e, i) => (
            <ListContent key={`Press${i}`}>
              <Link href={taps[tapIndex][1]}>
                <a>
                  <h3>{e.title}</h3>
                  <ContentInfo>
                    <li key={`PressInfo${i}-1`}>{e.press}</li>
                    <li key={`PressInfo${i}-2`}>{e.date}</li>
                  </ContentInfo>
                </a>
              </Link>
            </ListContent>
          ))}
        {tapIndex === 1 &&
          DUMMY_DATA_NOTICE.map((e, i) => (
            <ListContent key={`Notice${i}`}>
              <Link href={taps[tapIndex][1]}>
                <a>
                  <h3>{e.title}</h3>
                  <p>{e.date}</p>
                </a>
              </Link>
            </ListContent>
          ))}
        <li>
          <RedirectDetail href={taps[tapIndex][1]} />
        </li>
      </List>
    </Wrapper>
  );
}

export default MainSectionNotice;

const Wrapper = styled.div`
  width: 100%;
`;
const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 91px;
  border-bottom: 1px solid #000;
  margin-bottom: 20px;

  h4 {
    font-size: 36px;
    line-height: 40px;
    font-weight: 700;
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
  font-weight: 500;
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
  margin-bottom: 24px;
  border-bottom: 1px solid #000;

  h3 {
    font-size: 24px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 20px;
    margin: 26px 0 30px;
  }

  @media screen and (max-width: 820px) {
    margin-bottom: 12px;

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
  margin: 26px 0 30px;

  li {
    font-size: 20px;
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
