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
import { toast } from 'react-toastify';
import { firebaseApp } from 'api/firebase';
import { adminState } from 'atoms/util';
import { getAuth } from 'firebase/auth';

interface Iprops {
  children: React.ReactNode;
}

function Layout({ children }: Iprops) {
  const [isMobile, setIsMobile] = useRecoilState(mobileCheck);
  const [isAdmin, setIsAdmin] = useRecoilState(adminState);
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [isForbiden, setIsForbiden] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const router = useRouter();
  const routeCategory = router.route.split('/');
  const app = firebaseApp;
  const auth = getAuth();

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/(iPad|iPhone|Android|Mobile)/i.test(userAgent));
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAdmin(true);
        sessionStorage.setItem('admin', 'adminSuccess');
      } else {
        setIsAdmin(false);
        sessionStorage.removeItem('admin');
      }
    });
    if (!sessionStorage.getItem('admin') && !isInit) {
      auth.signOut();
      setIsInit(true);
    }
  }, []);

  useEffect(() => {
    if (routeCategory[1] === 'admin') {
      setIsAdminPage(true);
      if (isMobile) {
        setIsForbiden(true);
        router.push('/');
        isForbiden && toast.error('관리자 페이지는 pc만 지원합니다');
      }
      if (!isAdmin && routeCategory[2] !== 'Login') {
        setIsForbiden(true);
        router.push('/');
        isForbiden && toast.error('어드민 로그인이 필요합니다');
      }
    } else {
      setIsAdminPage(false);
      isForbiden && setIsForbiden(false);
    }
  });

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
