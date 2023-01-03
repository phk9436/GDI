import { useEffect, useState } from 'react';
import Gnb from 'components/Gnb/Gnb';
import { mobileCheck } from 'atoms/layout';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { IMobileCheck } from 'types/styleTypes';
import Footer from './Footer';
import { useRouter } from 'next/router';
import GnbAdmin from './Gnb/admin/GnbAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Iprops {
  children: React.ReactNode;
}

function Layout({ children }: Iprops) {
  const [isMobile, setIsMobile] = useRecoilState(mobileCheck);
  const [isAdminPage, setIsAdminPage] = useState(false);
  const { route } = useRouter();
  const routeCategory = route.split('/')[1];

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/(iPad|iPhone|Android|Mobile)/i.test(userAgent));
  }, []);

  useEffect(() => {
    routeCategory === 'admin' ? setIsAdminPage(true) : setIsAdminPage(false);
  });

  return (
    <>
      {isAdminPage ? <GnbAdmin route={route} /> : <Gnb />}
      <Main isMobile={isMobile}>{children}</Main>
      <Footer isAdminPage={isAdminPage} />
      <ToastContainer autoClose={1500} theme="colored" limit={2} />
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
