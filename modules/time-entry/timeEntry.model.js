const mongoose = require("mongoose");

const timeEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    //   projectId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Project",
    //     required: false,
    //     index: true,
    //   },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    startTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return !this.endTime || value <= this.endTime;
        },
        message: "Start time cannot be after end time.",
      },
    },
    endTime: {
      type: Date,
      default: null,
      validate: {
        validator: function (value) {
          return !value || value >= this.startTime;
        },
        message: "End time cannot be before start time.",
      },
    },
    durationMinutes: {
      type: Number,
      default: 0,
      min: 0,
    }
  },
  {
    timestamps: true,
  }
);

timeEntrySchema.pre("save", function (next) {
  if (this.endTime) {
    const diffMs = this.endTime - this.startTime;
    this.durationMinutes = Math.round(diffMs / 1000 / 60);
  }
  next();
});


const timeEntryModel = mongoose.model("TimeEntry", timeEntrySchema);

module.exports = timeEntryModel;
