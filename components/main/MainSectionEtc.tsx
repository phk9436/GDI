import styled, { css } from 'styled-components';
import { RedirectDetail } from './Components';

interface IContent {
  content: string;
}

function MainSectionEtc() {
  const contents = ['board', 'intro'];
  return (
    <Wrapper>
      <ContentsList>
        {contents.map((e, i) => (
          <li key={`contentLink${i}`}>
            <ContentBox content={e}>
              <RedirectWrapper>
                <RedirectDetail text="바로가기" href={`/${e}`} />
              </RedirectWrapper>

              <h3>{e === 'board' ? '연구제안하기' : 'GDI 소개'}</h3>
              <p>
                {e === 'board' ? (
                  <>
                    참여를 통한 <br />
                    경기 북부 지역의 개선을 도와주세요
                  </>
                ) : (
                  <>
                    경기북부지역발전연구원의 <br />
                    인사와 포부를 확인해보세요
                  </>
                )}
              </p>
            </ContentBox>
          </li>
        ))}
      </ContentsList>
    </Wrapper>
  );
}

export default MainSectionEtc;

const Wrapper = styled.div`
  width: 452px;
  min-width: 452px;

  @media screen and (max-width: 820px) {
    width: 100%;
    min-width: 100%;
  }
`;
const ContentsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media screen and (max-width: 820px) {
    gap: 14px;
  }
`;

const ContentBox = styled.div<IContent>`
  height: 316px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 28px;
  padding: 16px 9px 33px 28px;

  h3 {
    color: #fff;
    font-size: 36px;
    font-weight: 700;
  }

  p {
    font-size: 20px;
    line-height: 30px;
    font-weight: 500;
  }

  @media screen and (max-width: 820px) {
    height: 170px;
    gap: 14px;
    padding: 13px 13px 16px 18px;
    letter-spacing: -0.01em;

    h3 {
      font-size: 24px;
    }

    p {
      font-size: 16px;
      line-height: 26px;
    }
  }

  ${({ content }) =>
    content === 'board'
      ? css`
          background-color: #ffc20c;

          p {
            color: #5b5859;
          }
        `
      : css`
          background-color: #57bd84;

          p {
            color: #fff;
          }
        `}
`;

const RedirectWrapper = styled.div`
  margin-bottom: auto;
  margin-left: auto;
`;
