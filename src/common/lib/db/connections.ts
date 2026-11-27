import mongoose from "mongoose";
import {env} from "../config/env";

// await mongoose.connect(env.mongoose.uri)
//     .catch((err) => console.error(`Failed to connect to MongoDB: ${err.message}`));

try {
    await mongoose.connect(env.mongoose.uri);
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Stop the app immediately if DB is unreachable
}