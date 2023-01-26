import FlexBox from '../common/FlexBox'
import Stack from '../common/Stack'
import Typhography from '../common/Typhography'
import Image1 from '../../assets/images/gallery/1.jpg'
import Image2 from '../../assets/images/gallery/2.jpg'
import Image4 from '../../assets/images/gallery/4.jpg'
import Section from './Section'
import { format } from 'date-fns'

const NewsItem = (props) => {
  return (
    <FlexBox style={{ flex: 1 }} data-aos="fade-up">
      <div
        style={{
          width: 250,
          height: 130,
          marginRight: 20,
          backgroundImage: `url(${props.image})`,
          backgroundSize: 'cover',
        }}
      />
      <div style={{ flex: 1 }}>
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
    </FlexBox>
  )
}

export default (props) => {
  const newsData = [
    {
      image: Image1,
      title: '특별한 웨딩을 경험했습니다',
      description: `학교교육 및 평생교육을 포함한 교육제도와 그 운영, 교육재정 및 교원의 지위에 관한 기본적인 사항은 법률로 정한다. 피고인의 자백이 고문·폭행·협박·구속의 부당한 장기화 또는 기망 기타의 방법에 의하여 자의로 진술된 것이 아니라고 인정될 때 또는
        국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다.`,
      registDate: new Date('2022-10-24'),
    },
    {
      image: Image2,
      title: '여러모로 아쉬웠습니다.',
      description: `학교교육 및 평생교육을 포함한 교육제도와 그 운영, 교육재정 및 교원의 지위에 관한 기본적인 사항은 법률로 정한다. 피고인의 자백이 고문·폭행·협박·구속의 부당한 장기화 또는 기망 기타의 방법에 의하여 자의로 진술된 것이 아니라고 인정될 때 또는
        국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다.`,
      registDate: new Date('2022-10-21'),
    },
  ]

  return (
    <Section title="Wedding News" more="/WeddingNews" style={props.style}>
      <Stack gap={30} style={{ marginTop: 30 }} division>
        {newsData.map((props) => (
          <NewsItem {...props} />
        ))}
      </Stack>
    </Section>
  )
}
