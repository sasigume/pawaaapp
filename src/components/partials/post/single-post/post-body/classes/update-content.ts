export const updateContent = {
  'ul.update-content, ol.update-content': {
    paddingLeft: '1.5em',
    listStyleType: 'none',
    margin: '0px',
    marginBottom: '1.6em',
  },
  'ul.update-content li, ol.update-content li': {
    position: 'relative',
    margin: '15px 0',
  },
  'ul.update-content li:after, ol.update-content li:after': {
    display: 'block',
    content: "''",
    position: 'absolute',
    top: '0.5em',
    left: '-1em',
    width: '7px',
    height: '7px',
    background: '#2687e8',
    borderRadius: '100%',
  },
  'ul.update-content li > ul, ol.update-content li > ul, ul.update-content li > ol, ol.update-content li > ol': {
    listStyleType: 'none',
    fontSize: '0.9em',
    marginLeft: '1em',
    marginBottom: '1em',
  },
};
