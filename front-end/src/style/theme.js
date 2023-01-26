import { DancingScriptFonts, NotoSansKRFonts } from './GlobalStyle'

export default {
  //예시!
  colors: {
    white: '#fff',
    point: '#f20530',
    black: '#11021a',
    black10: '#11121a99',
    gray: '#fdeedc99',
  },
  fonts: {
    ...Object.fromEntries(
      NotoSansKRFonts.map((v) => [v.name.toLowerCase(), `NotoSansKR-${v.name}`])
    ), // GlobalStyle.js에서 정의한 폰트들을 불러온다!, -$이 굵기다 정의!
    en: {
      ...Object.fromEntries(
        DancingScriptFonts.map((v) => [v.name.toLowerCase(), `DancingScript-${v.name}`])
      ),
    },
  },
  fontSize: {
    xl2: '48px',
    xl: '36px',
    lg: '24px',
    md: '18px',
    sm: '15px',
    xs: '13px',
  },
  formItem: {
    xl: {
      padding: '27px 12px 29px',
      height: '82px',
    },
    lg: {
      padding: '12px 12px 14px',
      height: '52px',
    },
    md: {
      padding: '7px 10px 9px',
      height: '42px',
    },
  },
}

export const formItemStyle = (props) => {
  const { padding, height } = props.theme.formItem[props.size || 'md']
  return `
    ::placeholder {
      color: #00000050;
      font-family: ${(props) => props.theme.fonts.Regular}
    }

    padding: ${padding};
    
    &:not(textarea) {
      height: ${height};
    }
  `
}
