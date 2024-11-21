import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {
  faChevronLeft,
  faChevronRight,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomArrowProps } from 'react-slick';
import { forwardRef, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router';

const EPSWrapper = styled.div`
  width: 1200px;
  margin: auto;
  .custom-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-30%);
    cursor: pointer;
    z-index: 1;
    font-size: 24px;
    color: black;
    /* background: rgba(255, 255, 255, 1); */
    padding: 10px;
    border-radius: 50%;
    transition: background 0.3s ease;
  }

  /* .custom-arrow:hover {
    background: black;
    color: white;
  } */

  .prev-arrow {
    left: -45px;
  }

  .next-arrow {
    right: -45px;
  }

  .g-title {
    padding-left: 60px;
    padding-bottom: 13px;
    font-size: 18px;
    font-weight: 600;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  .title {
    font-size: 27px;
    font-weight: 400;
  }
`;

const StyledSlider = styled(Slider)`
  margin-right: 40px;
  margin-left: 40px;
  margin-bottom: 50px;

  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

const MovieBox = styled.div`
  width: 185px !important;
  height: 260px !important;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-size: 14px;
  color: white;
  background-color: ${(props) => props.color || 'black'};
  cursor: pointer;

  .m_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 이전,다음 화살표 커스텀
const CustomPrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div className='custom-arrow prev-arrow' onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div className='custom-arrow next-arrow' onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const EditorPickSection = forwardRef<HTMLDivElement>((_, ref) => {
  // 슬라이드 설정 옵션
  const settings = {
    dots: false,
    infinite: true,
    speed: 1800,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const genres = [
    [
      '드라마',
      '가슴이 뭉클, 눈가가 촉촉💦 우리의 심금을 울리는 영화들',
      '../../public/images/examplePoster/poster1.png',
      '#38D37F',
    ],
    [
      '로맨스',
      '연애 세포 뿜뿜!💞 연애 욕구를 마구 자극!!',
      '../../public/images/examplePoster/poster2.png',
      '#235AE9',
    ],
    [
      '코미디',
      '웃음 폭발! 😂 하루의 스트레스를 시원하게 날리자!!',
      '../../public/images/examplePoster/poster3.png',
      '#FF8383',
    ],
    [
      '스릴러',
      '긴장감 최고! 😱 손에 땀을 쥐게 하는 박진감!!',
      '../../public/images/examplePoster/poster4.png',
      '#4A4A73',
    ],
    [
      '액션',
      '짜릿한 쾌감! 💥 숨막히는 액션, 폭발하는 아드레날린!',
      '../../public/images/examplePoster/poster5.png',
      '#4CAF50',
    ],
    [
      'SF',
      '상상 그 이상의 세계 🌌 미래와 우주를 탐험하는 SF 영화들!!',
      '../../public/images/examplePoster/poster6.png',
      '#00BCD4',
    ],
    [
      '판타지',
      '환상적인 모험! 🧚‍♀️ 동화 속 세상으로 빠져보자!!',
      '../../public/images/examplePoster/poster7.png',
      '#9C27B0',
    ],
    [
      '애니메이션',
      '아이와 어른 모두를 위한 🎨 생동감 넘치는 애니메이션 영화!!',
      '../../public/images/examplePoster/poster8.png',
      '#FFC107',
    ],
  ];

  const [topRatedMovie, setTopRatedMovie] = useState<IMovie[]>();
  const [trendingMovie, setTrendingMovie] = useState<IMovie[]>();

  useEffect(() => {
    // 탑레이트영화 영화 요청 옵션 정의
    const TRMoptions: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=033d5d85d42294188dc8888ddadfc21e',
      params: { language: 'ko-KR', page: '1', region: 'KR' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzNkNWQ4NWQ0MjI5NDE4OGRjODg4OGRkYWRmYzIxZSIsIm5iZiI6MTczMjAwMjU0NS4xMTI5Mjk2LCJzdWIiOiI2NmNlOTA1ZDI1YTZhMmM2MzRjZDk2NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6Uk5mT4s2nWTdH6MAepa1CKYPpeFds5dWJVVxVhPDG4',
      },
    };

    axios
      .request(TRMoptions)
      .then((res) => {
        console.log('탑레이트영화');
        setTopRatedMovie(res.data.results);
        console.log(topRatedMovie);
      })
      .catch((err) => {
        console.log(err);
      });

    // 주간트렌드 영화 요청 옵션 정의
    const WTMoptions: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/movie/week?api_key=033d5d85d42294188dc8888ddadfc21e',
      params: { language: 'ko-KR' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzNkNWQ4NWQ0MjI5NDE4OGRjODg4OGRkYWRmYzIxZSIsIm5iZiI6MTczMjAwMjU0NS4xMTI5Mjk2LCJzdWIiOiI2NmNlOTA1ZDI1YTZhMmM2MzRjZDk2NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6Uk5mT4s2nWTdH6MAepa1CKYPpeFds5dWJVVxVhPDG4',
      },
    };

    axios
      .request(WTMoptions)
      .then((res) => {
        console.log('주간트렌드영화');
        setTrendingMovie(res.data.results);
        console.log(trendingMovie);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <EPSWrapper ref={ref}>
      <HeaderContainer>
        <div className='title'>
          에디터 PICK
          <FontAwesomeIcon
            style={{
              fontSize: '20px',
              marginBottom: '2.5px',
              marginLeft: '7px',
            }}
            icon={faWandMagicSparkles}
          />
        </div>
      </HeaderContainer>
      {/* 1번째 장르 */}
      <div className='g-title'>주간 인기 영화 🔥🔥 </div>
      <StyledSlider {...settings}>
        {trendingMovie?.map((movie, idx) => {
          return (
            <MovieBox key={idx} onClick={() => navigate(`/detail/${movie.id}`)}>
              <img
                className='m_img'
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt=''
              />
            </MovieBox>
          );
        })}
      </StyledSlider>
      {/* 2번째 장르 */}
      <div className='g-title'>평점 높은 영화 ★★★★★</div>
      <StyledSlider {...settings}>
        {topRatedMovie?.map((movie, idx) => {
          return (
            <MovieBox key={idx} onClick={() => navigate(`/detail/${movie.id}`)}>
              <img
                className='m_img'
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt=''
              />
            </MovieBox>
          );
        })}
      </StyledSlider>
    </EPSWrapper>
  );
});
