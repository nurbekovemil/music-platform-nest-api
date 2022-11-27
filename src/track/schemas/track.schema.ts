import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TrackDocument = mongoose.HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  track: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
