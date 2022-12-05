import styled from 'styled-components';
import { RedirectDetail, Card } from './Components';

interface ISectionTopProps {
  title: string;
  href: string;
}

interface ICardsProps {
  data: {
    date: string;
    img: string;
    title: string;
  }[];
}

export function SectionTop({ title, href }: ISectionTopProps) {
  return (
    <TopWrapper>
      <h4>{title}</h4>
      <RedirectDetail href={href} />
    </TopWrapper>
  );
}
const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 91px;
  border-bottom: 1px solid #000;
  margin-bottom: 20px;

  h4 {
    font-size: 36px;
    line-height: 40px;
    font-weight: 700;
  }

  @media screen and (max-width: 820px) {
    padding: 0 20px;
    height: auto;

    h4 {
      font-size: 18px;
    }
  }
`;

export function Cards({ data }: ICardsProps) {
  return (
    <CardsWrapper>
      <CardsContainer>
        {data.map((e, i) => (
          <Card date={e.date} img={e.img} title={e.title} key={`card${i}`} />
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
  justify-content: space-between;
  gap: 54px;
  width: 870px;

  @media screen and (max-width: 820px) {
    gap: 20px;
    width: auto;
  }
`;