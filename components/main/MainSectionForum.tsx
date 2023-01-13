import styled from 'styled-components';
import { IForumData } from 'types/dataTypes';
import { SectionTop, Cards } from './Layout';
import { RedirectDetail } from './Components';

interface PageProps {
  data: IForumData[];
}

function MainSectionForum({ data }: PageProps) {
  return (
    <Wrapper>
      <SectionTop title={'학술포럼 & 이벤트'} href="/lab/Forum" />
      <SectionContents>
        <Cards data={data} path="/lab/Forum" />
        <DescriptWrapper>
          <DescriptText>
            모두가 참여가능한 <em>GDI의 학술포럼</em>에 <br />
            여러분을 초대합니다!
            <DescriptMarker />
          </DescriptText>

          <DescriptLink>
            학술포럼 리스트
            <RedirectDetail href="/lab" />
          </DescriptLink>
        </DescriptWrapper>
      </SectionContents>
    </Wrapper>
  );
}

export default MainSectionForum;

const Wrapper = styled.section`
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
  padding: 0 60px 0 80px;

  @media screen and (max-width: 820px) {
    padding: 0;
  }
`;

const DescriptWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 34px;
  width: 438px;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const DescriptText = styled.p`
  font-size: 24px;
  line-height: 48px;
  font-weight: 500;
  width: 298px;
  letter-spacing: -0.04em;
  margin-top: 20px;
  text-align: right;
  padding-right: 20px;
  position: relative;

  em {
    display: inline-block;
    color: #fff;
    font-weight: 700;
  }
`;

const DescriptMarker = styled.span`
  display: block;
  width: 170px;
  height: 40px;
  background-color: #9c87bf;
  position: absolute;
  top: 52px;
  right: 32px;
  z-index: -1;
`;

const DescriptLink = styled.div`
  width: 100%;
  height: 100px;
  background-color: #f6f6f6;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding-right: 20px;
  font-size: 30px;
  font-weight: 900;
  color: #1f4788;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;
