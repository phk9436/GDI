import styled from 'styled-components';

function SceletonNotice() {
  return (
    <>
      <ListContent>
        <Title />
        <Content />
      </ListContent>
      <ListContent>
        <Title />
        <Content />
      </ListContent>
      <ListContent>
        <Title />
        <Content />
      </ListContent>
      <ListContent>
        <Title />
        <Content />
      </ListContent>
    </>
  );
}

export default SceletonNotice;

const ListContent = styled.li`
  width: 100%;
  margin-bottom: 24px;
  border-bottom: 1px solid #000;

  @media screen and (max-width: 820px) {
    margin-bottom: 12px;

    &:nth-last-child(2) {
      margin-bottom: 24px;
    }
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

const Title = styled.div`
  height: 26px;
  animation: skeleton-gradient 1.5s infinite ease-in-out;

  @media screen and (max-width: 820px) {
    height: 16px;
  }
`;

const Content = styled.div`
  height: 22px;
  margin: 26px 0 30px;
  animation: skeleton-gradient 1.5s infinite ease-in-out;

  @media screen and (max-width: 820px) {
    height: 16px;
    margin: 10px 0 12px;
  }
`;
