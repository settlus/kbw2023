import type { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Carousel from '../../components/Carousel'
import { HEIGHT, TOTAL_NUMBER_OF_PHOTOS, WIDTH } from '../../constants/photos'
import getBase64ImageUrl from '../../utils/generateBlurPlaceholder'
import type { ImageProps } from '../../utils/types'

const Home = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter()
  const { photoId } = router.query
  let index = Number(photoId)

  const currentPhotoUrl = `https://kbw2023-photos.settlus.org/2023-kbw/${currentPhoto.id}.jpg`

  return (
    <>
      <Head>
        <title>Settlus KBW 2023 Photos</title>
        <meta property='og:image' content={currentPhotoUrl} />
        <meta name='twitter:image' content={currentPhotoUrl} />
      </Head>
      <main className='mx-auto max-w-[1960px] p-4'>
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPhoto = {
    id: Number(context.params.photoId),
    width: WIDTH,
    height: HEIGHT,
  }

  const blurDataUrl = await getBase64ImageUrl(currentPhoto)

  return {
    props: {
      currentPhoto: {
        ...currentPhoto,
        blurDataUrl,
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = Array.from({ length: TOTAL_NUMBER_OF_PHOTOS }, (_, i) => ({
    params: { photoId: i.toString() },
  }))

  return { paths, fallback: false }
}
