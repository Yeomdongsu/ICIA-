import styled from 'styled-components'
import { formItemStyle } from '../../style/theme'
import Arrow from '../../assets/images/select/select-arrow.png'

const Select = styled.select`
  border: 0;
  font-size: ${(props) => props.theme.fontSize.md};
  ${formItemStyle};
  appearance: none;
  background: #fff url(${Arrow}) no-repeat right 15px center;
  background-size: 10px;
`

export default ({ defaultLabel, options, ...props }) => (
  <Select {...props}>
    <option value="">{defaultLabel || '전체'}</option>
    {options?.map(({ value, label }) => (
      <option value={value}>{label}</option>
    ))} 
  </Select>
)
