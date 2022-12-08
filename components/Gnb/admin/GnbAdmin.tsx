import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

interface IGnbProps {
  route: string;
}

function GnbAdmin({ route }: IGnbProps) {
  const routeCategory = route.split('/')[2];
  const Menu = [
    ['연구실', 'lab'],
    ['소식', 'notice'],
    ['참여', 'board'],
    ['GDI소개', 'intro'],
  ];

  return (
    <GnbWrapper>
      <GnbContainer>
        <Link href="/admin">
          <a>
            <LogoWrapper>
              <Image src="/images/adminHeaderLogo.png" layout="fill" alt="logo" />
            </LogoWrapper>
          </a>
        </Link>

        <Nav>
          {Menu.map(([title, url]: string[]) => (
            <LinkWrapper key={`gnb${title}`}>
              <Link href={`/admin/${url}`}>
                <NavLink>{title}</NavLink>
              </Link>
              {routeCategory === url && <LinkMarker />}
            </LinkWrapper>
          ))}
        </Nav>
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
  max-width: 1430px;
  margin: auto;
  height: 140px;
  padding: 0 60px 0 104px;
  transition: 0.5s;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 311px;
  height: 60px;
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
