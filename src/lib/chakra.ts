// Variables

const listModifyGreen = ' #046e00'
const listModifyBlue = ' #0060bc'

const shadowSm = ' 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.1)'
const shadowMd = ' 0 0.1rem 0.6rem 0 rgba(0, 0, 0, 0.3)'

const colorTheme = ' #2687e8'

// Background color
const background = ' #fff'
const bgLight = ' #f5f5f5'
const bgDark = ' #222'

// text color
const text = ' #454545'
const textLight = ' #999'
const textHeader = ' #333'
const textCode = ' #eee'

// link
const link = ' #1487bd'
const hover = ' darken($link, 10%)'

// border
const border = ' #ddd'

// button
const btn = ' #fff'
const btnHover = ' #f5f5f5'

// Media Queries
const mqXs = ' "(max-width: 480px)"'
const mqSm = ' "(min-width: 768px)"'
const mqMd = ' "(min-width: 992px)"'
const mqLg = ' "(min-width: 1200px)"'

export const EXTEND_CHAKRA = {
  styles: {
    global: {
      "h1,h2,h3,h4,h5,h6": {
        marginTop: "2rem",
        marginBottom: "1rem",
      },
      a: {
        color: "teal.500",
      },
      strong: {
        fontWeight: "bold",
        background: "linear-gradient(rgba(0, 0, 0, 0) 80%, #ffff66 75%)"
      }
    },
  },
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ["48px", "72px"],
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: ["36px", "48px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
    h3: {
      fontSize: ["28px", "34px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
    h4: {
      fontSize: ["22px", "26px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
    h5: {
      fontSize: ["16px", "20px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
    h6: {
      fontSize: ["11px", "14px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  },
}