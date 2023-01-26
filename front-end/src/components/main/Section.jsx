import { Link } from 'react-router-dom'
import FlexBox from '../common/FlexBox'
import Typhography from '../common/Typhography'
import Wrapper from '../common/Wrapper'

export const SectionTitle = (props) => {
  return (
    <FlexBox style={{ width: '100%' }} justify="space-between" align="center" data-aos="fade-up">
      <Typhography size={props.titleSize ||"xl2"} font="medium" style={{ marginBottom: 0 }}>
        {props.children}
      </Typhography>
      {props.more && (
        <Link to={props.more}>
          <Typhography font="medium">more {'+'}</Typhography>
        </Link>
      )}
    </FlexBox>
  )
}

export default (props) => (
  <Wrapper style={{ paddingTop: 50, ...(props.style || {}) }} direction="column">
    <SectionTitle more={props.more} titleSize={props.titleSize}>{props.title}</SectionTitle>
    {props.children}
  </Wrapper>
)
