import mongoose, { Schema, model, models } from "mongoose";

const TemplateSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    color: { type: String },
    tag: { type: String },
    image: { type: String },
    description: { type: String },
    features: [String],
    // createdAt aur updatedAt khud ba khud handle ho jayenge niche wale options se
  },
  { 
    // Isse Mongoose apne aap createdAt aur updatedAt fields add kar dega
    timestamps: true 
  }
);

// Model check aur export
// models/Template.ts ke aakhir mein ye use karein
export const Template = mongoose.models.Template || mongoose.model("Template", TemplateSchema, "templates");