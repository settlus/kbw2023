import { getPlaiceholder } from 'plaiceholder'

import type { ImageProps } from './types'

const cache = new Map<ImageProps, string>()

export default async function getBase64ImageUrl(image: ImageProps): Promise<string> {
  let url = cache.get(image)
  if (url) {
    return url
  }
  try {
    const response = await fetch(`https://kbw2023-photos.settlus.org/2023-kbw/${image.id}.jpg`)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const { base64 } = await getPlaiceholder(buffer)

    cache.set(image, base64)
    return base64
  } catch (error) {
    console.log({ image })
    console.log(error)
  }
}
