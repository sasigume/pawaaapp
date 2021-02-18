import Container from './containercomponent'
import cn from 'classnames'

export default function Alert({ preview }:any) {
  return (
    <div
      className={cn('w-screen z-20 bg-white border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This is page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                Click here
              </a>{' '}
              to exit preview mode.
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
