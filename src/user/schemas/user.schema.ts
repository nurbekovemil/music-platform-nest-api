import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';

export type UserDocument = mongoose.HydratedDocument<User>;
@Schema()
export class User {
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({ default: false })
  isActivated: boolean;
  @Prop()
  activationLink: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: Track[];
}

export const UserSchema = SchemaFactory.createForClass(User);
