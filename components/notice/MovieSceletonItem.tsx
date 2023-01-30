import styled from 'styled-components';

function MovieSceletonItem() {
  return (
    <li>
      <MovieItemWrapper>
        <ThumbnailWrapper />
        <h3 />
        <InfoWrapper />
      </MovieItemWrapper>
    </li>
  );
}

export default MovieSceletonItem;

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
    height: 26px;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }

  @media screen and (max-width: 820px) {
    gap: 0;

    h3 {
      font-size: 14px;
      line-height: 20px;
      margin: 16px 0 8px;
    }
  }

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
`;

const ThumbnailWrapper = styled.div`
  aspect-ratio: 580/270;
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;

const InfoWrapper = styled.div`
  animation: skeleton-gradient 1.5s infinite ease-in-out;
  height: 22px;

  @media screen and (max-width: 820px) {
    height: 16px;
  }
`;
