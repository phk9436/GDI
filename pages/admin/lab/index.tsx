import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BreadCrumb, Pagination } from 'components/Components';
import { UploadButton } from 'components/admin/Component';
import { BoardItem } from 'components/admin/BoardItem';

const DUMMY_DATA = [
  {
    id: 0,
    createdAt: '22-09-22',
    title: `경기도 탄소중립을 위한 '정의로운 전환' 플랫폼 구축 기초연구`,
    thumbnailUrl: '/images/cardDummy.png',
    author: '조성택, 조성택, 조성택',
    year: '2022',
    fileUrl: '/images/cardDummy.png',
  },
  {
    id: 1,
    createdAt: '22-09-22',
    title: `경기도 탄소중립을 위한 '정의로운 전환' 플랫폼 구축 기초연구`,
    thumbnailUrl: '/images/cardDummy.png',
    author: '조성택, 조성택, 조성택',
    year: '2022',
    fileUrl: '/images/cardDummy.png',
  },
  {
    id: 2,
    createdAt: '22-09-22',
    title: `경기도 탄소중립을 위한 '정의로운 전환' 플랫폼 구축 기초연구`,
    thumbnailUrl: '/images/cardDummy.png',
    author: '조성택, 조성택, 조성택',
    year: '2022',
    fileUrl: '/images/cardDummy.png',
  },
  {
    id: 3,
    createdAt: '22-09-22',
    title: `경기도 탄소중립을 위한 '정의로운 전환' 플랫폼 구축 기초연구`,
    thumbnailUrl: '/images/cardDummy.png',
    author: '조성택, 조성택, 조성택',
    year: '2022',
    fileUrl: '/images/cardDummy.png',
  },
];

function index() {
  const Tap = [
    [
      '연구보고서',
      '경기도 북부지역의 정책방향 및 대안 수립을 위한 기본 · 정책 · 수탁 · 기타 · 공공투자에 대한 연구자료 입니다.',
      '/admin/lab',
    ],
    ['학술포럼', '안내내용', '/admin/lab/Forum'],
  ];

  return (
    <div>
      <BreadCrumb category={Tap[0]} tap={Tap} />
      <Wrapper>
        <UploadButton tap={Tap[0]} />
        <ul>
          {DUMMY_DATA.map((e) => (
            <BoardItem data={e} path={Tap[0][2]} key={e.id} />
          ))}
        </ul>
        <Pagination />
      </Wrapper>
    </div>
  );
}

export default index;

const Wrapper = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 56px 60px 180px;
`;
