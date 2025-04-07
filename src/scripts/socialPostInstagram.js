import { promises as fs } from 'fs'
import path from 'path'
import dotenv from 'dotenv';
// import fetch from 'node-fetch'

dotenv.config();  // load environment variables from .env file

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const NUMBER_OF_POST = 6
const PLACEHOLDER_LATEST_INSTAGRAM = '%{{latest_instagram}}%'

const getLatestInstagramPosts = async () => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=${NUMBER_OF_POST}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ API error:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('❌ Failed in getLatestInstagramPosts:', error);
    throw error;
  }
};


const generateInstagramHTML = ({ permalink, media_type, thumbnail_url, media_url, id }) => {
  const imageSrc = media_type === 'VIDEO' ? thumbnail_url : media_url
  const altText = `Instagram post`

  return `<a href='${permalink}' target='_blank' class="w-1/3 md:w-1/6 p-2 instagram-post group" rel="noopener noreferrer">
  <div class="w-full h-56 md:h-96 overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl">
    <img
      class="w-full h-full object-cover transition-all duration-300 transform group-hover:scale-110 group-hover:brightness-75"
      src='${imageSrc}'
      alt='${altText}' />
  </div>
</a>`;
}

const updateInstagramComponent = async () => {
  try {
    const instagramPosts = await getLatestInstagramPosts()

    if (!instagramPosts || !Array.isArray(instagramPosts)) {
      throw new Error("No posts received from Instagram");
    }

    const instagramHTML = instagramPosts
      .map(post => generateInstagramHTML(post))
      .join('')

    const templatePath = path.join(process.cwd(), 'src', 'template', 'videos.md.tpl')
    const template = await fs.readFile(templatePath, { encoding: 'utf-8' })

    const markdownContent = template.replace(PLACEHOLDER_LATEST_INSTAGRAM, instagramHTML)

    const outputPath = path.join(process.cwd(), 'src', 'content', 'InstagramPost.md')
    await fs.writeFile(outputPath, markdownContent)

    console.log('✅ Instagram posts markdown generated successfully!')
  } catch (error) {
    console.error('❌ Critical error:', error);
    process.exit(1);
  }
}

updateInstagramComponent()
