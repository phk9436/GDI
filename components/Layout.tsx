import Gnb from 'components/Gnb/Gnb';
import { mobileCheck } from 'atoms/layout';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { IMobileCheck } from 'types/styleTypes';
import Footer from './Footer';
import GnbAdmin from './Gnb/admin/GnbAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ILayoutProps } from 'types/pagePropTypes';

function Layout({ children, isAdminPage, isForbiden }: ILayoutProps) {
  const isMobile = useRecoilValue(mobileCheck);

  return (
    <>
      {isAdminPage ? <GnbAdmin /> : <Gnb />}
      <Main isMobile={isMobile}>{children}</Main>
      <Footer isAdminPage={isAdminPage} />
      <ToastContainer autoClose={1500} position="top-center" theme="colored" limit={2} />
      {isForbiden && <ForbidenBg />}
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
          padding-top: 87px;
        `}
`;

const ForbidenBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 100%;
  z-index: 100;
`;
