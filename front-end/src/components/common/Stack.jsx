import styled from 'styled-components'

/**
 * `` 문자 안에 있는 ${}는 템플릿 리터럴에서 사용 가능한 문법
 * ${안에} 있는 거를 실행해서 보여준다는 의미
 * 컴포넌트에서 받아오는 props를 styled-component에서는 템플릿 리터럴 형식으로 가져옴
 */
export default styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'flex-start'};
  gap: ${(props) => props.gap || 24}px;

  ${(props) =>
    props.division &&
    `
  > :not(:last-child) {
    width: 100%;
    border-bottom: 1px solid #eee;
    padding-bottom: 25px;
  }
  `}
`
