import { useRouter } from 'next/router';
import styled from 'styled-components';
import { BlueButton, LabelFile, InputText, InputHide } from 'components/admin/Component';
import { useState, useEffect, useRef } from 'react';
import Loading from 'components/admin/Loading';
import { Editor } from '@toast-ui/react-editor';
import { updateNoticeData } from 'utils/updateBoardUtils';
import { uploadFile } from 'utils/createBoardUtils';
import PostEditor from 'components/editor/Editor';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';

function update() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(router.query.title as string);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>(router.query.fileName as string);
  const [isFileChanged, setIsFileChanged] = useState(false);
  const [initContent, setInitContent] = useState('');
  const contentRef = useRef<Editor>();

  const { id, fileId } = router.query;

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFile(e, setFileName, setFileUrl);
    isFileChanged || setIsFileChanged(true);
  };

  const updateBoardItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const content = contentRef.current?.getInstance().getMarkdown();
    const context = {
      id: router.query.id as string,
      title,
      fileId: router.query.fileId as string,
      fileName,
      fileUrl,
      content: content as string,
    };
    const update = await updateNoticeData(context, isFileChanged);
    if (update) {
      alert('수정 완료됐습니다');
      router.push('/admin/notice');
    }
    setLoading(false);
  };

  const getContent = async () => {
    const data = await getDoc(doc(dbService, 'noticeContent', `${id}`));
    setInitContent(data.data()?.content);
  };

  useEffect(() => {
    if (!router.query.id) {
      alert('잘못된 접근입니다.');
      router.back();
    }
    getContent();
  }, []);
  return (
    <>
      <Wrapper>
        <Title>공지사항 게시글 수정</Title>
        <form onSubmit={updateBoardItem}>
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
            {initContent && (
              <PostEditor
                ref={contentRef as React.MutableRefObject<Editor>}
                initialValue={initContent as string}
              />
            )}
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