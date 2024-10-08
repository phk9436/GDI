import styled from 'styled-components';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from 'components/Loading';
import { BlueButton, InputText } from 'components/board/Components';
import { Editor } from '@toast-ui/react-editor';
import PostEditor from 'components/editor/Editor';
import { doc, getDoc } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { updateBoardData } from 'utils/updateBoardUtils';
import { toast } from 'react-toastify';
import { HeadMeta } from 'components/Components';

function update() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(router.query.title as string);
  const [email, setEmail] = useState(router.query.email as string);
  const [author, setAuthor] = useState(router.query.author as string);
  const [initContent, setInitContent] = useState('');
  const contentRef = useRef<Editor>();

  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>
  }

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const onBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const checkEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!checkEmail.test(value) && value.length > 0) {
      toast('이메일이 유효하지 않습니다.');
      setEmail('');
    }
  };
  const onChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const checkKor = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
    if (!checkKor.test(value) && value.length > 0) {
      setAuthor(value.substring(0, value.length - 1));
      return;
    }
    setAuthor(value);
  };

  const onBlurAuthor = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const checkKor = /^[가-힣|a-z|A-Z]+$/;
    if (!checkKor.test(value) && value.length > 0) {
      toast('이름이 유효하지 않습니다.');
      setAuthor('');
    }
  };

  const updateBoardItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const content = contentRef.current?.getInstance().getMarkdown();
    if (!title || !author || !email || !content) {
      toast.error('항목이 모두 채워지지 않았습니다.');
      setLoading(false);
      return;
    }
    const isUpdated = await updateBoardData({
      id,
      title,
      author,
      email,
      content,
    });
    if (!isUpdated) {
      toast.error('알 수 없는 에러가 발생했습니다.');
      router.push('/board');
      setLoading(false);
      return;
    }
    toast.success('수정 완료됐습니다.');
    router.push('/board');
    setLoading(false);
  };

  const getContent = async () => {
    try {
      const data = await getDoc(doc(dbService, `boardContent`, `${id}`));
      setInitContent(data.data()?.content);
    } catch (err) {
      toast.error('알 수 없는 에러가 발생했습니다.');
      router.push('/board');
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
      <HeadMeta title="GDI | 연구제안 | 수정하기" />
      <Wrapper>
        <Title>연구제안 게시글 수정</Title>
        <form onSubmit={updateBoardItem}>
          <InputWrapper>
            <InputContainer>
              <InputText
                type="text"
                placeholder="제목 입력"
                value={title}
                onChange={onChangeTitle}
              />
              <InputText
                type="email"
                placeholder="이메일 주소 입력"
                value={email}
                onChange={onChangeEmail}
                onBlur={onBlurEmail}
              />
              <InputFlexContainer>
                <InputText
                  type="text"
                  placeholder="작성자 성명"
                  value={author}
                  onChange={onChangeAuthor}
                  onBlur={onBlurAuthor}
                  inputMode="text"
                  pattern="^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$"
                />
              </InputFlexContainer>
            </InputContainer>
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
          </InputWrapper>
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

  @media screen and (max-width: 820px) {
    padding: 40px 20px 140px;
  }
`;

const Title = styled.h3`
  font-size: 36px;
  font-weight: 700;
  padding-bottom: 40px;
  border-bottom: 1px solid #5b5859;

  @media screen and (max-width: 820px) {
    font-size: 18px;
    padding-bottom: 10px;
  }
`;
const InputWrapper = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 820px) {
    margin: 20px 0;
    gap: 20px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 820px) {
    gap: 10px;
  }
`;

const InputFlexContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ButtonWrapper = styled.div`
  width: 186px;
  min-width: 186px;
  margin-top: 30px;
  margin-left: auto;
`;

const EdiorWrapper = styled.div`
  width: 100%;
  height: 550px;

  @media screen and (max-width: 820px) {
    height: 400px;
  }
`;
