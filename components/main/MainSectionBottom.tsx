import styled from 'styled-components';
import MainSectionEtc from './MainSectionEtc';
import MainSectionNotice from './MainSectionNotice';

function MainSectionBottom() {
  return (
    <Wrapper>
      <MainSectionNotice />
      <MainSectionEtc />
    </Wrapper>
  );
}

export default MainSectionBottom;

const Wrapper = styled.section`
  margin: 152px auto 190px;
  max-width: 1430px;
  padding: 0 124px 0 60px;
  display: flex;
  justify-content: space-between;
  gap: 134px;

  @media screen and (max-width: 820px) {
    margin: 60px auto 62px;
    flex-direction: column;
    justify-content: flex-start;
    gap: 62px;
    padding: 0 20px;
  }
`;
