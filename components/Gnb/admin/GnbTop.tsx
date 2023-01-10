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
  ];

  return (
    <Wrapper>
      <Link href="/admin">
        <a>
          <LogoWrapper>
            <Image src="/images/adminHeaderLogo.png" layout="fill" alt="logo" />
          </LogoWrapper>
        </a>
      </Link>

      <Nav>
        <LinkWrapper>
          <Link href="/">
            <NavLink>홈</NavLink>
          </Link>
        </LinkWrapper>
        {Menu.map(([title, url]: string[]) => (
          <LinkWrapper key={`gnb${title}`}>
            <Link href={`/admin/${url}`}>
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
  height: 86px;
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 38px;
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
  font-size: 24px;
  font-weight: 700;
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
