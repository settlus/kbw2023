import { useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Bridge from '../components/Icons/Bridge'
import Logo from '../components/Icons/Logo'
import { Seoul } from '../components/Icons/Seoul'
import Modal from '../components/Modal'
import { HEIGHT, TOTAL_NUMBER_OF_PHOTOS, WIDTH } from '../constants/photos'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter()
  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
      <Head>
        <title>Settlus KBW 2023 Photos</title>
        <meta property='og:image' content='https://kbw2023-photos.settlus.org/2023-kbw/og.jpg' />
        <meta name='twitter:image' content='https://kbw2023-photos.settlus.org/2023-kbw/og.jpg' />
      </Head>
      <main className='mx-auto max-w-[1960px] p-4'>
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
          />
        )}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
          <div className='row-span-2 after:content relative mb-5 flex h-full flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0'>
            <div className='absolute w-full h-full inset-0 flex opacity-80'>
              <span className='flex w-full max-h-full max-w-full items-center justify-self-start'>
                <Seoul />
              </span>
              <span className='absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black opacity-90'></span>
            </div>
            <Logo />
            <h1 className='z-10 mb-4 text-base font-bold uppercase tracking-widest'>
              2023 Settlus x Circle Event Photos
            </h1>
            <p className='z-10 max-w-[40ch] text-white/75 sm:max-w-[32ch]'>
              Builders from all over the world came together to celebrate the announcement of
              Settlus blockchain with Circle!
            </p>
            <a
              className='pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4'
              href='https://settlus.org'
              target='_blank'
              rel='noreferrer'
            >
              Learn More
            </a>
          </div>
          {images.map(({ id, blurDataUrl }, index) => (
            <Link
              key={index}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className='after:content group relative block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight'
            >
              <Image
                alt='KBW 2023 photo'
                className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110'
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder='blur'
                blurDataURL={blurDataUrl}
                src={`https://kbw2023-photos.settlus.org/2023-kbw/${id}.jpg`}
                width={720}
                height={480}
                sizes={`(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw`}
              />
            </Link>
          ))}
        </div>
      </main>
      <footer className='p-6 text-center text-white/80 sm:p-12'>
        <a
          className='flex items-center justify-center gap-2 text-white hover:text-t3-purple-200 transition-colors'
          href='https://jacob.kim'
          target='_blank'
          rel='noopener noreferrer'
        >
          Made with{' '}
          <Image
            src='https://kbw2023-photos.settlus.org/2023-kbw/coffee.png'
            alt='Coffee Emoji'
            width={20}
            height={20}
          />
          by Jacob
        </a>
      </footer>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const images: ImageProps[] = Array.from({ length: TOTAL_NUMBER_OF_PHOTOS }, (_, i) => ({
    id: i,
    width: WIDTH,
    height: HEIGHT,
  }))

  const blurImagePromises = images.map((image: ImageProps) => {
    return getBase64ImageUrl(image)
  })
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < images.length; i++) {
    images[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }
  images.sort((a, b) => a.id - b.id)

  return { props: { images } }
}
