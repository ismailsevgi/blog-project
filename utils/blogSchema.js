import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    post: String,
    date: String,
    imgUrl: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

//models ismi collection ismi ile aynı olmak zorunda
export default mongoose.models.blogs || mongoose.model('blogs', blogSchema);
