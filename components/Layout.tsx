import { useEffect } from 'react';
import Gnb from 'components/Gnb/Gnb';
import { mobileCheck } from 'atoms/layout';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { IMobileCheck } from 'types/styleTypes';
import Footer from './Footer';

interface Iprops {
  children: React.ReactNode;
}

function Layout({ children }: Iprops) {
  const [isMobile, setIsMobile] = useRecoilState(mobileCheck);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/(iPad|iPhone|Android|Mobile)/i.test(userAgent));
  }, []);

  return (
    <>
      <Gnb />
      <Main isMobile={isMobile}>{children}</Main>
      <Footer />
    </>
  );
}

export default Layout;

const Main = styled.main<IMobileCheck>`
  ${({ isMobile }) =>
    isMobile
      ? css`
          padding-top: 76px;
        `
      : css`
          padding-top: 140px;
        `}
`;
