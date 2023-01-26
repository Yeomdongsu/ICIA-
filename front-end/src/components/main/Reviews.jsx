import FlexBox from '../common/FlexBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Typhography from '../common/Typhography'
import Image1 from '../../assets/images/gallery/1.jpg'
import Image2 from '../../assets/images/gallery/2.jpg'
import Image4 from '../../assets/images/gallery/4.jpg'
import Section from './Section'
import { format } from 'date-fns'

const ReviewStars = (props) => {
  return (
    <FlexBox gap={3} style={{ fontSize: 12 }}>
      {Array.from(Array(5).keys()).map((i) => (
        <FontAwesomeIcon icon={faStar} style={{ color: props.score > i ? '#fed049' : '#ddd' }} />
      ))}
    </FlexBox>
  )
}

const ReviewItem = (props) => {
  return (
    <div style={{ flex: 1 }} data-aos="fade-up">
      <div
        style={{
          width: '100%',
          height: '200px',
          backgroundImage: `url(${props.image})`,
          backgroundSize: 'cover',
          marginBottom: 15,
          borderRadius: 7,
        }}
      />
      <ReviewStars score={props.score} />
      <p style={{ marginTop: 10, marginBottom: 7 }}>
        <Typhography size="md" font="medium">
          {props.title}
        </Typhography>
      </p>
      <p style={{ marginBottom: 5 }}>
        <Typhography size="sm" font="regular" color="black10">
          {props.description}
        </Typhography>
      </p>
      <p>
        <Typhography size="sm" font="regular" color="black10">
          {format(props.registDate, 'yyyy년 MM월 dd일')}
        </Typhography>
      </p>
    </div>
  )
}

export default () => {
  const reviewData = [
    {
      image: Image1,
      score: 5,
      title: '특별한 웨딩을 경험했습니다',
      description:
        '남부럽지 않게 너무 아름답고 이쁘게 웨딩을 치뤘습니다, 상담 해주시는 분들도 너무 친절했고 만족도가 너무 좋습니다',
      registDate: new Date('2022-10-24'),
    },
    {
      image: Image2,
      score: 2,
      title: '여러모로 아쉬웠습니다.',
      description:
        '고객 대응이 안좋았으며, 가격이 너무 비쌌어요 전체적으로 나쁘지는 않았지만 한번뿐인 결혼에 만족스럽지 않아서 2점 줬습니다.',
      registDate: new Date('2022-10-21'),
    },
    {
      image: Image4,
      score: 4,
      title: '만족스러운 웨딩이였습니다',
      description:
        '한번 뿐인 웨딩에 여러가지를 직접 하려니 너무 머리가 아프더라구요, 스드메부터 식장, 뷔페까지 한번에 추천을 받고 진행하니 편했어요!',
      registDate: new Date('2022-10-10'),
    },
    {
      image: Image1,
      score: 5,
      title: '특별한 웨딩을 경험했습니다',
      description:
        '남부럽지 않게 너무 아름답고 이쁘게 웨딩을 치뤘습니다, 상담 해주시는 분들도 너무 친절했고 만족도가 너무 좋습니다',
      registDate: new Date('2022-09-13'),
    },
  ]

  return (
    <Section title="Review" more="/community/CommuBoardReview">
      <FlexBox gap={30} style={{ marginTop: 30 }}>
        {reviewData.map((props) => (
          <ReviewItem {...props} />
        ))}
      </FlexBox>
    </Section>
  )
}