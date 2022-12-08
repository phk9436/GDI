import styled from 'styled-components';
import { mobileCheck } from 'atoms/layout';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import Image from 'next/image';

function Footer() {
  const isMobile = useRecoilValue(mobileCheck);
  const isLogin = sessionStorage.getItem('admin');

  return (
    <Wrapper>
      {!isMobile && (
        <FooterTopWrapper>
          <FooterTop>
            <Link href={isLogin ? '/admin' : '/admin/Login'}>
              <a>GDI Admin</a>
            </Link>
          </FooterTop>
        </FooterTopWrapper>
      )}
      <FooterContents>
        <ContentsBox>
          <LogoWrapper>
            <Image
              src={isMobile ? '/images/logoFooterMo.png' : '/images/logoFooterPc.png'}
              layout="fill"
              alt="logo"
            />
          </LogoWrapper>
          <ContentAddress>
            경기연구원(16207) 경기도 수원시 장안구 경수대로 1150 031-250-3114
            <br />
            북부연구센터(11775) 경기도 의정부시 청사로 5번길 8-7 씨티메디타운 7층 031-850-6014
            <br />
            공공투자관리센터(15880) 경기도 군포시 번영로 34, 대흥테라스뷰 5층 031-8014-6943
          </ContentAddress>
        </ContentsBox>
      </FooterContents>
    </Wrapper>
  );
}

export default Footer;

const Wrapper = styled.footer`
  background-color: #f5f5f5;
`;

const FooterTopWrapper = styled.div`
  border-bottom: 1px solid #000;
`;

const FooterTop = styled.div`
  height: 87px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 70px;
  font-size: 24px;
  font-weight: 700;
  max-width: 1430px;
  margin: auto;
`;

const FooterContents = styled.div`
  height: 295px;

  @media screen and (max-width: 820px) {
    height: 264px;
  }
`;

const ContentsBox = styled.div`
  max-width: 1430px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 94px;
  padding: 0 87px 44px 70px;
  margin: auto;

  @media screen and (max-width: 820px) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 20px 20px 30px;
    gap: 0;
  }
`;

const LogoWrapper = styled.div`
  width: 274px;
  min-width: 274px;
  height: 154px;
  position: relative;

  @media screen and (max-width: 820px) {
    width: 112px;
    min-width: 112px;
    height: 64px;
  }
`;

const ContentAddress = styled.address`
  max-width: 913px;
  font-style: normal;
  font-size: 23px;
  line-height: 34px;
  letter-spacing: -0.01em;
  color: #878787;

  @media screen and (max-width: 820px) {
    width: 100%;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0;
  }
`;
