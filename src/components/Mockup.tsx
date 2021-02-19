type mockupProps = {
  src: string
}

const Mockup = ({src}:mockupProps) => {
  return (
    <div className="mx-auto h-auto mb-10">
      <img src={src} width="214" height="463" />
    </div>
  )
}

export default Mockup