import mongoose from "mongoose";
import dotenv from "dotenv";
import { HackathonStatus } from "./HackathonStatus";
dotenv.config();

const uri: any = process.env.DB_CONNECTION_URI;
const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options, async () => {
  console.log("connected to database successfully.");
  startSchedular();
});

const startSchedular = () => {
  setInterval(async () => {
    let currMilli = new Date().getTime();
    // Scheduler for starting Registration of Hackathon
    await mongoose.connection.collection("hackathons").updateMany(
      {
        status: HackathonStatus.HACKATHON_CREATED,
        $and: [
          { registrationStartTime: { $exists: true } },
          { registrationStartTime: { $lte: currMilli } },
        ],
      },
      {
        $set: {
          status: HackathonStatus.REGISTRATION_STARTED,
          updatedTime: currMilli,
        },
      }
    );
    // Scheduler for ending Registration of Hackathon
    currMilli = new Date().getTime();
    await mongoose.connection.collection("hackathons").updateMany(
      {
        status: HackathonStatus.REGISTRATION_STARTED,
        $and: [
          { registrationEndTime: { $exists: true } },
          { registrationEndTime: { $lte: currMilli } },
        ],
      },
      {
        $set: {
          status: HackathonStatus.REGISTRATION_ENDED,
          updatedTime: currMilli,
        },
      }
    );
    // Scheduler for starting Hackathon
    currMilli = new Date().getTime();
    await mongoose.connection.collection("hackathons").updateMany(
      {
        status: HackathonStatus.REGISTRATION_ENDED,
        startTime: { $lte: currMilli },
      },
      {
        $set: {
          status: HackathonStatus.IN_PROGRESS,
          updatedTime: currMilli,
        },
      }
    );
    // Scheduler for ending Hackathon
    currMilli = new Date().getTime();
    await mongoose.connection.collection("hackathons").updateMany(
      {
        status: HackathonStatus.IN_PROGRESS,
        endTime: { $lte: currMilli },
      },
      {
        $set: {
          status: HackathonStatus.HACKATHON_ENDED,
          updatedTime: currMilli,
        },
      }
    );
    console.log("Schedular running", currMilli);
  }, 10000);
};
