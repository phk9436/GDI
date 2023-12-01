import styled from 'styled-components';

function Loading() {
  return <Wrapper>잠시만 기다려주세요...</Wrapper>;
}

export default Loading;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-size: 30px;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
`;
