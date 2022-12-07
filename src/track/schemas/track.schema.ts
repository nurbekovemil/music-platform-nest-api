import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
