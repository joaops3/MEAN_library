import { diskStorage } from "multer";
import path from "path";

export const storage = {
  local: diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads")
    },
    
    filename: (req, file, cb) => {
      let random = `${Date.now()+ Math.floor(Math.random() *999999)}`
      const mimeList = file.mimetype.split("/")
      
 
       cb(null, file.fieldname + random+"."+mimeList[1]);
    }
  })  
}

export const fileFilter = (req, file, cb) => {
        let requirements = /[\/.](gif|jpg|jpeg|png|svg|webp)$/i;
        if (!file.mimetype.match(requirements)) {
            return cb(null, false)
        }
        cb(null, true)
      }