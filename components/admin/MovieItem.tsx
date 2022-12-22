import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { IMovieData } from 'types/dataTypes';
import { useRouter } from 'next/router';

interface IMovieItemProps {
  data: IMovieData;
  deleteMovieItem: (id: string) => Promise<void>;
}

export function MovieItem({ data, deleteMovieItem }: IMovieItemProps) {
  const router = useRouter();

  const redirectUpdate = () => {
    router.push(
      {
        pathname: `/admin/notice/Movie/update`,
        query: { ...data },
      },
      `/admin/notice/Movie/update`,
    );
  };

  return (
    <li>
      <MovieItemWrapper>
        <ThumbnailWrapper>
          <a href={data.ytbUrl} target="_blank">
            <ImageWrapper>
              <Image
                src={data.ytbThumbnail as string}
                layout="fill"
                alt={data.title}
                objectFit="cover"
              />
            </ImageWrapper>
            <MovieBg>
              <IconPlay />
            </MovieBg>
          </a>
          <AdminButtonWrapper>
            <AdminButton onClick={redirectUpdate}>수정</AdminButton>
            <AdminButton onClick={() => deleteMovieItem(data.id as string)}>삭제</AdminButton>
          </AdminButtonWrapper>
        </ThumbnailWrapper>

        <h3>{data.title}</h3>
        <InfoWrapper>
          <li>{data.ytbFrom}</li>
          <li>{data.ytbDate}</li>
        </InfoWrapper>
      </MovieItemWrapper>
    </li>
  );
}

const MovieItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  overflow: hidden;

  a {
    display: contents;
  }

  h3 {
    font-size: 24px;
    font-weight: 700;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ThumbnailWrapper = styled.div`
  aspect-ratio: 580/270;
  position: relative;
`;

const ImageWrapper = styled.div`
  height: 100%;
`;

const MovieBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: 0.5s;

  &:hover {
    opacity: 0;
  }
`;

const IconPlay = styled.div`
  width: 100px;
  aspect-ratio: 1;
  background: url('/images/moviePlay.png') no-repeat center/cover;

  @media screen and (max-width: 820px) {
    width: 50px;
  }
`;

const AdminButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

const AdminButton = styled.div`
  width: 90px;
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

const InfoWrapper = styled.ul`
  display: flex;
  align-items: center;

  li {
    font-size: 20px;

    &:first-child {
      display: flex;
      align-items: center;

      &::after {
        content: '';
        display: block;
        width: 1px;
        height: 20px;
        background-color: #000;
        margin: 0 20px;
      }
    }
  }
`;
