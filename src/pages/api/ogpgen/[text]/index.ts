import { NextApiRequest, NextApiResponse } from 'next'
import * as path from 'path'
import { createCanvas, registerFont, loadImage } from 'canvas'
import '@/lib/firebase-admin'

interface SeparatedText {
  line: string
  remaining: string
}

function createTextLine(context:any, text: string): SeparatedText {
  const maxWidth = 500

  for (let i = 0; i < text.length; i++) {
    const line = text.substring(0, i + 1)
    if (context.measureText(line).width > maxWidth) {
      return {
        line,
        remaining: text.substring(i + 1),
      }
    }
  }

  return {
    line: text,
    remaining: '',
  }
}

function createTextLines(context:any, text: string): string[] {
  const lines: string[] = []
  let currentText = text

  while (currentText !== '') {
    const separatedText = createTextLine(context, currentText)
    lines.push(separatedText.line)
    currentText = separatedText.remaining
  }

  return lines
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const reqText = req.query.text as string

  const width = 600
  const height = 315
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  registerFont(path.resolve('public/fonts/NotoSansJP-Bold.otf'), {
    family: 'Noto Sans JP'
  })

  const backgroundImage = await loadImage(
    path.resolve('public/canvas/ogp-base.png')
  )

  context.drawImage(backgroundImage, 0, 0, width, height)
  context.font = '30px Noto Sans JP'
  context.fillStyle = '#424242'
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  const lines = createTextLines(context, reqText)
  lines.forEach((line, index) => {
    const y = 130 + 40 * (index - (lines.length - 1) / 2)
    context.fillText(line, 300, y)
  })

  const buffer = canvas.toBuffer()

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  })
  res.end(buffer, 'binary')
}