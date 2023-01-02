import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IUploadProps {
  htmlFor: string;
}

interface ILabelFileProps {
  text: string;
  htmlFor: string;
}

interface IInputHideProps {
  id: string;
  type: string;
  value?: string;
  accept: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IInputTextProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

interface IBlueButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  disabled: boolean;
}

interface IUploadButtonProps {
  tap: string[];
}

export function LabelUpload({ htmlFor }: IUploadProps) {
  return (
    <>
      <UploadLabel htmlFor={htmlFor}>
        <ImageWrapper>
          <Image src="/images/iconDownload.png" layout="fill" alt="download" />
        </ImageWrapper>
        <p>
          썸네일 업로드
          <br />
          확장자 jpg, png
        </p>
      </UploadLabel>
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

export function InputHide({ type, accept = '*', id, onChange, value }: IInputHideProps) {
  return (
    <InputHideComponent type={type} accept={accept} id={id} onChange={onChange} value={value} />
  );
}

const InputHideComponent = styled.input`
  display: none;
`;

export function InputText({
  type,
  placeholder,
  value,
  onChange,
  onBlur = () => {},
}: IInputTextProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
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

export function InputDate({ type, placeholder, value, onChange }: IInputTextProps) {
  return (
    <InputDateComponent
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
}

const InputDateComponent = styled.input`
  width: 100%;
  height: 50px;
  padding: 17px 18px;
  border: 1px solid transparent;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-weight: 700;
  color: #a4a4a4;
  caret-color: #1f4788;
  transition: 0.2s;
  position: relative;

  &:hover,
  &:focus {
    border: 1px solid #d9d9d9;
  }

  &:focus,
  &:valid {
    color: #000;
  }

  &::-webkit-calendar-picker-indicator {
    background: transparent;
    z-index: 1;
    cursor: pointer;
    width: 40px;
    height: 36px;
  }

  &::after {
    content: '';
    display: block;
    width: 36px;
    height: 36px;
    background: url('/images/iconCalendar.png') no-repeat center/100%;
    position: absolute;
    right: 20px;
  }
`;

export function LabelFile({ htmlFor, text }: ILabelFileProps) {
  return (
    <>
      <LabelFileComponent htmlFor={htmlFor}>{text}</LabelFileComponent>
    </>
  );
}

const LabelFileComponent = styled.label`
  width: 100%;
  height: 50px;
  padding: 17px 18px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 500;
  color: #a4a4a4;
  transition: 0.2s;
  cursor: pointer;
  background: #f6f6f6 url('/images/iconDownload.png') no-repeat center right 24px/28px 28px;

  &:hover,
  &:focus {
    border: 1px solid #d9d9d9;
  }
`;

export function BlueButton({ type, text, disabled = false }: IBlueButtonProps) {
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

export function UploadButton({ tap }: IUploadButtonProps) {
  return (
    <UploadButtonWrapper>
      <Link href={`${tap[2]}/create`}>
        <a>
          <em>{tap[0]}</em>업로드<span>+</span>
        </a>
      </Link>
    </UploadButtonWrapper>
  );
}

const UploadButtonWrapper = styled.div`
  width: 100%;
  height: 80px;
  margin-bottom: 56px;
  background-color: #c7c7c7;
  transition: 0.3s;
  font-size: 24px;
  color: #fff;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  em {
    font-weight: 700;
    margin-right: 6px;
  }

  span {
    color: #000;
    margin-left: 20px;
  }

  &:hover {
    background-color: #a4a4a4;
  }

  @media screen and (max-width: 820px) {
    height: 40px;
    font-size: 14px;
    margin-bottom: 28px;
  }
`;
