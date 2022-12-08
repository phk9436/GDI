import styled from 'styled-components';
import { SectionTop, Cards } from './Layout';

const DUMMY_DATA = [
  {
    id: 0,
    date: '22-09-22',
    title: `경기도 탄소중립을 위한 '정의로운 전환' 플랫폼 구축 기초연구`,
    img: '/images/cardDummy.png',
  },
  {
    id: 0,
    date: '22-09-22',
    title: `경기도 탄소중립을 위한 '정의로운 전환' 플랫폼 구축 기초연구`,
    img: '/images/cardDummy.png',
  },
  {
    id: 0,
    date: '22-09-22',
    title: `경기도 탄소중립을 위한 '정의로운 전환' 플랫폼 구축 기초연구`,
    img: '/images/cardDummy.png',
  },
];

function MainSectionForum() {
  return (
    <Wrapper>
      <SectionTop title={'학술포럼'} href="/lab/Forum" />
      <SectionContents>
        <Cards data={DUMMY_DATA} path="/lab/Forum"/>
        <DescriptText>
          모두가 참여가능한 <em>GDI의 학술포럼</em>에 여러분을 초대합니다!
        </DescriptText>
      </SectionContents>
    </Wrapper>
  );
}

export default MainSectionForum;

const Wrapper = styled.section`
  padding: 0 60px;
  max-width: 1440px;
  margin: auto;
  margin-top: 24px;

  @media screen and (max-width: 820px) {
    padding: 0;
    margin-top: 15px;
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
  width: 298px;
  letter-spacing: -0.04em;
  margin-top: 20px;
  text-align: right;

  em {
    display: inline-block;
    background-color: rgba(156, 135, 191, 0.8);
    border-radius: 60px;
    padding: 0 6px;
  }

  @media screen and (max-width: 820px) {
    display: none;
  }
`;
