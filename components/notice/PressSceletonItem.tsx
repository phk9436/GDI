import styled from 'styled-components';

function PressSceletonItem() {
  return (
    <li>
      <PressItemWrapper>
        <PressItemContainer>
          <h3 />
          <InfoWrapper />
        </PressItemContainer>
      </PressItemWrapper>
    </li>
  );
}

export default PressSceletonItem;

const PressItemWrapper = styled.div`
  padding-bottom: 36px;
  margin-bottom: 46px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  position: relative;

  & > a {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 820px) {
    padding-bottom: 20px;
    margin-bottom: 20px;
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

const PressItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;

  h3 {
    height: 40px;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }

  @media screen and (max-width: 820px) {
    gap: 12px;

    h3 {
      height: 16px;
    }
  }
`;

const InfoWrapper = styled.ul`
  display: flex;
  gap: 82px;
  margin-bottom: 10px;
  height: 28px;
  animation: skeleton-gradient 1.5s infinite ease-in-out;

  @media screen and (max-width: 820px) {
    height: 30px;
  }
`;