import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

function GnbTop() {
  const { route } = useRouter();
  const routeCategory = route.split('/')[1];
  const Menu = [
    ['연구실', 'lab'],
    ['소식', 'notice'],
    ['참여', 'board'],
    ['GDI소개', 'intro'],
  ];

  return (
    <Wrapper>
      <Link href="/">
        <a>
          <LogoWrapper>
            <Image src="/images/logoHeaderPc.png" layout="fill" alt="logo" />
          </LogoWrapper>
        </a>
      </Link>

      <Nav>
        {Menu.map(([title, url]: string[]) => (
          <LinkWrapper key={`gnb${title}`}>
            <Link href={`/${url}`}>
              <NavLink>{title}</NavLink>
            </Link>
            {routeCategory === url && <LinkMarker />}
          </LinkWrapper>
        ))}
      </Nav>
    </Wrapper>
  );
}

export default GnbTop;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 140px;
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 218px;
  height: 80px;
`;

const LinkWrapper = styled.div`
  width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;
`;

const NavLink = styled.a`
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.01em;
  z-index: 1;
  cursor: pointer;
`;

const LinkMarker = styled.div`
  position: absolute;
  bottom: calc(50% - 20px);
  width: 116px;
  height: 20px;
  border-radius: 10px;
  background-color: #f58472;
`;
