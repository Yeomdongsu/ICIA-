import styled from 'styled-components'

/**
 * styled component로 flex를 모든 태그에서 쓰는게 아닌 공통화 하기 위한 컴포넌트
 * <FlexBox justify="center">를 사용하면 내부에 props으로 direction이나 justfiy, align을 주면 해당 요소에 맞게
 * flex에 justify-content, align-items가 세팅 됨.
 */
export default styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'flex-start'};
  gap: ${(props) => props.gap || 0}px;
`
