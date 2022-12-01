import styled from 'styled-components';
import { mobileMenuOpen } from 'atoms/layout';
import { useSetRecoilState } from 'recoil';

function GnbButton() {
  const setIsOpen = useSetRecoilState(mobileMenuOpen);

  const onClickButton = () => setIsOpen((state) => !state);

  return (
    <Wrapper onClick={onClickButton}>
      <BtnBar />
      <BtnBar />
      <BtnBar />
    </Wrapper>
  );
}

export default GnbButton;

const Wrapper = styled.div`
  width: 22px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: calc(50% - 9px);
  left: 26px;
  cursor: pointer;
`;

const BtnBar = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #1f4788;
`;
