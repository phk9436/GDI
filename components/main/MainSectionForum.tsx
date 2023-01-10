import styled from 'styled-components';
import { IForumData } from 'types/dataTypes';
import { SectionTop, Cards } from './Layout';

interface PageProps {
  data: IForumData[];
}

function MainSectionForum({ data }: PageProps) {
  return (
    <Wrapper>
      <SectionTop title={'학술포럼'} href="/lab/Forum" />
      <SectionContents>
        <Cards data={data} path="/lab/Forum" />
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
  max-width: 1300px;
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
