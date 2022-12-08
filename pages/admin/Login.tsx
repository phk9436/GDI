import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const loginAdmin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id !== 'admin1234' || password !== 'adminlogin153246') {
      alert('아이디와 패스워드를 확인해주세요');
      return;
    }
    alert('로그인 성공!');
    sessionStorage.setItem('admin', 'adminLoginSuccess');
    router.push('/admin');
  };

  useEffect(() => {
    if (sessionStorage.getItem('admin')) {
      alert('이미 로그인되어 있습니다');
      router.push('/admin');
    }
  }, []);

  return (
    <Wrapper>
      <LogoWrapper>
        <Image src="/images/logoHeaderPc.png" layout="fill" alt="logo" />
      </LogoWrapper>
      <TitleWrapper>
        <h3>관리자 로그인</h3>
        <p>
          GDI는 누구나 열람이 가능한 공공연구사이트입니다.
          <br />이 페이지는 관리자 전용 페이지입니다.
        </p>
      </TitleWrapper>
      <LoginForm>
        <form action="" onSubmit={loginAdmin}>
          <LoginInput type="text" placeholder="아이디 입력" value={id} onChange={onChangeId} />
          <LoginInput
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={onChangePassword}
          />
          <LoginButton>로그인</LoginButton>
        </form>
      </LoginForm>
      <LinkWrapper>
        <Link href="/">
          <a>
            <ArrowWrapper>
              <Image src="/images/swiperPrevMo.png" layout="fill" alt="arrow" />
            </ArrowWrapper>
            <p>홈으로 돌아가기</p>
          </a>
        </Link>
      </LinkWrapper>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  max-width: 474px;
  height: 717px;
  padding: 0 60px;
  box-sizing: content-box;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  width: 218px;
  height: 80px;
  position: relative;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 80px 0 56px;

  h3 {
    font-size: 24px;
    font-weight: 400;
    display: flex;
    align-items: center;
    letter-spacing: -0.04em;

    &::after {
      content: '';
      display: block;
      width: 1px;
      height: 24px;
      background-color: #000;
      margin: 0 18px;
    }
  }

  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
  }
`;

const LoginForm = styled.div`
  width: 100%;
  margin-bottom: 28px;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 17px 18px;
  border: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  caret-color: #1f4788;

  &::placeholder {
    color: #a4a4a4;
  }

  &:first-child {
    margin-bottom: 12px;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #1f4788;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 28px;
`;

const LinkWrapper = styled.div`
  margin-right: auto;

  a {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  p {
    font-size: 14px;
    color: #a4a4a4;
  }
`;

const ArrowWrapper = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
`;
