import { NowRequest, NowResponse } from "@now/node"
import sharp from "sharp"
export default async (request: NowRequest, response: NowResponse) => {
  const {
    query: {
      name,
      w: width,
      fm: format = name.toString().split(".")[1],
      h: height,
    },
    headers: { host, accept },
  } = request

  const image = await fetch(`http://${host}${name}`).then((d) => d.blob())

  const imageAsArrayBuffer = await image.arrayBuffer()
  const imageBuffer = Buffer.from(imageAsArrayBuffer)

  const sharped = sharp(imageBuffer).resize(Number(width))
  const result = await sharped.toFormat(format.toString()).toBuffer()

  response.setHeader("Content-Type", `image/${format}`)
  response.setHeader(
    "Cache-Control",
    `max-age=604800, s-maxage=10, stale-while-revalidate`
  )
  response.status(200).send(result)
}
