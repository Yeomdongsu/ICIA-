import FlexBox from '../common/FlexBox'
import Image1 from '../../assets/images/gallery/1.jpg'
import Image2 from '../../assets/images/gallery/2.jpg'
import Image4 from '../../assets/images/gallery/4.jpg'
import Section from '../main/Section'
import EstimateItem from './EstimateItem'

export default ( { pboxp, setPboxp,eData,...props } ) => {
  const estimateData = [
    {
      image: Image1,
      title: '특별한 웨딩을 경험했습니다',
    }
    // {
    //     image: Image1,
    //     title: '특별한 웨딩을 경험했습니다',
    //   },
  ]
  const { w, s, p, h } = eData;
  const test = () => {
  console.log(props);
  console.log(props.eData);
  console.log(eData);
  console.log(w);
  console.log(s);
  console.log(p);
  console.log(h);
  }
  
  // const wItem = w?.map((wlist,a) => {
  //   <div key={a}>{w[a].whidx}adasda</div>
  // })

  return (
    <Section>
      <FlexBox gap={"0px"} style={{ margin: "0 auto", width:"100%", display:"block" }}>
        {estimateData.map((props) => (
          <EstimateItem {...props} w={w} s={s} p={p} h={h} pboxp={pboxp} setPboxp={setPboxp}/>
        ))}
      </FlexBox>
    </Section>
  )
}
