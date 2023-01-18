import styled from 'styled-components';
import { mobileCheck } from 'atoms/layout';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { RedirectDetail } from './main/Components';
import { adminState } from 'atoms/util';

interface IFooterProps {
  isAdminPage: boolean;
}

function Footer({ isAdminPage }: IFooterProps) {
  const isMobile = useRecoilValue(mobileCheck);
  const isAdmin = useRecoilValue(adminState);

  return (
    <Wrapper>
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
            경기북부지역발전연구원(11008) <BrMo/> 경기도 연천군 군남면 청정로 2291-2 <br />
            TEL: 031-832-3888
          </ContentAddress>
          {!isMobile && (
        <FooterTop>
          {isAdminPage ? (
            <>
              <p>GDI Main</p>
              <RedirectDetail href="/" />
            </>
          ) : (
            <>
              <p>GDI Admin</p>
              <RedirectDetail href={isAdmin ? '/admin' : '/admin/Login'} />
            </>
          )}
        </FooterTop>
      )}
        </ContentsBox>
      </FooterContents>
    </Wrapper>
  );
}

export default Footer;

const Wrapper = styled.footer`
  background-color: #f5f5f5;
`;

const FooterTop = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  align-items: center;
  max-width: 1300px;
  margin-left: auto;

  p {
    font-size: 30px;
    font-weight: 900;
    color: #d9d9d9;
  }
`;

const FooterContents = styled.div`
  height: 200px;

  @media screen and (max-width: 820px) {
    height: 200px;
  }
`;

const ContentsBox = styled.div`
  max-width: 1300px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: 46px;
  padding: 0 60px 44px;
  margin: auto;

  @media screen and (max-width: 820px) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 20px 20px 30px;
    gap: 0;
  }
`;

const LogoWrapper = styled.div`
  width: 178px;
  min-width: 178px;
  height: 100px;
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
  font-size: 16px;
  line-height: 34px;
  letter-spacing: -0.01em;
  color: #878787;

  @media screen and (max-width: 820px) {
    width: 100%;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const BrMo = styled.br`
  display: none;
  @media screen and (max-width: 820px) {
    display: block;
  }
`
