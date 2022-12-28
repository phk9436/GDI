import styled from 'styled-components';
import { BlueButton, LabelFile, InputText, InputHide } from 'components/admin/Component';
import { useState, useRef } from 'react';
import PostEditor from 'components/editor/Editor';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import { createNotice, uploadFile } from 'utils/createBoardUtils';
import Loading from 'components/admin/Loading';

function Create() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const contentRef = useRef<Editor>();
  const router = useRouter();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFile(e, setFileName, setFileUrl);
  };

  const onSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const content = contentRef.current?.getInstance().getMarkdown();
    const context = {
      title,
      content,
      fileUrl,
      fileName,
    };

    if (title && content) {
      await createNotice(context);
      alert('게시글이 작성되었습니다');
      router.push('/admin/notice');
    } else {
      alert('항목이 모두 작성되지 않았습니다');
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper>
        <Title>공지사항 게시글 작성</Title>
        <form onSubmit={onSubmitPost}>
          <InputWrapper>
            <InputContainer>
              <InputText
                type="text"
                placeholder="제목 입력"
                value={title}
                onChange={onChangeTitle}
              />
              {fileName ? (
                <FileWrapper>
                  <File>{fileName}</File>
                  <Label htmlFor="uploadFileLab" />
                </FileWrapper>
              ) : (
                <LabelFile
                  htmlFor="uploadFileLab"
                  text="자료 업로드 (확장자 pdf, jpg, png, hwp, docx)"
                />
              )}
              <InputHide
                type="file"
                accept=".pdf, .png, .jpg, .hwp, docx"
                id="uploadFileLab"
                onChange={onChangeFile}
              />
            </InputContainer>
          </InputWrapper>
          <EdiorWrapper>
            <PostEditor ref={contentRef as React.MutableRefObject<Editor>} />
          </EdiorWrapper>
          <ButtonWrapper>
            <BlueButton type="submit" text="글 작성하기" disabled={loading} />
          </ButtonWrapper>
        </form>
      </Wrapper>
      {loading && <Loading />}
    </>
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
const InputContainer = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const FileWrapper = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
`;

const File = styled.div`
  height: 100%;
  padding: 17px 18px;
  font-size: 14px;
  font-weight: 500;
  background-color: #f6f6f6;
  color: #a4a4a4;
`;

const Label = styled.label`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
  cursor: pointer;
`;
