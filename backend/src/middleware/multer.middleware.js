import multer from "multer"

// storage setup (where to save & how to name files)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public")                        //folder where files will be saved, all commings files save in './public/temp' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)                      //Keep the same name as the user uploaded
  }
})

export const upload = multer({ storage: storage })
