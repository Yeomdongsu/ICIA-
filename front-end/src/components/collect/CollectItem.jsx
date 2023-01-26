import { Link } from 'react-router-dom'
import Stack from '../common/Stack'
import Typhography from '../common/Typhography'

export default ({ image, companyName, style, link }) => {
  return (
    <Link to={link} style={{ display: 'block' }}>
      <Stack gap="0" style={{ ...style, fontSize: 0 }}>
        <div
          style={{
            width: '100%',
            height: 450,
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        />
        <Typhography
          color="white"
          align="center"
          style={{
            width: '100%',
            padding: '8px 0',
            backgroundColor: '#000',
          }}
        >
          {companyName}
        </Typhography>
      </Stack>
    </Link>
  )
}
