import express from "express";
import {
  createHackathon,
  getHackathon,
  getHackathons,
  updateHackathon,
} from "../controllers/hackathon";
import {
  addModerator,
  createTeam,
  joinTeam,
  removeModerator,
} from "../controllers/hackathon-activity";
import { verifyObjectId } from "../middlewares/ObjectIdVerifier";
import { verifyToken } from "../middlewares/token-verifier";
import { validate } from "../middlewares/Validate";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  validate({
    name: "string",
    startTime: "number",
    endTime: "number",
    organizerId: "string",
    minParticipantCount: "number",
    maxParticipantCount: "number",
  }),
  createHackathon
);

router.put(
  "/:hackathonId/update",
  verifyToken,
  verifyObjectId(["hackathonId"]),
  updateHackathon
);

router.get("/", verifyToken, getHackathons);

router.put(
  "/:hackathonId/user/team/create",
  verifyToken,
  validate({ name: "string" }),
  verifyObjectId(["hackathonId"]),
  createTeam
);

router.put(
  "/:hackathonId/user/team/:teamCode/join",
  verifyToken,
  verifyObjectId(["hackathonId"]),
  joinTeam
);

router.put(
  "/:hackathonId/moderator/add",
  verifyToken,
  validate({ moderatorId: "string" }),
  verifyObjectId(["hackathonId"]),
  addModerator
);

router.put(
  "/:hackathonId/moderator/remove",
  verifyToken,
  validate({ moderatorId: "string" }),
  verifyObjectId(["hackathonId"]),
  removeModerator
);

router.get(
  "/:hackathonId",
  verifyToken,
  verifyObjectId(["hackathonId"]),
  getHackathon
);

export default router;
