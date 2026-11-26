import mongoose from "mongoose";
import {env} from "../config/env";

mongoose.connect(env.mongoose.uri)
    .catch((err) => console.error(`Failed to connect to MongoDB: ${err.message}`));
