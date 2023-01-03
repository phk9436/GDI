import styled from 'styled-components';
import Image from 'next/image';
import {
  BlueButton,
  LabelFile,
  InputText,
  LabelUpload,
  InputHide,
  InputDate,
} from 'components/admin/Component';
import React, { useState, useRef, useEffect } from 'react';
import PostEditor from 'components/editor/Editor';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import Loading from 'components/admin/Loading';
import { createForum, uploadFile, uploadThumbnail } from 'utils/createBoardUtils';
import { toast } from 'react-toastify';

function Create() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [forumDate, setForumDate] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const contentRef = useRef<Editor>();
  const router = useRouter();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangePlace = (e: React.ChangeEvent<HTMLInputElement>) => setPlace(e.target.value);
  const onChangeForumDate = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForumDate(e.target.value);

  const onChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadThumbnail(e, setThumbnailUrl);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFile(e, setFileName, setFileUrl);
  };

  const onSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const content = contentRef.current?.getInstance().getMarkdown();
    const context = {
      title,
      place,
      forumDate,
      content,
      fileUrl,
      fileName,
      thumbnailUrl,
    };

    if (title && place && forumDate && content && thumbnailUrl) {
      await createForum(context);
      toast.success('게시글이 작성되었습니다');
      router.push('/admin/lab/Forum');
    } else {
      toast.error('항목이 모두 작성되지 않았습니다');
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper>
        <Title>학술포럼 게시글 작성</Title>
        <form onSubmit={onSubmitPost}>
          <InputWrapper>
            <UploadWrapper>
              {thumbnailUrl ? (
                <PreviewWrapper>
                  <Image src={thumbnailUrl} layout="fill" alt="thumbnail" objectFit="cover" />
                  <Label htmlFor="uploadForum" />
                </PreviewWrapper>
              ) : (
                <LabelUpload htmlFor="uploadForum" />
              )}
              <InputHide
                type="file"
                accept=".png, .jpg"
                id="uploadForum"
                onChange={onChangeThumbnail}
              />
            </UploadWrapper>
            <InputContainer>
              <InputText
                type="text"
                placeholder="제목 입력"
                value={title}
                onChange={onChangeTitle}
              />
              <InputFlexContainer>
                <InputText
                  type="text"
                  placeholder="개최 장소 입력"
                  value={place}
                  onChange={onChangePlace}
                />
                <InputDate
                  type="date"
                  placeholder="연도-월-일"
                  value={forumDate}
                  onChange={onChangeForumDate}
                />
              </InputFlexContainer>
              {fileName ? (
                <FileWrapper>
                  <File>{fileName}</File>
                  <Label htmlFor="uploadFileForum" />
                </FileWrapper>
              ) : (
                <LabelFile htmlFor="uploadFileForum" text="자료 업로드 (확장자 pdf, jpg, png)" />
              )}
              <InputHide
                type="file"
                accept=".pdf, .png, .jpg"
                id="uploadFileForum"
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

const PreviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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
