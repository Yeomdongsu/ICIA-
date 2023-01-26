import styled from 'styled-components'

const CheckBox = styled.input`
  font-size: ${(props) => props.theme.fontSize.lg};
  width:20px;
  zoom:2;
  vertical-align:-2.5px;
`
export default ({name, value}) => {
  return(
          <CheckBox type={"checkBox"} name={name} value={value}></CheckBox>
  )
}