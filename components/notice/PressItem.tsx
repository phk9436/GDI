import styled from 'styled-components';
import { IPressItemProps } from 'types/componentPropTypes';

function PressItem({ data }: IPressItemProps) {
  return (
    <li>
      <PressItemWrapper>
        <a href={data.pressUrl} target="_blank">
          <PressItemContainer>
            <h3>{data.title}</h3>
            <InfoWrapper>
              <Info>
                <Title>언론사</Title>
                <Detail>{data.pressFrom}</Detail>
              </Info>
              <Info>
                <Title>작성일자</Title>
                <Detail>{data.pressDate}</Detail>
              </Info>
            </InfoWrapper>
          </PressItemContainer>
        </a>
        <PressButtons>
          <a href={data.pressUrl} target="_blank">
            <ButtonLink>상세내용확인</ButtonLink>
          </a>
        </PressButtons>
      </PressItemWrapper>
    </li>
  );
}

export default PressItem;

const PressItemWrapper = styled.div`
  padding-bottom: 36px;
  margin-bottom: 46px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  position: relative;

  & > a {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 820px) {
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
`;

const PressItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;

  h3 {
    font-size: 30px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 820px) {
    gap: 12px;

    h3 {
      font-size: 14px;
      white-space: wrap;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
`;

const InfoWrapper = styled.ul`
  display: flex;
  gap: 82px;
  margin-bottom: 10px;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    gap: 4px;
    margin: 0;
  }
`;
const Info = styled.li`
  display: flex;
  align-items: center;
  font-size: 20px;

  @media screen and (max-width: 820px) {
    font-size: 12px;
  }
`;

const Title = styled.div`
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

    @media screen and (max-width: 820px) {
      height: 12px;
      margin: 0 6px;
    }
  }
`;
const Detail = styled.div``;

const PressButtons = styled.div`
  min-width: 186px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  position: absolute;
  right: 0;
  bottom: 36px;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const ButtonLink = styled.div`
  height: 50px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  color: #fff;
  transition: 0.3s;
  cursor: pointer;
  background: #1f4788 url('/images/arrowLink.png') no-repeat center right 20px/28px 28px;

  &:hover {
    background-color: #092d68;
  }
`;
