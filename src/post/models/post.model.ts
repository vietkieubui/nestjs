import { Schema, Document } from 'mongoose';

const PostSchema = new Schema(
  {
    title: String,
    description: String,
    content: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: [String],
    numbers: [Number],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    // created_at: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
    // timestamps: {
    //   createdAt: 'created_at',
    //   updatedAt: 'updated_at',
    // },
    collection: 'posts',
  },
);

export { PostSchema };

export interface Post extends Document {
  title: string;
  description: string;
  content: string;
  tags: [string];
  numbers: [number];
}
