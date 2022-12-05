import styled, { css } from 'styled-components';
import Link from 'next/link';
import { mobileMenuOpen } from 'atoms/layout';
import { useRecoilState } from 'recoil';

interface IWrapper {
  isOpen: boolean;
}

function GnbBottom() {
  const [isOpen, setIsOpen] = useRecoilState(mobileMenuOpen);
  const menu = [
    [
      ['연구실', 'lab'],
      ['연구보고서', 'lab'],
      ['학술 포럼', 'lab/Forum'],
    ],
    [
      ['소식', 'notice'],
      ['GDI 영상관', 'notice/Movie'],
      ['언론보도', 'notice/Press'],
      ['공지사항', 'notice'],
    ],
    [
      ['참여', 'board'],
      ['연구제안', 'board'],
    ],
    [
      ['GDI소개', 'intro'],
      ['원장인사말', 'intro'],
      ['비전&연혁', 'intro/Vision'],
      ['오시는길', 'intro/Map'],
    ],
  ];

  const onClickTap = () => setIsOpen((state) => !state);

  return (
    <Wrapper isOpen={isOpen}>
      <MenuContainer>
        {menu.map((e) => (
          <MenuList key={`Tap${e[0][1]}`}>
            {e.map((el, index) => (
              <Link href={`/${el[1]}`}>
                <a>
                  {index === 0 ? (
                    <TapMain onClick={onClickTap}>{el[0]}</TapMain>
                  ) : (
                    <TapSub onClick={onClickTap}>{el[0]}</TapSub>
                  )}
                </a>
              </Link>
            ))}
          </MenuList>
        ))}
      </MenuContainer>
    </Wrapper>
  );
}

export default GnbBottom;

const Wrapper = styled.div<IWrapper>`
  position: absolute;
  width: 204px;
  padding: 0 30px;
  background-color: #1f4788;
  top: 77px;
  overflow-y: hidden;
  transition: 0.5s;

  ${({ isOpen }) =>
    isOpen
      ? css`
          height: 470px;
        `
      : css`
          height: 0;
        `}
`;

const MenuContainer = styled.div`
  padding: 22px 0 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TapMain = styled.h2`
  font-size: 20px;
  color: #fff;
  font-weight: 800;
  line-height: 24px;
`;

const TapSub = styled.h3`
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  line-height: 18px;
`;