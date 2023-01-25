import styled from 'styled-components';
import { RedirectDetail, Card } from './Components';
import { ISectionTopProps, ICardsProps } from 'types/componentPropTypes';

export function SectionTop({ title, href }: ISectionTopProps) {
  return (
    <TopWrapper>
      <h4>
        <span>NEW</span> {title}
      </h4>
      <RedirectTopWrapper>
        <RedirectDetail href={href} />
      </RedirectTopWrapper>
    </TopWrapper>
  );
}
const TopWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #221e1f;
  margin-bottom: 20px;
  padding: 0 60px 0 80px;
  position: relative;

  h4 {
    font-size: 30px;
    line-height: 40px;
    font-weight: 800;
    color: #221e1f;

    span {
      font-size: 24px;
      color: #f15a4e;
    }
  }

  @media screen and (max-width: 820px) {
    padding: 0 20px;
    height: auto;

    h4 {
      font-size: 18px;

      span {
        font-size: 14px;
      }
    }
  }
`;

const RedirectTopWrapper = styled.div`
  display: none;

  @media screen and (max-width: 820px) {
    display: block;
  }
`;

export function Cards({ data, path }: ICardsProps) {
  return (
    <CardsWrapper>
      <CardsContainer>
        {data.map((e, i) => (
          <Card
            date={e.date}
            thumbnailData={e.thumbnailData}
            title={e.title}
            key={`card${i}`}
            id={e.id}
            path={path}
          />
        ))}
      </CardsContainer>
    </CardsWrapper>
  );
}

const CardsWrapper = styled.div`
  max-width: calc(100% - 423px);
  overflow-x: auto;
  padding-bottom: 40px;

  @media screen and (max-width: 820px) {
    max-width: 100%;
    padding: 0 20px;
    padding-bottom: 20px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 28px;
  width: 722px;

  @media screen and (max-width: 820px) {
    gap: 20px;
    width: fit-content;
  }
`;
