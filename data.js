
const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  campaign_type: { type: String, default: '' },
  phone_options: { type: String, default: '' },
  dedup_option: { type: String, default: '' },
  zip_codes: [String],
  states: [String],
  cities: [String],
  dwelling_type: [String],
  home_owner: [String],
  hh_income: [String],
  indivisuals: [String],  
  martial_status: [String], 
  age_group: [String],
  credit_rating: [String],
  occupation: { type: String, default: '' },
  ethnic_code: [String],
  propensity_to_give: [String],
  donor_affinity_range: [String],
  donor_affinity_op: { type: String, default: 'AND' },
  turning_65: [String],
  pet_op: { type: String, default: 'AND' },
  pet_range: [String],
  propensity_op: { type: String, default: 'AND' },
  propensity_range: [String],
  outdoor_range: [String],
  outdoor_op: { type: String, default: 'AND' },
  sports_and_fitness_range: [String],
  sports_and_fitness_op: { type: String, default: 'AND' },
  travel_and_hobbies_range: [String],
  travel_and_hobbies_op: { type: String, default: 'AND' },
  genre_range: [String],
  genre_op: { type: String, default: 'AND' },
  save_name: { type: String, default: '' },
  supression_option: { type: String, default: '' },
  user:{type:String}
}, { timestamps: true });

module.exports = mongoose.model('data', DataSchema);
