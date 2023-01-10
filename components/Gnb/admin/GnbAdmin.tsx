import styled from 'styled-components';
import GnbTop from './GnbTop';
import GnbBottom from './GnbBottom';

function GnbAdmin() {

  return (
    <GnbWrapper>
      <GnbContainer>
        <GnbTop />
        <GnbBottom />
      </GnbContainer>
    </GnbWrapper>
  );
}

export default GnbAdmin;

const GnbWrapper = styled.header`
  width: 100%;
  position: fixed;
  background-color: #fff;
  border-bottom: 1px solid #5B5859;
  z-index: 99;
`;

const GnbContainer = styled.div`
  max-width: 1300px;
  margin: auto;
  height: 140px;
  padding: 0 60px 0 104px;
  transition: 0.5s;
  overflow-y: hidden;
  position: relative;

  :hover {
    height: 290px;
  }
`;
