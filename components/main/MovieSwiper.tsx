import { useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { MovieCard } from './Components';

interface ISwiperProps {
  data: {
    date: string;
    img: string;
    title: string;
    press: string;
  }[];
}

function MovieSwiper({ data }: ISwiperProps) {
  const btnPrevRef = useRef(null);
  const btnNextRef = useRef(null);
  console.log(btnNextRef.current);
  return (
    <MovieSwiperWrapper>
      <MovieSwiperContainer>
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={40}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          navigation={{ nextEl: btnNextRef.current, prevEl: btnPrevRef.current }}
          observer={true}
          observeParents={true}
         /* onBeforeInit={(swipe) => {
            if (btnPrevRef.current !== null && btnNextRef.current !== null) {
              swipe.params.navigation.prevEl = btnPrevRef.current;
              swipe.params.navigation.nextEl = btnNextRef.current;
              swipe.navigation.update();
            }
          }}*/
        >
          {data.length > 0 &&
            data.map((e, i) => (
              <SwiperSlide key={`slide${i}`}>
                <MovieCard date={e.date} title={e.title} press={e.press} img={e.img} />
              </SwiperSlide>
            ))}
        </Swiper>
        <ButtonPrev ref={btnPrevRef} />
        <ButtonNext ref={btnNextRef} />
      </MovieSwiperContainer>
    </MovieSwiperWrapper>
  );
}

export default MovieSwiper;

const MovieSwiperWrapper = styled.div`
  position: relative;
  margin: auto;
  max-width: 1430px;
  padding: 0 60px;

  @media screen and (max-width: 820px) {
    padding: 0 30px;
  }
`;

const MovieSwiperContainer = styled.div`
  overflow: hidden;

  .swiper-slide {
    width: 580px;
    margin-bottom: 10px;
  }

  .swiper {
    height: 462px;
  }

  .swiper-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 16px;
  }

  .swiper-pagination-bullet {
    width: 100%;
    max-width: 260px;
    height: 8px;
    background-color: #d9d9d9;
    border-radius: 20px;
    opacity: 1;
    transition: 0.3s;
    margin: 0 !important;

    &.swiper-pagination-bullet-active {
      height: 16px;
    }
  }

  @media screen and (max-width: 820px) {
    .swiper {
      height: 256px;
    }
    .swiper-slide {
      width: 100%;
      margin-bottom: 10px;
    }

    .swiper-pagination {
      gap: 6px;
      height: 8px;
    }

    .swiper-pagination-bullet {
      height: 4px;

      &.swiper-pagination-bullet-active {
        height: 8px;
      }
    }
  }
`;

const ButtonPrev = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  background: url('/images/swiperPrevPc.png') no-repeat center/cover;
  top: 105px;
  left: 40px;
  z-index: 1;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  transition: 0.3s;

  &.swiper-button-disabled {
    opacity: 0;
  }

  @media screen and (max-width: 820px) {
    left: 0;
    top: 40px;
    width: 40px;
    height: 40px;
    background-image: url('/images/swiperPrevMo.png');
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  }
`;

const ButtonNext = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  background: url('/images/swiperNextPc.png') no-repeat center/cover;
  top: 105px;
  right: 40px;
  z-index: 1;
  cursor: pointer;
  box-shadow: -2px 2px 6px rgba(0, 0, 0, 0.5);
  transition: 0.3s;

  &.swiper-button-disabled {
    opacity: 0;
  }

  @media screen and (max-width: 820px) {
    top: 40px;
    right: 0;
    width: 40px;
    height: 40px;
    background-image: url('/images/swiperNextMo.png');
    box-shadow: -2px 2px 6px rgba(0, 0, 0, 0.3);
  }
`;
