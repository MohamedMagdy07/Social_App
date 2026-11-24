import mongoose, { Document, model, Schema } from "mongoose";

export interface IOtp {
    code: string;
    email: string;
    createdAt?: Date;
}

export type OtpDocument = IOtp & Document;

const otpSchema = new Schema<IOtp>(
    {
        code: {
            type: String,
            required: true,
            length: 6,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false,
        },
        strict: true,
    }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

otpSchema.pre("save", async function () {
    try {
        await mongoose.model("OTP").deleteMany({ email: this.email });
    } catch (err) {
        throw err;
    }
});

export const OTP = model<IOtp>("OTP", otpSchema);
