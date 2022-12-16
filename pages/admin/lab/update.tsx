import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import Image from 'next/image';
import styled from 'styled-components';
import {
  BlueButton,
  LabelFile,
  InputText,
  LabelUpload,
  InputHide,
} from 'components/admin/Component';
import Loading from 'components/admin/Loading';
import PostEditor from 'components/editor/Editor';
import { updateBoardData } from 'utils/updateBoardUtils';
import { uploadFile, uploadThumbnail } from 'utils/createBoardUtils';

function update() {
  const router = useRouter();
  const [title, setTitle] = useState(router.query.title as string);
  const [author, setAuthor] = useState(router.query.author as string);
  const [year, setYear] = useState(router.query.year as string);
  const [loading, setLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(router.query.thumbnailUrl as string);
  const [fileUrl, setFileUrl] = useState<string>(router.query.fileUrl as string);
  const [fileName, setFileName] = useState<string>(router.query.fileName as string);
  const [isFileChanged, setIsFileChanged] = useState(false);
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);
  const contentRef = useRef<Editor>();

  const { id, category, fileId, thumbnailId } = router.query;

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value);
  const onChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => setYear(e.target.value);

  const onChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadThumbnail(e, setThumbnailUrl);
    isThumbnailChanged || setIsThumbnailChanged(true);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFile(e, setFileName, setFileUrl);
    isFileChanged || setIsFileChanged(true);
  };

  const updateBoardItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const content = contentRef.current?.getInstance().getMarkdown();
    await updateBoardData(
      id as string,
      category as string,
      title,
      content as string,
      author,
      year,
      isFileChanged,
      isThumbnailChanged,
      fileId as string,
      fileUrl,
      fileName,
      thumbnailId as string,
      thumbnailUrl,
    );
    alert('수정 완료됐습니다');
    setLoading(false);
    router.push('/admin/lab');
  };

  useEffect(() => {
    if (!router.query.id) {
      alert('잘못된 접근입니다.');
      router.back();
    }
  }, []);
  return (
    <>
      <Wrapper>
        <Title>연구보고서 게시글 작성</Title>
        <form onSubmit={(e) => updateBoardItem(e)}>
          <InputWrapper>
            <UploadWrapper>
              {thumbnailUrl ? (
                <PreviewWrapper>
                  <Image src={thumbnailUrl} layout="fill" alt="thumbnail" objectFit="cover" />
                  <Label htmlFor="uploadLab" />
                </PreviewWrapper>
              ) : (
                <PreviewWrapper>
                  <Image src={router.query.thumbnailData as string} layout="fill" alt="thumbnail" objectFit="cover" />
                  <Label htmlFor="uploadLab" />
                </PreviewWrapper>
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
                placeholder="제목 입력"
                value={title}
                onChange={onChangeTitle}
              />
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
              {fileName ? (
                <FileWrapper>
                  <File>{fileName}</File>
                  <Label htmlFor="uploadFileLab" />
                </FileWrapper>
              ) : (
                <LabelFile htmlFor="uploadFileLab" text="자료 업로드 (확장자 pdf, jpg, png)" />
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
            <PostEditor
              ref={contentRef as React.MutableRefObject<Editor>}
              initialValue={router.query.content as string}
            />
          </EdiorWrapper>
          <ButtonWrapper>
            <BlueButton type="submit" text="글 수정하기" disabled={loading} />
          </ButtonWrapper>
        </form>
      </Wrapper>
      {loading && <Loading />}
    </>
  );
}

export default update;

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
