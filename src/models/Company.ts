import mongoose, { Schema } from 'mongoose';

const ContactInfoSchema = new Schema({
  email: String,
  phone: String,
  linkedin: String,
});

const DecisionMakerSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  email: String,
  linkedin: String,
});

const TalentNeedSchema = new Schema({
  role: { type: String, required: true },
  count: Number,
  priority: String,
  skills: [String],
});

const CompanySchema = new Schema(
  {
    name: { type: String, required: true },
    logo: String,
    description: String,
    website: String,
    industry: String,
    companySize: String,
    founded: String,
    headquarters: String,
    specialities: String,
    hiringStatus: String,
    openPositions: Number,
    about: String,
    culture: String,
    benefits: [String],
    techStack: [String],
    contact: ContactInfoSchema,
    keyDecisionMakers: [DecisionMakerSchema],
    hiringChallenges: [String],
    growthStage: String,
    fundingStatus: String,
    hiringBudget: String,
    hiringGoals: String,
    hiringTimeline: String,
    recruitingPartners: Boolean,
    talentNeeds: [TalentNeedSchema],
    hiringProcess: [String],
    previousRecruitingExperience: String,
    preferredCommunicationChannel: String,
  },
  {
    timestamps: true,
  }
);

// Add text index for search
CompanySchema.index(
  { 
    name: 'text', 
    description: 'text', 
    industry: 'text',
    specialities: 'text',
    headquarters: 'text',
  }
);

export const Company = mongoose.models.Company || mongoose.model('Company', CompanySchema);
