import styled from 'styled-components';

function MainBanner() {
  return (
    <Wrapper>
      <BannerWrapper />
      <BannerTitle>
        <h2>
          함께 성장하고, 함께 누리는 <br />
          창조혁신 <span>Global</span> <span>Think</span> <span>Tank!</span>
        </h2>
        <p>사단법인 경기북부지역발전연구원</p>
      </BannerTitle>
    </Wrapper>
  );
}

export default MainBanner;

const Wrapper = styled.div`
  height: 500px;
  max-width: 1440px;
  margin: auto;
  position: relative;

  @media screen and (max-width: 820px) {
    height: auto;
    border: none;
  }
`;

const BannerWrapper = styled.div`
  background: #fff url('/images/mainBannerPc.png') no-repeat right center/cover;
  height: 100%;
  margin: auto;
  max-width: 1440px;

  @media screen and (max-width: 820px) {
    height: auto;
    aspect-ratio: 320/182;
    background: #fff url('/images/mainBannerMo.png') no-repeat top right/cover;
    border: none;
  }
`;

const BannerTitle = styled.div`
  position: absolute;
  right: 100px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #221e1f;

  h2 {
    font-size: 36px;
    font-weight: 800;
    line-height: 60px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    text-align: right;
    font-weight: 400;
  }

  span {
    &:first-of-type {
      color: #57bd84;
    }
    &:nth-of-type(2) {
      color: #1f4788;
    }
    &:last-of-type {
      color: #f15a4e;
    }
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 14px 20px 16px 20px;
    position: static;
    color: #221E1F;
    text-align: right;

    h2 {
      font-size: 22px;
      line-height: 34px;
      font-weight: 800;
      margin-bottom: 6px;
    }

    p {
      font-size: 16px;
      line-height: 20px;
    }
  }
`;
