import styled from 'styled-components';
import GnbTop from './GnbTop';
import GnbBottom from './GnbBottom';

function PcGnb() {
  return (
    <Wrapper>
      <GnbTop />
      <GnbBottom />
    </Wrapper>
  );
}

export default PcGnb;

const Wrapper = styled.div`
  height: 140px;
  padding: 0 60px 0 104px;
  transition: 0.5s;
  overflow-y: hidden;
  position: relative;

  :hover {
    height: 290px;
  }
`;
