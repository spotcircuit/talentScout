import mongoose, { Schema } from 'mongoose';

const ContactInfoSchema = new Schema({
  email: String,
  phone: String,
  linkedin: String,
});

const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  title: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: String,
  current: Boolean,
  description: String,
  skills: [String],
});

const EducationSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String, required: true },
  startDate: String,
  endDate: String,
  current: Boolean,
});

const LanguageSchema = new Schema({
  name: { type: String, required: true },
  proficiency: { type: String, required: true },
});

const TalentSchema = new Schema(
  {
    name: { type: String, required: true },
    photo: String,
    title: String,
    location: String,
    yearsOfExperience: Number,
    skills: [String],
    availability: String,
    bio: String,
    experience: [ExperienceSchema],
    education: [EducationSchema],
    certifications: [String],
    languages: [LanguageSchema],
    portfolioUrl: String,
    githubUrl: String,
    linkedinUrl: String,
    contactInfo: ContactInfoSchema,
    desiredRoles: [String],
    desiredSalary: String,
    desiredLocations: [String],
    remotePreference: String,
  },
  {
    timestamps: true,
  }
);

// Add text index for search
TalentSchema.index(
  { 
    name: 'text', 
    title: 'text', 
    bio: 'text',
    skills: 'text',
    location: 'text',
  }
);

export const Talent = mongoose.models.Talent || mongoose.model('Talent', TalentSchema);
