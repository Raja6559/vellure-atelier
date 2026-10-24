import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("public/images", { recursive: true });
for (const name of [
  "interior",
  "studio",
  "mood",
  "craft",
  "expression",
  "still-life",
]) {
  const path =
    "assets/source/" + name + (name === "interior" ? ".jpg" : ".png");
  const metadata = await sharp(path).metadata();
  for (const width of [640, 1280]) {
    const info = await sharp(path)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile("public/images/" + name + "-" + width + ".webp");
    console.log(
      name +
        "-" +
        width +
        ": " +
        Math.round(info.size / 1024) +
        " KB (" +
        info.width +
        "×" +
        info.height +
        ")",
    );
  }
  console.log("source " + name + ": " + metadata.width + "×" + metadata.height);
}
