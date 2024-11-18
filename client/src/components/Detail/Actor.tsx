import React from 'react';
import { ICast } from './MovieDetail';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface IActor {
  actor: ICast[] | undefined;
}

const CardWrapper = styled.div`
  width: 200px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActorWrapper = styled.div`
  display: grid;
  gap: 15px;
  row-gap: 30px;
  grid-template-columns: repeat(5, 1fr);
  .card {
    img {
      border-radius: 10px;
    }
    .card-text {
      color: #828282;
    }
  }
`;

const ActorImg = styled.div<{ act_img: string }>`
  background-color: white;
  background-image: url(${(props) => props.act_img});
  /* background-size: cover; */
  background-position: center center;
  background-repeat: no-repeat;
  width: 200px;
  height: 300px;
  border-radius: 10px;
`;

const Actor = ({ actor }: IActor) => {
  console.log(actor);
  return (
    <ActorWrapper>
      {actor?.map((data) => (
        // <div>
        //   <ActorImg
        //     act_img={
        //       data.profile_path
        //         ? `https://image.tmdb.org/t/p/w200/${data.profile_path}`
        //         : '/images/noImage.png'
        //     }
        //   />
        //   {data.original_name}
        //   <p>{data.character}역</p>
        // </div>
        <Card style={{ width: '200px' }}>
          <CardWrapper>
            <Card.Img
              variant='top'
              src={
                data.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${data.profile_path}`
                  : '/images/noImage.png'
              }
            />
          </CardWrapper>
          <Card.Body>
            <Card.Title>{data.original_name}</Card.Title>
            <Card.Text>{data.character} 역</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </ActorWrapper>
  );
};

export default Actor;