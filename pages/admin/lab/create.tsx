import styled from 'styled-components';
import Image from 'next/image';
import { BlueButton, InputFile, InputText, UploadInput } from 'components/admin/Component';
import React, { useState, useRef, useEffect } from 'react';
import PostEditor from 'components/editor/Editor';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import { dbService, storageService } from 'api/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore';

function Create() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailName, setThumbnailName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const contentRef = useRef<Editor>();
  const router = useRouter();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value);
  const onChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => setYear(e.target.value);

  const uploadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files?.length) {
      alert('파일을 등록해주세요');
      return;
    }
    setThumbnailName(files[0].name);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => setThumbnailUrl(reader.result as string);
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files?.length) {
      alert('파일을 등록해주세요');
      return;
    }
    setFileName(files[0].name);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => setFileUrl(reader.result as string);
  };

  const onSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const createdAt = dayjs(new Date()).format('YYYYMMDDHHmmss');
    const content = contentRef.current?.getInstance().getMarkdown();

    let fileData = '';
    let fileId = '';
    if (fileUrl) {
      const fileV4Id = v4();
      const fileRef = ref(storageService, `lab/${fileV4Id}`);
      const data = await uploadString(fileRef, fileUrl, 'data_url');
      fileData = await getDownloadURL(data.ref);
      fileId = fileV4Id;
    }

    let thumbnailData = '';
    let thumbnailId = '';
    if (thumbnailUrl) {
      const thumbnailV4Id = v4();
      const thumbnailRef = ref(storageService, `lab/${thumbnailV4Id}`);
      const data = await uploadString(thumbnailRef, thumbnailUrl, 'data_url');
      thumbnailData = await getDownloadURL(data.ref);
      thumbnailId = thumbnailV4Id;
    }

    const context = {
      title,
      author,
      year,
      content,
      createdAt,
      view: 0,
      thumbnailData,
      thumbnailName,
      thumbnailId,
      fileData,
      fileName,
      fileId,
    };

    if (
      context.title &&
      context.author &&
      context.year &&
      context.content &&
      thumbnailData &&
      fileData
    ) {
      await addDoc(collection(dbService, 'lab'), context);
      await updateDoc(doc(dbService, 'meta', 'labCount'), {
        //전체 게시물 개수
        total: increment(1),
      });
      alert('게시글이 작성되었습니다');
      router.push('/admin/lab');
    } else {
      alert('항목이 모두 작성되지 않았습니다');
    }
    setLoading(false);
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
            {thumbnailUrl ? (
              <PreviewWrapper>
                <Image src={thumbnailUrl} layout="fill" alt="download" objectFit="cover" />
              </PreviewWrapper>
            ) : (
              <UploadInput id="uploadLab" accept=".png, .jpg" onChange={uploadThumbnail} />
            )}
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
            {fileName ? (
              <File>{fileName}</File>
            ) : (
              <InputFile
                id="uploadFileLab"
                accept=".pdf, .png, .jpg"
                text="자료 업로드 (확장자 pdf, jpg, png)"
                onChange={uploadFile}
              />
            )}
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

const PreviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const File = styled.div`
  width: 100%;
  height: 50px;
  padding: 17px 18px;
  font-size: 14px;
  font-weight: 500;
  background-color: #f6f6f6;
  color: #a4a4a4;
`;
