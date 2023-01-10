import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { mobileCheck } from 'atoms/layout';
import PcGnb from './gnbPc/PcGnb';
import MoGnb from './gnbMo/MoGnb';

function Gnb() {
  const isMobile = useRecoilValue(mobileCheck);
  return <GnbWrapper>{isMobile ? <MoGnb /> : <PcGnb />}</GnbWrapper>;
}

export default Gnb;

const GnbWrapper = styled.header`
  width: 100%;
  position: fixed;
  background-color: #fff;
  border-bottom: 1px solid #5B5859;
  z-index: 99;
`;
