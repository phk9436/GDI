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
  max-width: 1300px;
  margin: auto;
  position: relative;
  border-bottom: 1px solid #5b5859;

  @media screen and (max-width: 820px) {
    height: 256px;
    border: none;
  }
`;

const BannerWrapper = styled.div`
  background: #fff url('/images/mainBannerPc.png') no-repeat left center/1200px 500px;
  height: 100%;
  margin: auto;
  max-width: 1200px;

  @media screen and (max-width: 820px) {
    height: 146px;
    background: #fff url('/images/mainBannerMo.png') no-repeat top center/cover;
    border: none;
  }
`;

const BannerTitle = styled.div`
  position: absolute;
  right: 80px;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #221e1f;

  h2 {
    font-size: 36px;
    font-weight: 800;
    line-height: 60px;
    margin-bottom: 20px;
    margin-right: 100px;
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
    height: 110px;
    padding: 14px 20px 16px 20px;
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 0;
    right: 0;
    color: #fff;

    h2 {
      font-size: 14px;
      line-height: 22px;
      font-weight: 700;
    }

    p {
      font-size: 16px;
      line-height: 20px;
    }

    span {
      &:first-of-type {
        color: #fff;
      }
      &:nth-of-type(2) {
        color: #fff;
      }
      &:last-of-type {
        color: #fff;
      }
    }
  }
`;
