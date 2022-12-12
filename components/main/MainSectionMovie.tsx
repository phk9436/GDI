import styled from 'styled-components';
import { RedirectDetail } from './Components';
import MovieSwiper from './MovieSwiper';
import { mobileCheck } from 'atoms/layout';
import { useRecoilValue } from 'recoil';

const DUMMY_DATA = [
  {
    id: '1',
    date: '22-09-22',
    title: `여야 의원 64명 뭉쳤다…'GTX 플러스' 공론화 시동`,
    thumbnailUrl: '/images/cardDummy.png',
    press: 'OBS',
  },
  {
    id: '2',
    date: '22-09-22',
    title: `여야 의원 64명 뭉쳤다…'GTX 플러스' 공론화 시동`,
    thumbnailUrl: '/images/cardDummy.png',
    press: 'OBS',
  },
  {
    id: '3',
    date: '22-09-22',
    title: `여야 의원 64명 뭉쳤다…'GTX 플러스' 공론화 시동`,
    thumbnailUrl: '/images/cardDummy.png',
    press: 'OBS',
  },
  {
    id: '4',
    date: '22-09-22',
    title: `여야 의원 64명 뭉쳤다…'GTX 플러스' 공론화 시동`,
    thumbnailUrl: '/images/cardDummy.png',
    press: 'OBS',
  },
  {
    id: '5',
    date: '22-09-22',
    title: `여야 의원 64명 뭉쳤다…'GTX 플러스' 공론화 시동`,
    thumbnailUrl: '/images/cardDummy.png',
    press: 'OBS',
  },
  {
    id: '6',
    date: '22-09-22',
    title: `여야 의원 64명 뭉쳤다…'GTX 플러스' 공론화 시동`,
    thumbnailUrl: '/images/cardDummy.png',
    press: 'OBS',
  },
];

function MainSectionMovie() {
  const isMobile = useRecoilValue(mobileCheck);

  return (
    <Wrapper>
      <MovieTop>
        <h4>GDI 영상관</h4>
        {!isMobile && (
          <RedirectWrapper>
            <RedirectDetail href="/notice/Movie" />
          </RedirectWrapper>
        )}
      </MovieTop>
      <MovieSwiper data={DUMMY_DATA} />
    </Wrapper>
  );
}

export default MainSectionMovie;

const Wrapper = styled.section`
  height: 646px;
  background-color: #1f4788;
  margin-top: 30px;

  @media screen and (max-width: 820px) {
    height: 374px;
  }
`;

const MovieTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 60px 36px;
  color: #fff;
  position: relative;
  max-width: 1440px;
  margin: auto;

  h4 {
    font-size: 36px;
    line-height: 40px;
    letter-spacing: 0.04em;
  }

  @media screen and (max-width: 820px) {
    padding: 22px 0 30px;

    h4 {
      font-size: 18px;
      line-height: 20px;
    }
  }
`;

const RedirectWrapper = styled.div`
  position: absolute;
  right: 60px;
`;
