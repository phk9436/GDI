import styled from 'styled-components';
import { SectionTop, Cards } from './Layout';
import { ILabData } from 'types/dataTypes';
import { RedirectDetail } from './Components';

interface PageProps {
  data: ILabData[];
}

function MainSectionLab({ data }: PageProps) {
  return (
    <Wrapper>
      <SectionTop title={'연구활동'} href="/lab" />
      <SectionContents>
        <DescriptWrapper>
          <DescriptText>
            지역경제활성화를 위한 <em>GDI만의 실질적 연구</em>를 <br />
            확인해보세요.
            <DescriptMarker />
          </DescriptText>

          <DescriptLink>
            연구보고서 리스트
            <RedirectDetail href="/lab" />
          </DescriptLink>
        </DescriptWrapper>

        <Cards data={data} path="/lab" />
      </SectionContents>
    </Wrapper>
  );
}

export default MainSectionLab;

const Wrapper = styled.section`
  max-width: 1300px;
  margin: auto;
  margin-top: 64px;

  @media screen and (max-width: 820px) {
    padding: 0;
    margin-top: 35px;
  }
`;

const SectionContents = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 80px 0 60px;

  @media screen and (max-width: 820px) {
    padding: 0;
  }
`;

const DescriptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
  width: calc(100% - 722px);
`;

const DescriptText = styled.p`
  font-size: 24px;
  line-height: 48px;
  font-weight: 500;
  width: 330px;
  letter-spacing: -0.04em;
  margin-top: 20px;
  padding-left: 20px;
  position: relative;

  em {
    display: inline-block;
    font-weight: 700;
    color: #fff;
  }

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const DescriptMarker = styled.span`
  display: block;
  width: 214px;
  height: 40px;
  background-color: #fcc94c;
  position: absolute;
  top: 52px;
  left: 12px;
  z-index: -1;
`;

const DescriptLink = styled.div`
  height: 100px;
  background-color: #f6f6f6;
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 20px;
  font-size: 30px;
  font-weight: 900;
  color: #1f4788;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;
