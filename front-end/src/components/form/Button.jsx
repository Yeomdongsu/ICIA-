import styled from 'styled-components'
import { formItemStyle } from '../../style/theme'

export default styled.button`
  border: 0;
  font-size: ${(props) => props.theme.fontSize.md};
  ${formItemStyle}
  background: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`
