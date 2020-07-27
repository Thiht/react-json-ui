import * as React from 'react'
import { Options } from './index'

export const renderYoutubeVideo = (
  position: string[],
  data: any,
  options: Options,
) => {
  if (typeof data !== 'string') {
    return null
  }

  const matches = /^https?:\/\/youtu.be\/(.*)$/.exec(data)
  if (!matches) {
    return null
  }

  return (
    <iframe
      src={`https://www.youtube.com/embed/${matches[1]}`}
      allow='autoplay; encrypted-media'
      title='video'
    />
  )
}
