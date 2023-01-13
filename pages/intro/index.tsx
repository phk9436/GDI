import styled from 'styled-components';
import Head from 'next/head';
import { HeadMeta } from 'components/Components';

function index() {
  return (
    <>
      <HeadMeta title="GDI | GDI소개" />
      <Wrapper>
        <Banner>
          <BannerBg />
          <BannerText>
            <h2>원장 인사말</h2>
            <p>
              (사)경기북부지역발전연구원 원장
              <em>박천일</em>
            </p>
          </BannerText>
        </Banner>
        <Intro>
          <p>
            (사)경기북부지역발전연구원은 경기북부지역의 성장발전을 이끄는 원동력의 역할 수행을
            목표로 2021년 3월 설립되었습니다. 경기북부지역의 경제활성화를 위한 기본계획과 정책을
            수립하고, 지역산업의 경쟁력 제고를 위한 제분야의 연구조사활동을 종합적으로 수행하여
            지역경제발전 전략 및 정책이 체계적이고 효율적으로 실행될 수 있도록 구체적 실행방안
            제공을 주요 활동업무로 하고 있습니다.
          </p>
          <p>
            대한민국 어디서나 살기 좋은 지방시대를 향한 국가정책에 발맞추어 연구활동을 통하여 생명력
            있고 활기찬 경기북부지역 건설에 기여하고자 합니다. 심화되는 지역간 격차 및 양극화 현상,
            지역의 인구감소 문제 등을 해소하기 위해 지역주민이 공감하고 호응할 수 있는 정책을 발굴해
            나가겠습니다. 보다 합리적이고 실천적이며 지속가능한 정책대안 제공을 통해 지역주민의 삶의
            질이 개선될 수 있도록 최선을 다하고자 합니다.
          </p>
          <p>
            이와 같은 미래지향적 소임을 원만히 수행해 나가기 위해서는 저희 연구원의 혁신창의적 역량
            외에 여러분의 보다 많은 관심과 조언이 절실히 필요합니다. 여러분과 함께할 때 비로소
            가능한 일입니다. 부탁의 말씀과 더불어 저희 연구소가 추진하고 있는 각종 학술행사와
            연구프로젝트의 전모를 여러분 모두와 공유하는 공간으로서의 홈페이지가 될 수 있도록 최선을
            다할 것을 약속드립니다. 저희 연구원을 방문해 주셔서 감사합니다.
          </p>
        </Intro>
        <Vision>
          <div>
            <h2>GDI Vision</h2>
            <p>
              함께 성장하고 함께 누리는
              <br />
              행복한 경기북부지역의 성장발전을 이끄는
              <br />
              창조혁신 글로벌 퓨처 씽크탱크
            </p>
          </div>
          <div></div>
        </Vision>
        <Road>
          <RoadBg />
          <RoadBox>
            <div>4 Missions</div>
            <div>
              성실한 연구자로서 <em>전문성 강화</em>
            </div>
            <div>
              진정한 봉사자로서 <em>지역사회와의 연대감 형성</em>
            </div>
            <div>
              유관 기관단체와 <em>협력체계 구축</em>
            </div>
            <div>
              <em>
                자체 재정건정성
                <br /> 및 운영능력 확보
              </em>
            </div>
          </RoadBox>
        </Road>
      </Wrapper>
    </>
  );
}

export default index;

const Wrapper = styled.div`
  max-width: 1440px;
  margin: auto;
`;
const Banner = styled.section`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  letter-spacing: 0.01em;
  position: relative;

  @media screen and (max-width: 820px) {
    height: auto;
    aspect-ratio: 320/146;
  }
`;

const BannerBg = styled.div`
  background: url('/images/introBanner.png') no-repeat center/cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  @media screen and (max-width: 820px) {
    background-image: url('/images/introBannerMo.png');
    position: static;
  }
`;

const BannerText = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 40px;

  h2 {
    font-size: 36px;
    font-weight: 800;
  }

  p {
    font-size: 18px;
    font-weight: 300;
    line-height: 24px;
    border-left: 3px solid #fff;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 14px;

    em {
      font-size: 24px;
      font-weight: 800;
    }
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 20px 20px 30px;
    background-color: #102444;
    gap: 30px;

    h2 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
      padding-left: 24px;
      gap: 2px;

      em {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
`;

const Intro = styled.section`
  background-color: #1f4788;
  padding: 48px 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 16px;
  font-weight: 300;
  line-height: 36px;
  gap: 72px;
  letter-spacing: -0.025em;

  p {
    width: 600px;
  }

  @media screen and (max-width: 820px) {
    padding: 20px 40px 60px;
    gap: 18px;

    p {
      width: 100%;
      font-size: 13px;
      line-height: 22px;
    }
  }
`;

const Vision = styled.section`
  display: flex;
  height: 340px;

  div {
    width: 100%;

    &:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 46px;
      background-color: #221e1f;
      color: #fff;

      h2 {
        font-size: 36px;
        font-weight: 800;
      }

      p {
        font-size: 24px;
        font-weight: 300;
        line-height: 36px;
        letter-spacing: -0.025em;
        text-align: center;
      }
    }

    &:last-child {
      background: url('/images/visionBanner.png') no-repeat center/cover;
    }
  }

  @media screen and (max-width: 820px) {
    height: auto;
    flex-direction: column;

    div {
      aspect-ratio: 320/150;

      &:first-child {
        padding: 20px;
        gap: 20px;

        h2 {
          font-size: 20px;
        }

        p {
          font-size: 14px;
          line-height: 22px;
        }
      }
    }
  }
`;

const Road = styled.section`
  height: 756px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px;

  @media screen and (max-width: 820px) {
    height: auto;
    padding: 20px 20px 100px;
  }
`;

const RoadBg = styled.span`
  display: block;
  width: calc(100% - 440px);
  height: calc(100% - 500px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  z-index: -1;

  @media screen and (max-width: 820px) {
    width: calc(100% - 180px);
    height: 600px;
    top: 50px;
    transform: translateX(-50%);
  }
`;

const RoadBox = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 56px 88px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:nth-child(1) {
      background-color: #f15a4e;
      font-size: 36px;
      font-weight: 800;
      color: #fff;
    }

    &:not(:nth-child(1)) {
      font-size: 24px;
      line-height: 36px;
      font-weight: 400;
      text-align: center;
      padding: 10px;
      border-width: 30px;
      border-style: solid;
      background-color: #fff;

      em {
        font-weight: 700;
      }
    }

    &:nth-child(2) {
      border-color: #ffc20c;
    }

    &:nth-child(3) {
      border-color: #1f4788;
    }

    &:nth-child(4) {
      border-color: #57bd84;
    }

    &:nth-child(5) {
      border-color: #9c87bf;
    }
  }

  @media screen and (max-width: 820px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: auto;
    width: 100%;

    div {
      height: auto;
      aspect-ratio: 280/120;
      max-width: calc(100vw - 40px);

      &:nth-child(1) {
        font-size: 22px;
      }

      &:not(:nth-child(1)) {
        font-size: 14px;
        line-height: 22px;
        border-width: 16px;
      }
    }
  }
`;
