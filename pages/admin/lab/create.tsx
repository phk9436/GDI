import styled from 'styled-components';
import Image from 'next/image';
import { BlueButton, InputFile, InputText, UploadInput } from 'components/admin/Component';
import React, { useState, useRef, useEffect } from 'react';
import PostEditor from 'components/editor/Editor';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';

function Create() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<Editor>();
  const router = useRouter();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value);
  const onChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => setYear(e.target.value);

  const onSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!sessionStorage.getItem('admin')) {
      alert('어드민 로그인이 필요합니다');
      router.push('/');
    }
  }, []);

  return (
    <Wrapper>
      <Title>연구보고서 게시글 작성</Title>
      <form onSubmit={onSubmitPost}>
        <InputWrapper>
          <UploadWrapper>
            <UploadInput id="uploadLab" accept=".png, .jpg" />
          </UploadWrapper>
          <InputContainer>
            <InputText type="text" placeholder="제목 입력" value={title} onChange={onChangeTitle} />
            <InputFlexContainer>
              <InputText
                type="text"
                placeholder="저자 성명 입력"
                value={author}
                onChange={onChangeAuthor}
              />
              <InputText
                type="text"
                placeholder="발행년도 입력"
                value={year}
                onChange={onChangeYear}
              />
            </InputFlexContainer>
            <InputFile
              id="uploadFileLab"
              accept=".pdf, .png, .jpg"
              text="자료 업로드 (확장자 pdf, jpg, png)"
            />
          </InputContainer>
        </InputWrapper>
        <EdiorWrapper>
          <PostEditor
            initialEditType="wysiwyg"
            height="100%"
            useCommandShortcut={false}
            autofocus={false}
            toolbarItems={[
              // 툴바 옵션 설정
              ['heading', 'bold', 'italic', 'strike'],
              ['hr', 'quote'],
              ['task', 'indent', 'outdent'],
              ['table', 'link'],
              ['code', 'codeblock'],
            ]}
            ref={contentRef as React.MutableRefObject<Editor>}
          />
        </EdiorWrapper>
        <ButtonWrapper>
          <BlueButton type="submit" text="글 작성하기" disabled={loading} />
        </ButtonWrapper>
      </form>
    </Wrapper>
  );
}

export default Create;

const Wrapper = styled.div`
  max-width: 1440px;
  padding: 70px 60px 140px;
  margin: auto;
`;

const Title = styled.h3`
  font-size: 36px;
  font-weight: 700;
  padding-bottom: 40px;
  border-bottom: 1px solid #000000;
`;
const InputWrapper = styled.div`
  margin: 40px 0;
  display: flex;
  align-items: flex-end;
  gap: 30px;
`;

const UploadWrapper = styled.div`
  min-width: 158px;
  height: 222px;
  border: 1px solid #a4a4a4;

  input {
    display: none;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputFlexContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const EdiorWrapper = styled.div`
  width: 100%;
  height: 550px;
`;

const ButtonWrapper = styled.div`
  width: 186px;
  margin-top: 30px;
  margin-left: auto;
`;
