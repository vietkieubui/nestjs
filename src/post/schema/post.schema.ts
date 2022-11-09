import { Schema, Document } from 'mongoose';

const PostSchema = new Schema(
  {
    title: { type: String, require: true },
    description: String,
    content: String,
    // created_at: {
    //   type: Date,
    //   require: true,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
    //custom timestampss
    // timestamps: {
    //   createdAt: 'created_at',
    //   updatedAt: 'updated_at',
    // },

    collection: 'posts',
  },
);

export { PostSchema };

export interface Post extends Document {
  title: String;
  description: String;
  content: String;
}
