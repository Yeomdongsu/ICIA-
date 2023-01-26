import { format } from 'date-fns'
import styled from 'styled-components'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    // background: #f5f5fa;
    background: #f7ecec;
    // background: #FFEBE4;
  }

  th,
  td {
    padding: 14px 0 16px;
    text-align: center;
  }

  tbody > tr:not(:last-child) td {
    border-bottom: 1px solid #0000000a;
  }

  tbody > tr:hover {
    background-color: #fdf7f7ea;
  }
`

export default ({ dataSource, columns, ...props }) => {
  /**
   * dataSource, columns 에 의해 테이블을 그려주는 컴포넌트
   * dataSource는 전체 정보들을 의미
   * columns 정보들에 대한 정의를 의미
   *
   * Ranking.jsx에 예시 확인
   *
   * columns?.map 같은 문법은 columns가 없으면 무시, 있으면 map 함수를 실행 시킨다는것
   * map 함수는 배열에 있는 함수, 안에 있는 요소들을 하나씩 반복하면서 실행 시키는거
   */
  return (
    <Table {...props}>
      <thead>
        {columns?.map(c => (
          <th style={c.style}>{c.name}</th>
        ))}
      </thead>
      <tbody>
        {dataSource?.map((
          v,
          i // v 는 dataSource의 반복된 하나의 값, i는 반복된 횟수
        ) => (
          <tr>
            {columns?.map((
              c // c 는 columns의 반복된 하나의 값
            ) => (
              <td>{c.render ? c.render(v[c.id], i, v) : v[c.id]}</td> // 컬럼에 render가 정의 되어 있으면 render의 결과값으로 출력
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export const dateRenderer = v => format(v, 'yyyy년 MM월 dd일')
