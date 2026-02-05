const mongoose = require('mongoose');

const yarnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      match: /\D/
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      match: /\D/
    },
    weight: {
      type: String
    },
    fiber: {
      type: String
    },
    colorName: {
      type: String,
      trim: true
    },
    colorCode: {
      type: String,
      trim: true
    },
    dyeLot: {   
      type: String,
      trim: true
    },
    skeins: {
      type: Number,
      default: 1,
      min: 0
    },
    gramsPerSkein: {
     type: Number,
     min: 0
    },
    metersPerSkein: {
     type: Number,
     min: 0
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Yarn', yarnSchema);
