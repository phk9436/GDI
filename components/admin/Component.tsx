import styled from 'styled-components';
import Image from 'next/image';
import React from 'react';

interface uploadProps {
  id: string;
  accept: string;
}

interface inputFileProps extends uploadProps {
  text: string;
}

interface inputHideProps extends uploadProps {
  type: string;
}

interface inputTextProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface blueButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  disabled: boolean;
}

export function UploadInput({ id, accept }: uploadProps) {
  return (
    <>
      <UploadLabel htmlFor={id}>
        <ImageWrapper>
          <Image src="/images/iconDownload.png" layout="fill" alt="download" />
        </ImageWrapper>
        <p>
          썸네일 업로드
          <br />
          확장자 jpg, png
        </p>
      </UploadLabel>
      <InputHide type="file" accept={accept} id={id} />
    </>
  );
}

const UploadLabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  p {
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    color: #a4a4a4;
  }
`;

const ImageWrapper = styled.div`
  width: 28px;
  height: 28px;
  position: relative;
`;

export function InputHide({ type, accept = '*', id }: inputHideProps) {
  return <InputHideComponent type={type} accept={accept} id={id} />;
}

const InputHideComponent = styled.input`
  display: none;
`;

export function InputText({ type, placeholder, value, onChange }: inputTextProps) {
  return <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />;
}

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 17px 18px;
  border: 1px solid transparent;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  caret-color: #1f4788;
  transition: 0.2s;

  &::placeholder {
    color: #a4a4a4;
  }

  &:hover,
  &:focus {
    border: 1px solid #d9d9d9;
  }
`;

export function InputFile({ id, accept, text }: inputFileProps) {
  return (
    <>
      <LabelFile htmlFor={id}>{text}</LabelFile>
      <InputHide type="file" accept={accept} id={id} />
    </>
  );
}

const LabelFile = styled.label`
  width: 100%;
  height: 50px;
  padding: 17px 18px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 500;
  color: #a4a4a4;
  transition: 0.2s;
  background: #f6f6f6 url('/images/iconDownload.png') no-repeat center right 24px/28px 28px;

  &:hover,
  &:focus {
    border: 1px solid #d9d9d9;
  }
`;

export function BlueButton({ type, text, disabled = false }: blueButtonProps) {
  return (
    <BlueButtonComponent type={type} disabled={disabled}>
      {text}
      <img src="/images/buttonArrow.png" alt="buttonArrow" />
    </BlueButtonComponent>
  );
}

const BlueButtonComponent = styled.button`
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding-right: 20px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background-color: #1f4788;
  transition: 0.3s;
  cursor: pointer;

  img {
    width: 28px;
  }

  &:hover {
    background-color: #092d68;
  }
`;
