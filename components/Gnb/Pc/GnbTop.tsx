import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

function GnbTop() {
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
            <Image src="/Images/logoHeaderPc.png" layout="fill" alt="logo" />
          </LogoWrapper>
        </a>
      </Link>

      <Nav>
        {Menu.map(([title, url]: string[]) => (
          <LinkWrapper>
            <Link href={`/${url}`}>
              <NavLink>{title}</NavLink>
            </Link>
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
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;
`;

const NavLink = styled.a`
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.01em;
`;
