import { Link } from 'react-router-dom'
import FlexBox from '../common/FlexBox'
import Button from '../form/Button'
import Select from '../form/Select'

export default (props) => {
  return (
    <FlexBox {...props}>
      <Select defaultLabel="종류" size="xl" style={{ width: '330px', marginRight: 1 }} 
      options={[{ value: 'weddingHall', label: '웨딩홀' }, { value: 'sudme', label: '스드메'},
                { value: 'planner', label: '플레너' }, { value: 'Honeymoon', label: '허니문' },
      ]} />
      <Select defaultLabel="지역" size="xl" style={{ width: '330px', marginRight: 1 }}
       options={[{ value: 'seoul', label: '서울' }, { value: 'gyeonggi', label: '경기'},
       { value: 'Incheon', label: '인천' }, { value: 'Gangwon', label: '강원' },
       { value: 'Jeju', label: '제주' }, { value: 'Daejeon', label: '대전'},
       { value: 'Chungbuk', label: '충북' }, { value: 'Chungnam', label: '충남' },
       { value: 'Busan', label: '부산' }, { value: 'Ulsan', label: '울산'},
       { value: 'Gyeongnam', label: '경남' }, { value: 'Dae-gu', label: '대구' },
       { value: 'Gyeongbuk', label: '경북' }, { value: 'Gwangju', label: '광주'},
       { value: 'Jeonnam', label: '전남' }, { value: 'Jeonbuk', label: '전북' },
      ]} />
      <Select defaultLabel="가격" size="xl" style={{ width: '330px' }} 
            options={[{ value: 'estimate0', label: '500만원 이하' },
            { value: 'estimate1', label: '500 ~ 1000 만원' }, 
            { value: 'estimate2', label: '1000 ~ 2000 만원'},
            { value: 'estimate3', label: '2000 ~ 3000 만원' }, 
            { value: 'estimate4', label: '3000 ~ 4000 만원' },
            { value: 'estimate5', label: '4000 ~ 5000 만원' }, 
            { value: 'estimate6', label: '5000만원 이상' },
      ]} />
      <Link to="/estimate">
      <Button size="xl" style={{ width: '160px' }} >
        견적 문의
      </Button></Link>
    </FlexBox>
  )
}
