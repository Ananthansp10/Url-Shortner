import mongoose, { Schema } from "mongoose";

const urlsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  urls: [
    {
      longUrl: {
        type: String,
      },
      shortUrl: {
        type: String,
      },
      date: {
        type: String,
      },
    },
  ],
});

export const urlsModel = mongoose.model("urls", urlsSchema);
