import Container from './Container'
import cn from 'classnames'

export default function Alert({ preview }:any) {
  return (
    <div
      className={cn('w-screen z-20 bg-white border-b', {
        'bg-accent-7 border-accent-7': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              プレビューモード: 下書きが表示されています
            </>
          ) : (
            <>
              開発中
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
