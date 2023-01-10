import styled from 'styled-components';
import MainSectionEtc from './MainSectionEtc';
import MainSectionNotice from './MainSectionNotice';
import { IPressData } from 'types/dataTypes';

interface PageProps {
  data: IPressData[];
}

function MainSectionBottom({ data }: PageProps) {
  return (
    <Wrapper>
      <MainSectionNotice data={data} />
      <MainSectionEtc />
    </Wrapper>
  );
}

export default MainSectionBottom;

const Wrapper = styled.section`
  margin: 152px auto 190px;
  max-width: 1300px;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  gap: 96px;

  @media screen and (max-width: 820px) {
    margin: 60px auto 62px;
    flex-direction: column;
    justify-content: flex-start;
    gap: 62px;
    padding: 0 20px;
  }
`;
