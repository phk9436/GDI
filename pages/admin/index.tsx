import Link from 'next/link';
import styled, { css } from 'styled-components';

interface ContentProps {
  cat: string;
  bg: string;
}

function index() {
  const contents = [
    ['연구보고서', '/lab', '#57BD84'],
    ['학술포럼', '/lab/Forum', '#9C87BF'],
    ['blank', '', ''],
    ['GDI 영상관', '/notice/Movie', '#1F4788'],
    ['공지사항', '/notice', '#FFC20C'],
    ['언론보도', '/notice/Press', '#F15A4E;'],
  ];
  return (
    <div>
      <BreadCrumbWrapper>
        <BreadCrumb>
          <h2>게시물 업로드</h2>
        </BreadCrumb>
      </BreadCrumbWrapper>
      <ContentsWrapper>
        <Contents>
          {contents.map((e, i) => {
            const [category, path, bg] = e;
            return category !== 'blank' ? (
              <Link href={`/admin${path}`}>
                <a>
                  <Content cat={category} bg={bg}>
                    <h3>{category}</h3>
                    <p>업로드</p>
                  </Content>
                </a>
              </Link>
            ) : (
              <div />
            );
          })}
        </Contents>
      </ContentsWrapper>
    </div>
  );
}

export default index;

const BreadCrumbWrapper = styled.div`
  height: 150px;
  background-color: #1f4788;
`;

const BreadCrumb = styled.div`
  max-width: 1440px;
  height: 100%;
  padding: 0 70px;
  display: flex;
  align-items: center;

  h2 {
    font-size: 40px;
    font-weight: 700;
    color: #fff;
  }
`;

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Contents = styled.div`
  padding: 50px 0 190px;
  width: 880px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 64px;
`;

const Content = styled.div<ContentProps>`
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 14px 14px 22px 22px;
  background-color: ${({ bg }) => bg};
  transition: 0.3s;

  &::before {
    content: '+';
    display: block;
    margin-bottom: auto;
    margin-left: auto;
    font-size: 24px;
  }

  h3,
  p {
    font-size: 36px;
    color: #fff;
    line-height: 50px;
  }

  &:hover {
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
