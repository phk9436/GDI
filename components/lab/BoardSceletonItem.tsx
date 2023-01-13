import styled from 'styled-components';

function BoardSceletonItem() {
  return (
    <li>
      <BoardItemWrapper>
        <BoardItemImage />
        <BoardItemContents>
          <TitleWrapper>
            <p />
            <h3 />
          </TitleWrapper>
          <InfoWrapper>
            <ul>
              <li />
              <li />
            </ul>
            <ul>
              <li />
              <li />
            </ul>
          </InfoWrapper>
        </BoardItemContents>
      </BoardItemWrapper>
    </li>
  );
}

export default BoardSceletonItem;

const BoardItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 60px;
  border-bottom: 1px solid #000;
  padding-bottom: 46px;
  margin-bottom: 46px;
  cursor: pointer;

  a {
    display: contents;
  }

  @media screen and (max-width: 820px) {
    flex-direction: column;
    gap: 6px;
    padding-bottom: 10px;
    border: none;
    margin-bottom: 0;
  }

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
`;

const BoardItemImage = styled.div`
  min-width: 210px;
  height: 297px;
  position: relative;
  border: 1px solid #d9d9d9;
  animation: skeleton-gradient 1.5s infinite ease-in-out;

  @media screen and (max-width: 820px) {
    min-width: auto;
    width: 100%;
    aspect-ratio: 132/187;
    height: auto;
  }
`;

const BoardItemContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    width: 112px;
    height: 30px;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
    border-radius: 15px;
    color: #fff;
    font-size: 18px;
  }

  h3 {
    font-size: 30px;
    font-weight: 500;
    line-height: 50px;
    height: 150px;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }

  @media screen and (max-width: 820px) {
    gap: 8px;

    p {
      width: 70px;
      height: 22px;
      font-size: 11px;
    }

    h3 {
      font-size: 12px;
      font-weight: 700;
      line-height: 16px;
      height: 32px;
      margin-bottom: 10px;
      -webkit-line-clamp: 2;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ul {
    display: flex;
    align-items: center;

    li {
      font-size: 18px;
      animation: skeleton-gradient 1.5s infinite ease-in-out;
      width: 150px;
      height: 28px;
    }
  }

  @media screen and (max-width: 820px) {
    gap: 4px;
    margin-top: 6px;

    ul {
      li {
        width: 100%;
        height: 13px;
      }
    }
  }
`;
