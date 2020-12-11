import mongoose from 'mongoose';

export const Note = mongoose.model("Note", { id: String, title: String, description: String, reminder: String, image: [String] });

export const Image = mongoose.model("Image", { title: String, image: [String] })