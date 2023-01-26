import Image1 from '../assets/images/gallery/1.jpg'
import Image2 from '../assets/images/gallery/2.jpg'
import Image3 from '../assets/images/gallery/3.jpg'
import Image4 from '../assets/images/gallery/4.jpg'
import Image5 from '../assets/images/gallery/5.jpg'
import Image6 from '../assets/images/gallery/6.jpg'
import Image7 from '../assets/images/gallery/7.jpg'
import Image8 from '../assets/images/gallery/8.jpg'
import Image9 from '../assets/images/gallery/9.jpg'
import Image10 from '../assets/images/gallery/10.jpg'

const planners = [
//   {
//     image: Image3,
//     companyName: '웨딩 플래너 대표주자 홍길동',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image1,
//     companyName: '플랜 고수',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image2,
//     companyName: 'Global Planner',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image9,
//     companyName: '웨딩 파트너',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image7,
//     companyName: '우리 결혼 했어요',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image8,
//     companyName: '허니문2 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image5,
//     companyName: '허니문2 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image6,
//     companyName: '허니문2 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image4,
//     companyName: '허니문2 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image10,
//     companyName: '허니문2 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image10,
//     companyName: '허니문2 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image9,
//     companyName: '허니문2 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image1,
//     companyName: '허니문 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image2,
//     companyName: '허니문2 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image3,
//     companyName: '허니문3 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image4,
//     companyName: '웨딩싱어즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image5,
//     companyName: '우리 결혼 했어요',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image6,
//     companyName: '허니문2 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image7,
//     companyName: '허니문2 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
//   {
//     image: Image8,
//     companyName: '허니문2 프랜즈',
//     reserve: 0,
//     registDate: new Date(),
//   },
]
export default planners

export const getEventById = (image) => {
  return planners.filter(v => v.image === image).pop()
}