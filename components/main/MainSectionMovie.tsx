import styled from 'styled-components';
import { RedirectDetail } from './Components';
import MovieSwiper from './MovieSwiper';
import { ISectMovieProps } from 'types/componentPropTypes';

function MainSectionMovie({ data }: ISectMovieProps) {
  return (
    <Wrapper>
      <MovieTop>
        <h4>
          <span>GDI</span> 영상관
        </h4>
        <RedirectDetail href="/notice/Movie" isDark={true} />
      </MovieTop>
      <MovieSwiper data={data} />
    </Wrapper>
  );
}

export default MainSectionMovie;

const Wrapper = styled.section`
  height: 646px;
  margin-top: 30px;
  position: relative;
  background-color: #1f4788;

  @media screen and (max-width: 820px) {
    height: auto;
  }
`;

const MovieTop = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 40px 60px 36px;
  color: #fff;
  max-width: 1300px;
  margin: auto;

  h4 {
    font-size: 30px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: -0.04em;
    padding-left: 20px;

    span {
      font-weight: 800;
    }
  }

  @media screen and (max-width: 820px) {
    padding: 22px 20px 20px;

    h4 {
      font-size: 18px;
      line-height: 20px;
      padding: 0;
    }
  }
`;
