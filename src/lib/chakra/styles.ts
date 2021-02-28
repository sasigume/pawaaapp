export const EXTEND_CHAKRA = {
  textStyles: {
    h1: {
      fontSize: ["44px", "52px"],
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: ["36px", "42px"],
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
  styles: {
    global: {
      ".articleMdWrapper": {
        p: {
          margin: "0.6rem 0 2.4rem"
        },
        "h1,h2,h3,h4,h5,h6": {
          position: "relative",
          marginTop: "2rem",
          marginBottom: "1rem",
          paddingLeft: "0.4rem"
        },
        "h1:before,h2:before,h3:before,h4:before,h5:before,h6:before": {
          content: "''",
          display: "block",
          height: "100%",
          left: 0,
          top: 0,
          position: "absolute",
          borderLeft: "solid 2px",
          borderColor: "gray.500"
        },
        a: {
          color: "blue.600",
        },
        "a:hover": {
          color: "purple"
        },
        strong: {
          fontWeight: "bold",
          background: "linear-gradient(rgba(0, 0, 0, 0) 80%, #ffff66 75%)"
        },
        "img,video": {
          maxWidth: "100%",
          height: "auto",
          margin: "0.2rem 0"
        },
        ".youtube-box": {
          paddingTop: "56.25%",
          position: "relative"
        },
        ".youtube-box iframe": {
          position: "absolute",
          top: 0,
          right: 0,
          width: '100%',
          height: '100%'
        },
        dl: {
          marginTop: "2rem",
          paddingBottom: "1rem",
          border: "solid 2px #555",
        },
        dt: {
          position: "relative",
          display: "inline-block",
          background: "white",
          top: "-0.8rem",
          left: "0.5rem",
          padding: "0 0.4rem"
        },
        dd: {
          position: "relative",
          margin: 0,
          top: 0,
          paddingLeft: "1rem",
        },
        kbd: {
          borderTop: "1px solid #F5F5F5",
          display: "inline-block",
          position: "relative",
          verticalAlign: "middle",
          padding: "0.3rem 0.7rem",
          background: "#eee",
          borderRadius: "0.5rem",
          fontWeight: "bold",
          margin: "0.2rem 0.5rem",
          boxShadow: "0px 4px 0px 0px #999"
        },
        blockquote: {
          margin: "1em 0.5em 1em",
          padding: "1em",
          background: "#eee",
          borderRadius: "8px"
        },
        "th,td": {
          border: "solid 1px #eee"
        },
        "ul, ol": {
          margin: "0.5em 0 0.5em 2em"
        },
        "ul li, ol li": {
          margin: "0.3em 0"
        },
        "ul.update-content, ol.update-content": {
          paddingLeft: "1.5em",
          listStyleType: "none",
          margin: "0px",
          marginBottom: "1.6em"
        },
        "ul.update-content li, ol.update-content li": {
          position: "relative",
          margin: "15px 0"
        },
        "ul.update-content li:after, ol.update-content li:after": {
          display: "block",
          content: "''",
          position: "absolute",
          top: "0.5em",
          left: "-1em",
          width: "7px",
          height: "7px",
          background: "#2687e8",
          borderRadius: "100%"
        },
        "ul.update-content li > ul, ol.update-content li > ul, ul.update-content li > ol, ol.update-content li > ol": {
          listStyleType: "none",
          fontSize: "0.9em",
          marginLeft: "1em",
          marginBottom: "1em"
        },
        "pre.hljs": {
          borderRadius: "6px",
          background: "#222",
          fontFamily:
            "Consolas, 'Courier New', Courier, Monaco, monospace, Noto Sans",
          margin: "0px 0px 8px"
        },
        "pre.hljs .highlightline": {
          background: "#7b4000",
          display: "inline-block",
          width: "100%"
        },
        "b.command": {
          fontSize: "1.1em",
          display: "inline-block",
          margin: "3px 2px 3px",
          padding: "3px",
          borderRadius: "3px",
          fontWeight: "bold",
          background: "#dbdbdb",
          wordBreak: "break-word"
        },
        ".command-highlight": {
          display: "inline-block",
          padding: "2px 5px",
          margin: "0px 2px",
          background: "#ececec",
          borderRadius: "3px",
          border: "solid 1px #ccc",
          wordBreak: "break-all"
        },
        ".black-highlight": {
          display: "inline-block",
          padding: "2px 5px",
          margin: "0px 2px",
          background: "#222",
          color: "#fff",
          borderRadius: "3px"
        },
        ".code": {
          fontFamily: "Consolas, 'Courier New', Courier, Monaco, monospace, Noto Sans"
        },
        ".strong-notice": {
          margin: "10px 6px",
          padding: "10px",
          border: "solid 2px red",
          backgroundColor: "#fdd",
          boxShadow: "0px 3px 0px rgba(250, 100, 100, 0.3)"
        },
        ".mode": {
          display: "inline-block",
          margin: "3px",
          padding: "1px 5px 1px",
          borderRadius: "3px",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1.1em"
        },
        ".imp": { background: "#f33", border: "solid 2px #f33" },
        ".chain": {
          background: "#48d1cc",
          color: "#000 !important",
          border: "solid 2px #48d1cc"
        },
        ".repeat": { background: "#68228b", border: "solid 2px #68228b" },
        ".con": {
          background: "#fff",
          border: "solid 2px #000 !important",
          padding: "1px 3px 1px !important",
          color: "#000 !important"
        },
        ".unc": { background: "#000", border: "solid 2px #000 !important" },
        ".nee": {
          background: "#ddd",
          color: "#000 !important",
          border: "solid 2px #ddd"
        },
        ".alw": { background: "#cd0000", border: "solid 2px #cd0000" },
        "span.v8, span.v7, span.v9, span.v10": {
          display: "inline-block",
          margin: "2px",
          padding: "3px 6px !important",
          color: "#fff",
          fontWeight: "bold"
        },
        "span.v8": { background: "#c71585" },
        "span.v7": { background: "#006400" },
        "span.v9": { background: "#8b008b" },
        "span.v10": { background: "#191970" },
        ".mod-inst": {
          margin: "20px 10px",
          padding: "12px 14px",
          boxShadow: "0px 5px 0px #bbb",
          border: "solid 1px #ccc"
        },
        ".mod-inst span.title": { fontSize: "1.2em", fontWeight: "bold" },
        ".mod-inst p.note": {
          margin: "10px",
          padding: "10px",
          borderRadius: "5px",
          background: "#ddd"
        },
        ".mod-inst ol, .mod-inst ul": { marginLeft: "20px" },
        ".mod-inst ol li, .mod-inst ul li": { margin: "5px" },
        ".mod-inst .stopmodreposts": {
          display: "block",
          background: ["blue", "#2687e8"],
          color: "#fff",
          margin: "1.2em 0",
          padding: "1.5em 1em 1.5em",
          textAlign: "center",
          overflow: "hidden",
          textDecoration: "none"
        },
        ".mod-inst .stopmodreposts b": {
          fontSize: "3em",
          fontWeight: "normal",
          textShadow: "0px 5px 0px #000",
          lineHeight: 1.2,
          display: "block",
          animation: "textshadowmoco 5s ease 0s infinite normal"
        },
        "a.back-button": {
          marginLeft: "auto",
          display: "table",
          padding: "0.5em",
          textDecoration: "none",
          borderRadius: "5px",
          background: "#2687e8",
          color: "#fff !important",
          fontSize: "1.1em",
          fontWeight: "bold"
        },
        "ul#mokuzi": {
          listStyleType: "none",
          border: "solid 2px #444",
          borderTop: "solid 0px #fff",
          padding: "0px",
          margin: "10px",
          boxShadow: "0px 3px 0px rgba(1, 1, 1, 0.3)"
        },
        "ul#mokuzi > li": { display: "block", marginLeft: "0px" },
        "ul#mokuzi > li > a": {
          marginLeft: "-3px",
          marginTop: "-1px",
          display: "block",
          padding: "10px",
          width: "98%",
          fontSize: ["19px", "1.2rem"],
          fontWeight: "bold",
          background: "#b5e8ff",
          lineHeight: "1.2rem",
          textDecoration: "none",
          boxShadow: "1px 3px 5px rgba(1, 1, 1, 0.4)",
          zIndex: 2
        },
        "ul#mokuzi > li > ul": {
          listStyleType: "none",
          paddingLeft: "0px",
          marginLeft: "0px"
        },
        "ul#mokuzi > li > ul > li": {
          position: "relative",
          paddingRight: "15px",
          borderBottom: "solid 1px #333",
          listStyleType: "none",
          marginLeft: "0px"
        },
        "ul#mokuzi > li > ul > li:last-child": { borderBottom: "solid 0px #fff" },
        "ul#mokuzi > li > ul > li a": {
          fontSize: ["17px", "1rem"],
          display: "block",
          lineHeight: ["20px", "1.4rem"],
          padding: "8px",
          textDecoration: "none"
        },
        "ul#mokuzi > li > ul > li a.big": {
          fontSize: ["19px", "1.2rem"],
          lineHeight: ["20px", "1.4rem"]
        },
        "ul#mokuzi > li > ul > li a:before, ul#mokuzi > li > ul > li a:after": {
          content: '""',
          position: "absolute",
          borderTop: "solid 10px transparent",
          borderRight: "solid 10px transparent",
          borderBottom: "solid 10px transparent",
          width: "0px",
          height: "0px",
          bottom: "8px"
        },
        "ul#mokuzi > li > ul > li a:before": {
          right: "0px",
          borderLeft: "solid 10px #000"
        },
        "ul#mokuzi > li > ul > li a:after": {
          right: "2px",
          borderLeft: "solid 10px #fff"
        },
        ".quote-image": {
          display: "inline-block",
          margin: "8px 4px",
          padding: "5px",
          background: "#2687e8",
          color: "#fff"
        },
        ".quote-image a, .quote-image a:visited, .quote-image a:hover": {
          color: "#fff !important"
        }
      }
    }
  }
}