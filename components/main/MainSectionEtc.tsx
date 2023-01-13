import styled, { css } from 'styled-components';
import { Content, RedirectDetail } from './Components';

function MainSectionEtc() {
  const contents = ['board', 'intro'];
  return (
    <Wrapper>
      <ContentsList>
        {contents.map((e, i) => (
          <Content category={e} key={`content${i}`} />
        ))}
      </ContentsList>
    </Wrapper>
  );
}

export default MainSectionEtc;

const Wrapper = styled.div`
  width: 452px;
  min-width: 452px;

  @media screen and (max-width: 820px) {
    width: 100%;
    min-width: 100%;
  }
`;
const ContentsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media screen and (max-width: 820px) {
    gap: 14px;
  }
`;
