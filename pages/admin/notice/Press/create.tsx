import styled from 'styled-components';
import { BlueButton, InputText, InputDate } from 'components/admin/Component';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Loading from 'components/admin/Loading';
import { createPress } from 'utils/createBoardUtils';
import { toast } from 'react-toastify';

function Create() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [pressUrl, setPressUrl] = useState('');
  const [pressFrom, setPressFrom] = useState('');
  const [pressDate, setPressDate] = useState('');
  const router = useRouter();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangePressUrl = (e: React.ChangeEvent<HTMLInputElement>) => setPressUrl(e.target.value);
  const onChangePressFrom = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPressFrom(e.target.value);
  const onChangePressDate = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPressDate(e.target.value);

  const onSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const context = {
      title,
      pressUrl,
      pressFrom,
      pressDate,
    };
    if (title && pressUrl && pressFrom && pressDate) {
      const checkUrl = /^(http(s)?:\/\/)([^\/]*)(\.)(com|net|kr|my|shop)(\/)/gi;
      if (!checkUrl.test(pressUrl)) {
        toast.error('유효한 url이 아닙니다.');
      } else {
        await createPress(context);
        toast.success('게시글이 작성되었습니다');
        router.push('/admin/notice/Press');
      }
    } else {
      toast.error('항목이 모두 작성되지 않았습니다');
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper>
        <Title>언론보도 게시글 작성</Title>
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
                type="url"
                placeholder="기사 링크 입력"
                value={pressUrl}
                onChange={onChangePressUrl}
              />
              <InputFlexContainer>
                <InputText
                  type="text"
                  placeholder="기사 출처 입력"
                  value={pressFrom}
                  onChange={onChangePressFrom}
                />
                <InputDate
                  type="date"
                  placeholder="연도-월-일"
                  value={pressDate}
                  onChange={onChangePressDate}
                />
              </InputFlexContainer>
            </InputContainer>
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

const InputFlexContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 186px;
  min-width: 186px;
  margin-top: 30px;
`;
