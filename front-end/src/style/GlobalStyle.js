import { createGlobalStyle } from 'styled-components'
import DancingScriptBold from '../assets/fonts/Dancing_Script/DancingScript-Bold.ttf'
import DancingScriptSemiBold from '../assets/fonts/Dancing_Script/DancingScript-SemiBold.ttf'
import DancingScriptMedium from '../assets/fonts/Dancing_Script/DancingScript-Medium.ttf'
import DancingScriptRegular from '../assets/fonts/Dancing_Script/DancingScript-Regular.ttf'
import NotoSansKRBlack from '../assets/fonts/Noto_Sans_KR/NotoSansKR-Black.otf'
import NotoSansKRBold from '../assets/fonts/Noto_Sans_KR/NotoSansKR-Bold.otf'
import NotoSansKRLight from '../assets/fonts/Noto_Sans_KR/NotoSansKR-Light.otf'
import NotoSansKRMedium from '../assets/fonts/Noto_Sans_KR/NotoSansKR-Medium.otf'
import NotoSansKRRegular from '../assets/fonts/Noto_Sans_KR/NotoSansKR-Regular.otf'
import NotoSansKRThin from '../assets/fonts/Noto_Sans_KR/NotoSansKR-Thin.otf'

export const DancingScriptFonts = [
  //정의 되었는걸 쓰겠다!
  { name: 'Bold', url: DancingScriptBold },
  { name: 'SemiBold', url: DancingScriptSemiBold },
  { name: 'Medium', url: DancingScriptMedium },
  { name: 'Regular', url: DancingScriptRegular },
]

export const NotoSansKRFonts = [
  //정의 되었는걸 쓰겠다!
  { name: 'Black', url: NotoSansKRBlack },
  { name: 'Bold', url: NotoSansKRBold },
  { name: 'Regular', url: NotoSansKRRegular },
  { name: 'Medium', url: NotoSansKRMedium },
  { name: 'Light', url: NotoSansKRLight },
  { name: 'Thin', url: NotoSansKRThin },
]

const GlobalStyle = createGlobalStyle`
  ${DancingScriptFonts.map(
    (val) => `
  @font-face {
    font-family: 'DancingScript-${val.name}';
    src: url(${val.url}) format('truetype');
  }
  `
  )}


  ${NotoSansKRFonts.map(
    (val) => `
  @font-face {
    font-family: 'NotoSansKR-${val.name}';
    src: url(${val.url}) format('opentype');
  }
  `
  )}

  body {
    // background: #fffaf2;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'NotoSansKR-Medium';
    outline: none;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  table: {
    border-collapse: collapse;
  }
`

export default GlobalStyle
