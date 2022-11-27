import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  createTrack(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files;
    return this.trackService.createTrack(dto, picture[0], audio[0]);
  }
  @Get()
  getAllTracks(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAllTracks(count, offset);
  }
  @Get('/search')
  searchTracks(@Query('query') query: string) {
    return this.trackService.searchTracks(query);
  }
  @Get(':id')
  getOneTrack(@Param('id') id: ObjectId) {
    return this.trackService.getOneTrack(id);
  }
  @Delete(':id')
  deleteTrack(@Param('id') id: ObjectId) {
    return this.trackService.deleteTrack(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

  @Post('/listen/:id')
  listenTrack(@Param('id') id: ObjectId) {
    this.trackService.listenTrack(id);
  }
}
