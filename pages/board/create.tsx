import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Loading from 'components/admin/Loading';
import { BlueButton, InputText } from 'components/admin/Component';
import { Editor } from '@toast-ui/react-editor';
import PostEditor from 'components/editor/Editor';
import { createBoard } from 'utils/createBoardUtils';
import { toast } from 'react-toastify';

function create() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const contentRef = useRef<Editor>();

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
    const checkKor = /^[ㄱ-ㅎ|가-힣]+$/;
    if (!checkKor.test(value) && value.length > 0) {
      setAuthor(value.substring(0, value.length - 1));
      return;
    }
    setAuthor(value);
  };

  const onBlurAuthor = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const checkKor = /^[가-힣]+$/;
    if (!checkKor.test(value) && value.length > 0) {
      toast('이름이 유효하지 않습니다.');
      setAuthor('');
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const checkNum = /[0-9]$/g;
    if (value.length > 4) {
      setPassword(value.substring(0, 4));
      return;
    } else if (!checkNum.test(value) && value.length > 0) {
      setPassword(value.substring(0, value.length - 1));
      return;
    }
    setPassword(value);
  };

  const onSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const content = contentRef.current?.getInstance().getMarkdown();
    const context = {
      title,
      email,
      author,
      password,
      content,
    };
    if (title && email && author && password) {
      await createBoard(context);
      toast.success('게시글이 작성되었습니다');
      router.push('/board');
    } else {
      toast.error('항목이 모두 작성되지 않았습니다');
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper>
        <Title>연구제안 게시글 작성</Title>
        <form onSubmit={onSubmitPost}>
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
                />
                <InputText
                  type="password"
                  placeholder="비밀번호 설정 (4자리 숫자)"
                  value={password}
                  onChange={onChangePassword}
                />
              </InputFlexContainer>
            </InputContainer>
            <EdiorWrapper>
              <PostEditor ref={contentRef as React.MutableRefObject<Editor>} />
            </EdiorWrapper>
            <ButtonWrapper>
              <BlueButton type="submit" text="글 작성하기" disabled={loading} />
            </ButtonWrapper>
          </InputWrapper>
        </form>
      </Wrapper>
      {loading && <Loading />}
    </>
  );
}

export default create;

const Wrapper = styled.div`
  max-width: 1440px;
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
  border-bottom: 1px solid #000000;

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
