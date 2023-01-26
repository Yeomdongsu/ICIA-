import Table from '../common/Table'
import Section from './Section'
import Image1 from '../../assets/images/gallery/1.jpg'

export default (props) => {
  const rankingData = [
    { name: 'A 웨딩홀' },
    { name: '서울 B 웨딩홀' },
    { name: '서울 B 웨딩홀' },
    { name: '서울 B 웨딩홀' },
    { name: '서울 B 웨딩홀' },
  ]

  return (
    <Section title="Ranking" style={props.style}>
      <Table 
        style={{ marginTop: 30 }}
        data-aos="fade-up"
        columns={[ //배열
          {
            name: '#',
            render: (v, id) => id + 1,
            style: {
              width: 80,
            },
          },
          {//예시
            name: '이름',
            id: 'name',
          },
        ]}
        dataSource={rankingData}
      />
    </Section>
  )
}
