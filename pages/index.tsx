import type { NextPage } from 'next';

interface IProps {
  isMobile: boolean;
}

const Home: NextPage<IProps> = () => {
  return <div style={{height: "200vh"}}>나눔글꼴</div>;
};

export default Home;
