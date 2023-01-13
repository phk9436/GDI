import styled from 'styled-components';
import { IPressData } from 'types/dataTypes';
import { useRouter } from 'next/router';

interface IPressItemProps {
  data: IPressData;
  deletePressItem: (id: string) => Promise<void>;
}

function PressItem({ data, deletePressItem }: IPressItemProps) {
  const router = useRouter();

  const redirectUpdate = () => {
    router.push(
      {
        pathname: `/admin/notice/Press/update`,
        query: { ...data },
      },
      `/admin/notice/Press/update`,
    );
  };

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
          <AdminButtons>
            <AdminButton onClick={redirectUpdate}>수정</AdminButton>
            <AdminButton onClick={() => deletePressItem(data.id as string)}>삭제</AdminButton>
          </AdminButtons>
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
  padding-bottom: 35px;
  margin-bottom: 46px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  gap: 40px;

  a {
    display: contents;
    width: 100%;
    height: 100%;
  }
`;

const PressItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  max-width: calc(100% - 226px);
  width: 100%;

  h3 {
    font-size: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
`;

const InfoWrapper = styled.ul`
  display: flex;
  gap: 82px;
`;
const Info = styled.li`
  display: flex;
  align-items: center;
  font-size: 20px;
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
  }
`;
const Detail = styled.div``;

const PressButtons = styled.div`
  min-width: 186px;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
