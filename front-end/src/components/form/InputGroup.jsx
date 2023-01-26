import styled from 'styled-components'
import FlexBox from '../common/FlexBox'
import Typhography from '../common/Typhography'

const InputGroupBox = styled(FlexBox)`
  width: ${(props) => props.width || '100%'};

  > *:last-child {
    flex: 1;
  }
`

export default ({ label, children }) => {
  return (
    <InputGroupBox>
      <Typhography style={{ width: '100px' }}>{label}</Typhography>
      {children}
    </InputGroupBox>
  )
}
