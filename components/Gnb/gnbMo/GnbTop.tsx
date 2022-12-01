import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

function GnbTop() {
  return (
    <>
      <Link href="/">
        <a>
          <LogoWrapper>
            <Image src="/images/logoHeaderPc.png" layout="fill" alt="logo" />
          </LogoWrapper>
        </a>
      </Link>
    </>
  );
}

export default GnbTop;

const LogoWrapper = styled.div`
  position: relative;
  width: 90px;
  height: 36px;
`;
