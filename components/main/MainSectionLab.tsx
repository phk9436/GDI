import styled from 'styled-components';
import { SectionTop, Cards } from './Layout';
import { IBoardData } from 'types/dataTypes';

interface PageProps {
  data: IBoardData[];
}

function MainSectionLab({ data }: PageProps) {
  return (
    <Wrapper>
      <SectionTop title={'NEW 연구활동'} href="/lab" />
      <SectionContents>
        <DescriptText>
          지역경제활성화를 위한 <em>GDI만의 실질적 연구</em>를 확인해보세요.
        </DescriptText>
        <Cards data={data} path="/lab" />
      </SectionContents>
    </Wrapper>
  );
}

export default MainSectionLab;

const Wrapper = styled.section`
  padding: 0 60px;
  max-width: 1440px;
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
`;

const DescriptText = styled.p`
  font-size: 34px;
  line-height: 54px;
  font-weight: 500;
  width: 330px;
  letter-spacing: -0.04em;
  margin-top: 20px;

  em {
    display: inline-block;
    background-color: rgba(252, 201, 76, 0.93);
    border-radius: 60px;
    padding: 0 6px;
  }

  @media screen and (max-width: 820px) {
    display: none;
  }
`;
