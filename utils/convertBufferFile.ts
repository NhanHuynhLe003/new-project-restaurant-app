export default async function ConvertFileBuffer(img: File | undefined) {
  if (!img) {
    throw new Error("file is required!");
  }
  const imgBuffer = Buffer.from(await img.arrayBuffer());
  return imgBuffer;
}
