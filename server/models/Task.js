import mongoose from "mongoose";
const { Schema } = mongoose;
const taskSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: [true, "A title is needed"],
    },
    desc: {
      type: String,
      required: [true, "A description is needed"],
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
