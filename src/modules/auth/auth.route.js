import * as authController from "./controller/auth.controller.js"
import {Router} from "express";
import {idempotency} from "../../lib/idempotency/idempotency.js";
import {guard} from "../../lib/auth/guard.js";

export const authRouter = Router();

