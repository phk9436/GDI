import styled from 'styled-components';
import Image from 'next/image';
import {
  BlueButton,
  LabelFile,
  InputText,
  LabelUpload,
  InputHide,
} from 'components/admin/Component';
import { useState, useRef } from 'react';
import PostEditor from 'components/editor/Editor';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import { createLab, uploadFile, uploadThumbnail } from 'utils/createBoardUtils';
import Loading from 'components/admin/Loading';
import { toast } from 'react-toastify';

function Create() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const contentRef = useRef<Editor>();
  const router = useRouter();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value);
  const onChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const checkNum = /[0-9]$/g;
    if (value.length > 4) {
      setYear(value.substring(0, 4));
      return;
    } else if (!checkNum.test(value) && value.length > 0) {
      setYear(value.substring(0, value.length - 1));
      return;
    }
    setYear(e.target.value);
  };

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
      author,
      year,
      content,
      fileUrl,
      fileName,
      thumbnailUrl,
    };

    if (title && author && year && content && thumbnailUrl && fileUrl) {
      if (year.length !== 4) {
        toast.error('????????? 4????????? ??????????????????.');
      } else {
        await createLab(context);
        toast.success('???????????? ?????????????????????');
        router.push('/admin/lab');
      }
    } else {
      toast.error('????????? ?????? ???????????? ???????????????');
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper>
        <Title>??????????????? ????????? ??????</Title>
        <form onSubmit={onSubmitPost}>
          <InputWrapper>
            <UploadWrapper>
              {thumbnailUrl ? (
                <PreviewWrapper>
                  <Image src={thumbnailUrl} layout="fill" alt="thumbnail" objectFit="cover" />
                  <Label htmlFor="uploadLab" />
                </PreviewWrapper>
              ) : (
                <LabelUpload htmlFor="uploadLab" />
              )}
              <InputHide
                type="file"
                accept=".png, .jpg"
                id="uploadLab"
                onChange={onChangeThumbnail}
              />
            </UploadWrapper>
            <InputContainer>
              <InputText
                type="text"
                placeholder="?????? ??????"
                value={title}
                onChange={onChangeTitle}
              />
              <InputFlexContainer>
                <InputText
                  type="text"
                  placeholder="?????? ?????? ??????"
                  value={author}
                  onChange={onChangeAuthor}
                />
                <InputText
                  type="number"
                  placeholder="???????????? ??????"
                  value={year}
                  onChange={onChangeYear}
                />
              </InputFlexContainer>
              {fileName ? (
                <FileWrapper>
                  <File>{fileName}</File>
                  <Label htmlFor="uploadFileLab" />
                </FileWrapper>
              ) : (
                <LabelFile htmlFor="uploadFileLab" text="?????? ????????? (????????? pdf, jpg, png)" />
              )}
              <InputHide
                type="file"
                accept=".pdf, .png, .jpg"
                id="uploadFileLab"
                onChange={onChangeFile}
              />
            </InputContainer>
          </InputWrapper>
          <EdiorWrapper>
            <PostEditor ref={contentRef as React.MutableRefObject<Editor>} />
          </EdiorWrapper>
          <ButtonWrapper>
            <BlueButton type="submit" text="??? ????????????" disabled={loading} />
          </ButtonWrapper>
        </form>
      </Wrapper>
      {loading && <Loading />}
    </>
  );
}

export default Create;

const Wrapper = styled.div`
  max-width: 1300px;
  padding: 70px 60px 140px;
  margin: auto;
`;

const Title = styled.h3`
  font-size: 36px;
  font-weight: 700;
  padding-bottom: 40px;
  border-bottom: 1px solid #5B5859;
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
