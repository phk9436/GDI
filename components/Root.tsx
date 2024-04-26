import { firebaseApp } from 'api/firebase';
import Layout from './Layout';
import { useRecoilState } from 'recoil';
import { mobileCheck } from 'atoms/layout';
import { adminState } from 'atoms/util';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { IRootProps } from 'types/pagePropTypes';

function Root({ children }: IRootProps) {
  const app = firebaseApp;
  const [isMobile, setIsMobile] = useRecoilState(mobileCheck);
  const [isAdmin, setIsAdmin] = useRecoilState(adminState);
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [isForbiden, setIsForbiden] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const routeCategory = router.route.split('/');
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
        isChecked || setIsChecked(true);
      } else {
        setIsAdmin(false);
        sessionStorage.removeItem('admin');
        isChecked || setIsChecked(true);
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
        isForbiden && toast.error('관리자 페이지는 pc만 지원합니다.');
      } else if (!isAdmin && routeCategory[2] !== 'Login' && isChecked) {
        setIsForbiden(true);
        router.push('/');
        isForbiden && toast.error('어드민 로그인이 필요합니다.');
      }
    } else {
      setIsAdminPage(false);
      isForbiden && setIsForbiden(false);
    }
  });

  return (
    <Layout isAdminPage={isAdminPage} isForbiden={isForbiden}>
      {children}
    </Layout>
  );
}

export default Root;
