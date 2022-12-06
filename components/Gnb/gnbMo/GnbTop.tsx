import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { mobileMenuOpen } from 'atoms/layout';
import { useSetRecoilState } from 'recoil';

function GnbTop() {
  const setIsOpen = useSetRecoilState(mobileMenuOpen);

  const onClickLogo = () => setIsOpen(false);

  return (
    <>
      <Link href="/">
        <a>
          <LogoWrapper onClick={onClickLogo}>
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
