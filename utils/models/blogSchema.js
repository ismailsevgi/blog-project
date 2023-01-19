import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: false },
    post: { type: String, required: true },
    date: { type: String, required: false },
    imgUrl: { type: String, required: true },
    category: { type: String, required: true },
    otherImages: { type: Array, required: false },
  },
  {
    timestamps: true,
  }
);

//models ismi collection ismi ile aynı olmak zorunda
export default mongoose.models.blogs || mongoose.model('blogs', blogSchema);
