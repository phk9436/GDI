import styled from 'styled-components';
import { RedirectDetail } from './Components';
import MovieSwiper from './MovieSwiper';
import { IMovieData } from 'types/dataTypes';

interface PageProps {
  data: IMovieData[];
}

function MainSectionMovie({ data }: PageProps) {
  return (
    <Wrapper>
      <MovieBg />
      <MovieTop>
        <h4>
          <span>GDI</span> 영상관
        </h4>
        <RedirectDetail href="/notice/Movie" />
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

  @media screen and (max-width: 820px) {
    height: auto;
  }
`;

const MovieTop = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 50px 60px 36px;
  color: #221e1f;
  max-width: 1300px;
  margin: auto;

  h4 {
    font-size: 30px;
    font-weight: 800;
    line-height: 40px;
    letter-spacing: -0.04em;

    span {
      color: #1f4788;
    }
  }

  @media screen and (max-width: 820px) {
    padding: 22px 20px 30px;

    h4 {
      font-size: 18px;
      line-height: 20px;
    }
  }
`;

const MovieBg = styled.div`
  position: absolute;
  width: 100%;
  height: 414px;
  left: 0;
  bottom: 0;
  background-color: #1f4788;

  @media screen and (max-width: 820px) {
    height: 262px;
  }
`;
