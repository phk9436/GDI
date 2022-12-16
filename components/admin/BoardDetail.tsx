import styled from 'styled-components';
import Image from 'next/image';
import { IBoardData } from 'types/dataTypes';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';

interface IBoardDetailProps {
  data: IBoardData;
  path: string;
  category: string;
  deleteBoardItem: (
    id: string,
    fileId: string | undefined,
    thumbnailId: string | undefined,
  ) => void;
}

const PostViewer = dynamic(() => import('components/viewer/Viewer'), {
  ssr: false,
});

function BoardDetail({ data, path, category, deleteBoardItem }: IBoardDetailProps) {
  const router = useRouter();

  const redirectUpdate = () => {
    router.push(
      {
        pathname: `${path}/update`,
        query: {
          id: data.id,
          title: data.title,
          author: data.author,
          year: data.year,
          content: data.content,
          fileId: data.fileId,
          fileData: data.fileData,
          fileName: data.fileName,
          thumbnailId: data.thumbnailId,
          thumbnailData: data.thumbnailData,
          category,
        },
      },
      `${path}/update`,
    );
  };

  return (
    <Wrapper>
      <DetailTop>
        <ThumbnailWrapper>
          <Image src={data.thumbnailData as string} layout="fill" alt='thumbnail' objectFit="cover" />
        </ThumbnailWrapper>
        <DetailTopContainer>
          <p>{data.date}</p>
          <h3>{data.title}</h3>
          <InfoWrapper>
            <ul>
              <li>
                <p>저자</p>
              </li>
              <li>{data.author}</li>
            </ul>
            <ul>
              <li>
                <p>발행년도</p>
              </li>
              <li>{data.year}</li>
            </ul>
          </InfoWrapper>
        </DetailTopContainer>
        <DetailButtonWrapper>
          <AdminButtons>
            <AdminButton onClick={redirectUpdate}>수정</AdminButton>
            <AdminButton
              onClick={() => deleteBoardItem(data.id as string, data.fileId, data.thumbnailId)}
            >
              삭제
            </AdminButton>
          </AdminButtons>
          <ButtonDownLoad>
            <a href={data.fileData} download={data.fileName}>
              자료 다운로드
            </a>
          </ButtonDownLoad>
        </DetailButtonWrapper>
      </DetailTop>
      <DetailBody>
        <ContentWrapper>
          <PostViewer content={data.content as string} />
        </ContentWrapper>
        <Link href={path}>
          <a>
            <ButtonBack>목록으로 이동</ButtonBack>
          </a>
        </Link>
      </DetailBody>
    </Wrapper>
  );
}

export default BoardDetail;

const Wrapper = styled.div`
  max-width: 1440px;
  padding: 56px 60px 140px;
  margin: auto;
`;

const DetailTop = styled.div`
  margin: 0 0 36px;
  display: flex;
  align-items: flex-end;
  gap: 60px;
  border-bottom: 1px solid #000000;
  padding-bottom: 47px;
`;

const ThumbnailWrapper = styled.div`
  min-width: 210px;
  height: 297px;
  position: relative;
  border: 1px solid #d9d9d9;
`;

const DetailTopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > p {
    width: 112px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    color: #fff;
  }

  h3 {
    font-size: 36px;
    font-weight: 500;
    line-height: 50px;
    height: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ul {
    display: flex;
    align-items: center;

    li {
      font-size: 18px;

      p {
        width: 74px;
      }

      &:first-child {
        font-weight: 700;
        display: flex;
        align-items: center;

        &::after {
          content: '';
          display: block;
          width: 1px;
          height: 28px;
          background-color: #000;
          margin: 0 18px;
        }
      }
    }
  }
`;

const DetailButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 186px;
  width: 186px;
  margin-top: auto;
`;

const ButtonDownLoad = styled.div`
  height: 50px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  background: #000 url('/images/iconDownload.png') no-repeat center right 20px/28px 28px;

  a {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 50px;
  }
`;

const AdminButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const AdminButton = styled.div`
  width: 100%;
  height: 50px;
  background-color: #c7c7c7;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #fff;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #a4a4a4;
  }
`;

const DetailBody = styled.div``;

const ContentWrapper = styled.div`
  padding: 28px;
  background-color: #f7f7f7;
  min-height: 400px;
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
  color: #5b5859;
`;

const ButtonBack = styled.div`
  width: 186px;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 22px;
  padding-right: 26px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background: #1f4788 url('/images/arrowLinkBack.png') no-repeat left 20px center/28px 28px;
  cursor: pointer;
`;
