import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GnbTop from './GnbTop';
import GnbBottom from './GnbBottom';
import { toast } from 'react-toastify';

interface IGnbProps {
  route: string;
}

function GnbAdmin({ route }: IGnbProps) {
  const router = useRouter();
  const routeCategory = route.split('/')[2];

  useEffect(() => {
    if (!sessionStorage.getItem('admin') && routeCategory !== 'Login') {
      toast.error('어드민 로그인이 필요합니다');
      router.push('/');
    }
  }, []);

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
  border-bottom: 1px solid #000000;
  z-index: 99;
`;

const GnbContainer = styled.div`
  max-width: 1440px;
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
