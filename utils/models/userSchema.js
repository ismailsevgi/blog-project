import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

//models ismi collection ismi ile aynı olmak zorunda
//mongoose.models.<collectionName> || mongoose.model('<collectionName>, schema)

export default mongoose.models.admins || mongoose.model('admins', userSchema);
