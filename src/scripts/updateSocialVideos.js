import { promises as fs } from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import { CONTACT_INFO } from '@/constants/contact.ts'

const { INSTAGRAM_API_KEY, TIKTOK_API_KEY } = process.env

const PLACEHOLDERS = {
  LATEST_INSTAGRAM: '%{{latest_instagram}}%',
  LATEST_TIKTOK: '%{{latest_tiktok}}%'
}

const getLatestInstagramVideos = async () => {
  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_API_KEY}&limit=${CONTACT_INFO.SOCIAL_MEDIA.INSTAGRAM.NUMBER_OF_VIDEOS}`
  )
  const data = await response.json()
  return data.data.filter(item => item.media_type === 'VIDEO')
}

const getLatestTikTokVideos = async () => {
  const response = await fetch(
    `https://open.tiktokapis.com/v2/video/list/?max_count=${CONTACT_INFO.SOCIAL_MEDIA.TIKTOK.NUMBER_OF_VIDEOS}`, {
      headers: {
        'Authorization': `Bearer ${TIKTOK_API_KEY}`
      }
    }
  )
  const data = await response.json()
  return data.data.videos
}

const generateInstagramHTML = ({ permalink, thumbnail_url, id }) => `
  <a href='${permalink}' target='_blank' class="w-full md:w-1/3 p-2">
    <img class="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow" src='${thumbnail_url}' alt='Instagram video ${id}' />
  </a>`

const generateTikTokHTML = ({ share_url, cover_image_url, title }) => `
  <a href='${share_url}' target='_blank' class="w-full md:w-1/3 p-2">
    <img class="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow" src='${cover_image_url}' alt='${title}' />
  </a>`

const updateSocialComponent = async () => {
  try {
    const [instagramVideos, tiktokVideos] = await Promise.all([
      getLatestInstagramVideos(),
      getLatestTikTokVideos()
    ])

    const instagramHTML = instagramVideos
      .map(video => generateInstagramHTML(video))
      .join('')

    const tiktokHTML = tiktokVideos
      .map(video => generateTikTokHTML(video))
      .join('')

    // Read template
    const templatePath = path.join(process.cwd(), 'src', 'template', 'videos.md.tpl')
    const template = await fs.readFile(templatePath, { encoding: 'utf-8' })

    // Generate markdown content
    const markdownContent = template
      .replace(PLACEHOLDERS.LATEST_INSTAGRAM, instagramHTML)
      .replace(PLACEHOLDERS.LATEST_TIKTOK, tiktokHTML)

    // Write to output file
    const outputPath = path.join(process.cwd(), 'src', 'content', 'social-videos.md')
    await fs.writeFile(outputPath, markdownContent)
    
    console.log('✅ Social videos markdown generated successfully!')
  } catch (error) {
    console.error('❌ Error updating social videos:', error)
    process.exit(1)
  }
}

updateSocialComponent()
