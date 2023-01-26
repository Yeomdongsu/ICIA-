import styled from 'styled-components'

// props.theme는 style/theme.js에 정의 되어 있는 값들을 사용하는걸 의미
/**
 * size는 themes에 적용 되어 있는 18px, 24px 등 공통된 크기로 사용 하겠다는 의미
 * color도 마찬가지로 themes에 있는 white -> #fff, black -> #000 을 사용하겠다는 의미
 */
export default styled.span`
  font-family: ${(props) => props.theme.fonts[props.font || 'regular']};
  font-size: ${(props) => props.theme.fontSize[props.size || 'md']};
  color: ${(props) => props.theme.colors[props.color || 'black']};
  text-align: ${(props) => props.align || 'inherit'};
`
