import multer, {diskStorage} from "multer";
import {RequestHandler} from "express";
import {storageUnitConvert, Unit} from "../utils/storageUnitConversion";

interface UploadOptions {
    allowedTypes?: string[];
    maxSizeMB?: number;
}


export function multerUpload(options: UploadOptions = {}) {
    const {
        allowedTypes = ['image/png', 'image/jpeg'],
        maxSizeMB = 10,
    } = options
    return multer({
        storage: diskStorage({}),
        limits: {
            fileSize: storageUnitConvert(maxSizeMB, Unit.MEGABYTE),
        },
        fileFilter: (req, file, cb) => {
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type. Allowed'));
            }
        },
    });
}

export function uploadSingle(fieldName: string,options?:UploadOptions): RequestHandler {
    return multerUpload(options).single(fieldName);
}

export function uploadArray(fieldName: string, maxCount: number = 1,options?:UploadOptions): RequestHandler {
    return multerUpload(options).array(fieldName, maxCount);
}

// I know after using the storageUnitConvert() function I should put the file in lib folder, but it's very small refactor todo