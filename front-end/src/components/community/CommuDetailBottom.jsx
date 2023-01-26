import { Link, useParams } from 'react-router-dom'
import Typhography from '../common/Typhography'
import weddinghall from '../../data/weddinghall'
import planner from '../../data/planner'
import sdm from '../../data/sdm'
import honeymoon from '../../data/honeymoon'
import Stack from '../common/Stack'
import FlexBox from '../common/FlexBox'
import { format } from 'date-fns'
import Button from '../form/Button'
import Payment from '../estimate/Payment'

const categoryMap = {
  'wedding-hall': weddinghall,
  planner: planner,
  sdm: sdm,
  honeymoon: honeymoon,
}

export default () => {
  const { category, id: i } = useParams()
  const id = Number(i)
  const categoryData = categoryMap[category]
  const data = categoryData[id]

  return (
    <Stack gap={10} division style={{ width: '100%' }}>
      <Typhography size="lg" font="medium">
        {data.companyName}
      </Typhography>
      <FlexBox style={{ width: '100%' }} justify="space-between">
        <Typhography>{format(data.registDate, 'yyyy년 MM월 dd일')}</Typhography>
        <Typhography>예약: {data.reserve.toLocaleString()}회</Typhography>
      </FlexBox>
      <Stack align="center" style={{ width: '100%', textAlign: 'center', padding: '20px 0 30px' }}>
        <img src={data.image} style={{ width: '40%' }} />
        <input type="date" style={{ width: '40%', height: 30 }} />
        <FlexBox style={{ width: '40%' }}>
          <Button style={{ flex: 1 }}>찜하기</Button>
        </FlexBox>
          <Payment ptext="예약하기" width='470px' style={{flex: 1, backgroundColor: '#555' }} />
      </Stack>
      <FlexBox style={{ width: '100%' }} justify="space-between">
        <FlexBox>
          <Button>수정</Button>
          <Button>삭제</Button>
        </FlexBox>
        <Link to={`/collect/${category}`}>
          <Button>목록</Button>
        </Link>
      </FlexBox>
      <FlexBox style={{ width: '100%' }} justify="space-between">
        {id > 0 ? <Link to={`/collect/${category}/${id - 1}`}>이전글 보기</Link> : <div></div>}
        {categoryData.length - 1 > id && (
          <Link to={`/collect/${category}/${id + 1}`}>다음글 보기</Link>
        )}
      </FlexBox>
    </Stack>
  )
}
