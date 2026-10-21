import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const UPLOAD_DESTINATION = join(process.cwd(), 'uploads', 'images');

// Ensure destination directory exists
if (!fs.existsSync(UPLOAD_DESTINATION)) {
  fs.mkdirSync(UPLOAD_DESTINATION, { recursive: true });
}

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

export const multerImageUploadOptions: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(UPLOAD_DESTINATION)) {
        fs.mkdirSync(UPLOAD_DESTINATION, { recursive: true });
      }
      cb(null, UPLOAD_DESTINATION);
    },
    filename: (req, file, cb) => {
      const ext = extname(file.originalname).toLowerCase();
      const uniqueName = `${crypto.randomUUID()}${ext}`;
      cb(null, uniqueName);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
    files: 10, // Max 10 files per request
  },
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname).toLowerCase();
    const isMimeValid = ALLOWED_MIME_TYPES.includes(file.mimetype);
    const isExtValid = ALLOWED_EXTENSIONS.includes(ext);

    if (!isMimeValid || !isExtValid) {
      return cb(
        new BadRequestException(
          `Invalid file type '${file.mimetype}'. Only images (JPEG, PNG, WEBP, GIF, SVG) are allowed.`,
        ),
        false,
      );
    }

    cb(null, true);
  },
};
