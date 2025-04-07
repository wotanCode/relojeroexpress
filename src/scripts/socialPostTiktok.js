import { promises as fs } from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import { CONTACT_INFO } from '@/constants/contact.ts'

// TODO: Actually this not working

// const { TIKTOK_API_KEY } = process.env

const getLatestTikTokVideos = async () => {
  const response = await fetch(
    `https://open.tiktokapis.com/v2/video/list/?max_count=${CONTACT_INFO.SOCIAL_MEDIA.TIKTOK.NUMBER_OF_VIDEOS}`,
    {
      headers: {
        'Authorization': `Bearer ${TIKTOK_API_KEY}`
      }
    }
  )
  const data = await response.json()
  return data.data.videos
}

const generateTikTokHTML = ({ share_url, cover_image_url, title }) => `
  <a href='${share_url}' target='_blank' class="w-full md:w-1/3 p-2">
    <img class="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow" src='${cover_image_url}' alt='${title}' />
  </a>`

const updateTikTokComponent = async () => {
  try {
    const tiktokVideos = await getLatestTikTokVideos()

    const tiktokHTML = tiktokVideos
      .map(video => generateTikTokHTML(video))
      .join('')

    const templatePath = path.join(process.cwd(), 'src', 'template', 'videos-tiktok.md.tpl')
    const template = await fs.readFile(templatePath, { encoding: 'utf-8' })

    const markdownContent = template.replace('%{{latest_tiktok}}%', tiktokHTML)

    const outputPath = path.join(process.cwd(), 'src', 'content', 'tiktok-videos.md')
    await fs.writeFile(outputPath, markdownContent)

    console.log('✅ TikTok videos markdown generated successfully!')
  } catch (error) {
    console.error('❌ Error updating TikTok videos:', error)
    process.exit(1)
  }
}

updateTikTokComponent()
