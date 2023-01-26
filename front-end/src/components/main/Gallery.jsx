import styled from 'styled-components'
import Image1 from '../../assets/images/gallery/1.jpg'
import Image2 from '../../assets/images/gallery/2.jpg'
import Image3 from '../../assets/images/gallery/3.jpg'
import Image4 from '../../assets/images/gallery/4.jpg'
import Image5 from '../../assets/images/gallery/5.jpg'
import Image6 from '../../assets/images/gallery/6.jpg'
import Image7 from '../../assets/images/gallery/7.jpg'
import Image8 from '../../assets/images/gallery/8.jpg'
import Image9 from '../../assets/images/gallery/9.jpg'
import Image10 from '../../assets/images/gallery/10.jpg'
import Section from './Section'
import { useState } from 'react'

const Grid = styled.div`
  width: 100%;
  margin-top: 0px;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-flow: row dense;
`

const GridColumn = styled.div`
  display: grid;
  row-gap: 10px;
  height: fit-content;
`

const GridItemWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
  font-size: 0;

  > img {
    width: 100%;
  }

  > img ~ * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: ${(props) => props.theme.colors.white};
    opacity: 0;
    transition: 0.3s;
    font-size: 16px;
  }

  :hover > img ~ * {
    opacity: 1;
  }
`

const PreviewWrapper = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  img {
    max-width: 80vw;
    max-height: 80vh;
  }
`

const Preview = (props) => {
  if (props.opened === false) return ''
  
  return (
    <PreviewWrapper onClick={props.onClose}>
      <img src={props.image} onClick={e => e.stopPropagation()} />
    </PreviewWrapper>
  )
}

const GridItem = ({ label, image }) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <GridItemWrapper onClick={() => setOpened(true)} data-aos="fade-up">
        <img src={image} />
        <p>{label}</p>
      </GridItemWrapper>
      <Preview opened={opened} image={image} onClose={() => setOpened(false)} />
    </>
  )
}

const gridItems = [
  [
    { image: Image1, label: 'Snapshots' },
    { image: Image10, label: 'Snapshots' },
  ],
  [
    { image: Image3, label: 'Snapshots' },
    { image: Image4, label: 'Snapshots' },
  ],
  [
    { image: Image5, label: 'Snapshots' },
    { image: Image8, label: 'Snapshots' },
  ],
  [
    { image: Image9, label: 'Snapshots' },
    { image: Image2, label: 'Snapshots' },
  ],
]

export default () => (
  <Section title="">
    <Grid>
      {gridItems.map((v) => (
        <GridColumn>
          {v.map((data) => (
            <GridItem {...data} />
          ))}
        </GridColumn>
      ))}
    </Grid>
  </Section>
)
