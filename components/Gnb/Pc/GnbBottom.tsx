import Link from 'next/link';
import styled from 'styled-components';

function GnbBottom() {
  const Menu: { [key: string]: string[][] } = {
    lab: [
      ['연구보고서', ''],
      ['학술 포럼', 'forum'],
    ],
    notice: [
      ['GDI 영상관', 'movie'],
      ['언론보도', 'press'],
      ['공지사항', ''],
    ],
    board: [['연구제안', '']],
    intro: [
      ['원장인사말', ''],
      ['비전&연혁', 'vision'],
      ['오시는길', 'map'],
    ],
  };
  const MenuTaps = Object.keys(Menu);
  console.log(MenuTaps);
  return (
    <Wrapper>
      {MenuTaps.map((e, i) => (
        <MenuList key={`Tap${i}`}>
          {Menu[e].map((el, index) => (
            <MenuElement key={`Tap${el}${index}`}>
              <Link href={`${e}/${el[1]}`}>
                <a>{el[0]}</a>
              </Link>
            </MenuElement>
          ))}
        </MenuList>
      ))}
    </Wrapper>
  );
}

export default GnbBottom;

const Wrapper = styled.div`
  margin-left: auto;
  width: fit-content;
  display: flex;
  gap: 30px;
`;

const MenuList = styled.div`
  width: 110px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const MenuElement = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
