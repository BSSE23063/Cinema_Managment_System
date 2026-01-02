import { 
  Controller, 
  Post, 
  UseInterceptors, 
  UploadedFile,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  
  @Post('movie-image')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/movies',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        const filename = `movie-${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    }),
    fileFilter: (req, file, callback) => {
      // More flexible validation
      const allowedMimeTypes = [
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/gif',
        'image/webp'
      ];
      
      if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(
          new HttpException(
            `Unsupported file type: ${file.mimetype}. Allowed types: JPEG, PNG, GIF, WebP`,
            HttpStatus.BAD_REQUEST
          ), 
          false
        );
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
    }
  }))
  async uploadMovieImage(@UploadedFile() file: Express.Multer.File) {
    console.log('🎬 Upload received for movie image:', file?.originalname);
    
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const imageUrl = `/uploads/movies/${file.filename}`;
    
    console.log('✅ Image uploaded successfully:', imageUrl);
    
    return {
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: file.filename
    };
  }
}