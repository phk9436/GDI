import { useRouter } from 'next/router';
import styled from 'styled-components';

function LabDetail() {
  const router = useRouter();

  console.log(router.query)
  return <div>LabDetail</div>;
}

export default LabDetail;
