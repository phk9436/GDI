import styled from 'styled-components';

function MainBanner() {
  return (
    <Wrapper>
      <BannerBackground />
      <BannerTitle>
        <h2>
          함께 성장하고, 함께 누리는 <br />
          창조혁신 Global Think Tank
        </h2>
        <p>사단법인 경기북부지역발전연구원</p>
      </BannerTitle>
    </Wrapper>
  );
}

export default MainBanner;

const Wrapper = styled.div`
  height: 500px;
  position: relative;

  @media screen and (max-width: 820px) {
    height: 256px;
  }
`;

const BannerBackground = styled.div`
  background: #fff url('/images/mainBannerPc.png') no-repeat left center/1440px 500px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 820px) {
    height: 146px;
    background: #fff url('/images/mainBannerMo.png') no-repeat top center/cover;
  }
`;

const BannerTitle = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 750px;
  height: 258px;
  padding: 30px 60px 30px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;

  h2 {
    font-size: 40px;
    font-weight: 700;
    line-height: 60px;
  }

  p {
    font-size: 34px;
    text-align: right;
    font-weight: 400;
    line-height: 60px;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    height: 110px;
    padding: 14px 20px 16px 20px;

    h2 {
      font-size: 14px;
      line-height: 22px;
    }

    p {
      font-size: 16px;
      line-height: 20px;
    }
  }
`;
