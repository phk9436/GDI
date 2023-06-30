import styled from 'styled-components';
import Image from 'next/image';
import { IMovieItemProps } from 'types/componentPropTypes';

export function MovieItem({ data }: IMovieItemProps) {
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
    font-size: 26px;
    font-weight: 700;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 820px) {
    gap: 0;

    h3 {
      font-size: 14px;
      line-height: 20px;
      margin: 16px 0 8px;
      white-space: wrap;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
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

        @media screen and (max-width: 820px) {
          margin: 0 8px;
          height: 16px;
        }
      }
    }

    @media screen and (max-width: 820px) {
      font-size: 14px;
    }
  }
`;
