const cloudinary = require('cloudinary-core')

const cld = new cloudinary.Cloudinary({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export default function GetOGPImage(title: string) {

  const encodeText = encodeURI(title);
  return cld.url(process.env.CLOUDINARY_OGP_PATH, {
    version: Date.now(),
    transformation: [
      {
        overlay: new cloudinary.Layer().publicId("ogp:favicon.png"), width: "0.2", gravity: "north_east", opacity: 70, effect: "brightness:50", crop: "scale"
      },
      {
        overlay: new cloudinary.TextLayer().fontFamily("Noto Sans")
          .fontSize(30).fontWeight("bold")
          .text(encodeText), effect: "colorize", color: "#000", width: 650, crop: 'fit',
      }      
    ],
  });
}