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
              <ContentTitle>
                {e === 'board' ? (
                  <>
                    연구제안
                    <RedirectDetail href="/board" />
                  </>
                ) : (
                  <>
                    GDI 소개
                    <RedirectDetail href="/intro" />
                  </>
                )}
              </ContentTitle>
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
  border: 1px solid #d9d9d9;

  p {
    font-size: 20px;
    line-height: 30px;
    font-weight: 500;
    padding-left: 28px;
    padding-bottom: 18px;
  }

  @media screen and (max-width: 820px) {
    height: auto;
    aspect-ratio: 280/196;
    letter-spacing: -0.01em;

    p {
      font-size: 16px;
      line-height: 26px;
      padding-left: 18px;
      padding-bottom: 8px;
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

const ContentTitle = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: #1f4788;
  background-color: #f6f6f6;
  padding: 0 28px;
  font-size: 30px;
  font-weight: 800;

  @media screen and (max-width: 820px) {
    height: 62px;
    font-size: 18px;
    padding: 0 18px;
  }
`;
