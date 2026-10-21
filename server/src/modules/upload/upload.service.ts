import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { basename, join } from 'path';
import { UPLOAD_DESTINATION } from './multer.config';

export interface UploadedFileResponse {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
}

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  formatFileResponse(file: Express.Multer.File): UploadedFileResponse {
    const url = `/uploads/images/${file.filename}`;
    return {
      url,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  formatFilesResponse(files: Express.Multer.File[]): {
    urls: string[];
    files: UploadedFileResponse[];
  } {
    const formatted = files.map((f) => this.formatFileResponse(f));
    return {
      urls: formatted.map((f) => f.url),
      files: formatted,
    };
  }

  deleteFile(fileUrlOrName: string): boolean {
    try {
      const filename = basename(fileUrlOrName);
      const filePath = join(UPLOAD_DESTINATION, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
    } catch (err) {
      this.logger.error(`Failed to delete file '${fileUrlOrName}':`, err);
    }
    return false;
  }
}
