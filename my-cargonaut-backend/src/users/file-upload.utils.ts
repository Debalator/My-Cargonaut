import { extname } from "path/posix";
import { v4 as uuidv4 } from "uuid";

export const imageFileFilter = (_req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
        return callback(new Error("Only image files are allowed!"), false);
    callback(null, true);
};

export const editFileName = (_req, file, callback) => {
    const fileExt = extname(file.originalname);
    callback(null, `${uuidv4()}${fileExt}`);
};
