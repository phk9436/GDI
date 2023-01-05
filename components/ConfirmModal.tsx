import { confirmOpen } from 'atoms/layout';
import React, { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

interface IConfirmProps {
  password: string;
  setPassword: (value: React.SetStateAction<string>) => void;
  checkPassword: () => void;
}

function ConfirmModal({ password, setPassword, checkPassword }: IConfirmProps) {
  const setIsOpened = useSetRecoilState(confirmOpen);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickCancel = () => {
    setPassword('');
    setIsOpened(false);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onClickWrapper = () => setIsOpened(false);

  useEffect(() => inputRef.current?.focus());

  return (
    <Wrapper onClick={onClickWrapper}>
      <Container>
        <p>비밀번호를 입력해주세요.</p>
        <InputConfirm
          type="password"
          value={password}
          onChange={onChangePassword}
          inputMode="decimal"
          ref={inputRef}
        />
        <ButtonWrapper>
          <ButtonSubmit onClick={checkPassword}>확인</ButtonSubmit>
          <ButtonCancel onClick={onClickCancel}>취소</ButtonCancel>
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
}

export default ConfirmModal;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
`;

const Container = styled.div`
  padding: 30px 40px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 16px;
  }
`;

const InputConfirm = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid #000;
  font-size: 16px;
  padding: 4px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 4px;
`;

const ButtonSubmit = styled.div`
  padding: 6px 10px;
  background-color: #1f4788;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonCancel = styled.div`
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: #f6f6f6;
  justify-content: center;
  align-items: center;
`;
