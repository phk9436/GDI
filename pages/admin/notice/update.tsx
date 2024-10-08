import { useRouter } from 'next/router';
import styled from 'styled-components';
import { BlueButton, LabelFile, InputText, InputHide } from 'components/board/Components';
import { useState, useEffect, useRef } from 'react';
import Loading from 'components/Loading';
import { Editor } from '@toast-ui/react-editor';
import { updateNoticeData } from 'utils/updateBoardUtils';
import { uploadFile } from 'utils/createBoardUtils';
import PostEditor from 'components/editor/Editor';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { toast } from 'react-toastify';
import { HeadMeta } from 'components/Components';

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
    if (typeof fileId !== 'string' || typeof id !== 'string' || !contentRef.current) {
      return;
    }
    e.preventDefault();
    setLoading(true);
    const content = contentRef.current.getInstance().getMarkdown();
    const context = {
      id,
      title,
      fileId,
      fileName,
      fileUrl,
      content,
    };
    if (!title || !content) {
      toast.error('항목이 모두 채워지지 않았습니다.');
      setLoading(false);
      return;
    }
    const isUpdated = await updateNoticeData(context, isFileChanged);
    if (!isUpdated) {
      toast.error('알 수 없는 에러가 발생했습니다.');
      router.push('/admin/notice');
      setLoading(false);
      return;
    }
    toast.success('수정 완료됐습니다.');
    router.push('/admin/notice');
    setLoading(false);
  };

  const getContent = async () => {
    try {
      const data = await getDoc(doc(dbService, 'noticeContent', `${id}`));
      setInitContent(data.data()?.content);
    } catch (err) {
      toast.success('수정 완료됐습니다.');
      router.push('/admin/notice');
    }

  };

  useEffect(() => {
    if (!id) {
      toast.error('잘못된 접근입니다.');
      router.back();
    }
    getContent();
  }, []);
  return (
    <>
      <HeadMeta title="GDI | 어드민 | 공지사항 | 수정하기" />
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
            {initContent ? (
              <PostEditor
                ref={contentRef as React.MutableRefObject<Editor>}
                initialValue={initContent}
              />
            ) : (
              <div>게시글을 불러오고 있습니다...</div>
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
  max-width: 1300px;
  padding: 70px 60px 140px;
  margin: auto;
`;

const Title = styled.h3`
  font-size: 36px;
  font-weight: 700;
  padding-bottom: 40px;
  border-bottom: 1px solid #5b5859;
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
