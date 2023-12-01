import styled from 'styled-components';
import Image from 'next/image';
import { BlueButton, InputText, InputDate } from 'components/board/Components';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Loading from 'components/Loading';
import { createMovie } from 'utils/createBoardUtils';
import { toast } from 'react-toastify';
import { HeadMeta } from 'components/Components';

function Create() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [ytbUrl, setYtbUrl] = useState('');
  const [ytbFrom, setYtbFrom] = useState('');
  const [ytbDate, setYtbDate] = useState('');
  const [ytbThumbnail, setYtbThumbnail] = useState('');
  const router = useRouter();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeYtbUrl = (e: React.ChangeEvent<HTMLInputElement>) => setYtbUrl(e.target.value);
  const onChangeYtbFrom = (e: React.ChangeEvent<HTMLInputElement>) => setYtbFrom(e.target.value);
  const onChangeYtbDate = (e: React.ChangeEvent<HTMLInputElement>) => setYtbDate(e.target.value);

  const onClickUrlButton = () => {
    if (!ytbUrl) {
      toast.error('영상 링크를 등록해주세요.');
      return;
    }
    if (!ytbUrl.includes('https://youtu.be/')) {
      toast.error('유튜브 링크가 아닙니다.');
      return;
    }
    const ytbId = ytbUrl.split('/').at(-1);
    setYtbThumbnail(`https://img.youtube.com/vi/${ytbId}/0.jpg`);
  };

  const onSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const context = {
      title,
      ytbUrl,
      ytbFrom,
      ytbDate,
      ytbThumbnail,
    };
    if (!(title && ytbUrl && ytbFrom && ytbDate && ytbThumbnail)) {
      toast.error('항목이 모두 작성되지 않았습니다');
      setLoading(false);
      return;
    }
    const isPostCreated = await createMovie(context);
    if (!isPostCreated) {
      toast.error('알 수 없는 에러가 발생했습니다.');
      router.push('/admin/notice/Movie');
      setLoading(false);
      return;
    }
    toast.success('게시글이 작성되었습니다');
    router.push('/admin/notice/Movie');
    setLoading(false);
  };
  return (
    <>
      <HeadMeta title="GDI | 어드민 | GDI 영상관 | 작성하기" />
      <Wrapper>
        <Title>GDI영상관 게시글 작성</Title>
        <form onSubmit={onSubmitPost}>
          <InputWrapper>
            <UploadWrapper>
              {ytbThumbnail ? (
                <PreviewWrapper>
                  <Image src={ytbThumbnail} layout="fill" alt="thumbnail" objectFit="cover" />
                </PreviewWrapper>
              ) : (
                <p>썸네일 미리보기</p>
              )}
            </UploadWrapper>
            <InputContainer>
              <InputText
                type="text"
                placeholder="제목 입력"
                value={title}
                onChange={onChangeTitle}
              />
              <UrlWrapper>
                <InputText
                  type="url"
                  placeholder="영상링크 입력"
                  value={ytbUrl}
                  onChange={onChangeYtbUrl}
                />
                <UrlButton onClick={onClickUrlButton}>확인</UrlButton>
              </UrlWrapper>
              <InputFlexContainer>
                <InputText
                  type="text"
                  placeholder="영상 출처 입력"
                  value={ytbFrom}
                  onChange={onChangeYtbFrom}
                />
                <InputDate
                  type="date"
                  placeholder="연도-월-일"
                  value={ytbDate}
                  onChange={onChangeYtbDate}
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

const UploadWrapper = styled.div`
  min-width: 400px;
  height: 184px;
  border: 1px solid #a4a4a4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #a4a4a4;

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

const ButtonWrapper = styled.div`
  width: 186px;
  min-width: 186px;
  margin-top: 30px;
  margin-left: auto;
`;

const PreviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const UrlWrapper = styled.div`
  position: relative;
`;

const UrlButton = styled.div`
  width: 76px;
  height: 36px;
  background-color: #fff;
  border: 2px solid #d9d9d9;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 500;
  color: #a4a4a4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: calc(50% - 18px);
  right: 7px;
`;
