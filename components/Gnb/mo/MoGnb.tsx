import styled from 'styled-components';
import GnbTop from './GnbTop';
import GnbButton from './GnbButton';
import GnbBottom from './GnbBottom';

function MoGnb() {
  return (
    <>
      <Wrapper>
        <GnbButton />
        <GnbTop />
      </Wrapper>
      <GnbBottom />
    </>
  );
}

export default MoGnb;

const Wrapper = styled.div`
  height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
