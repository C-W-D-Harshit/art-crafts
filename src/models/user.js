import bcrypt from "bcryptjs";
import crypto from "crypto";
import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
      enum: ["google", "credentials"],
      default: "credentials",
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user", "seller"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "blocked"],
      default: "active",
    },
    verified: {
      type: Boolean,
      required: true,
      default: true,
    },
    verifyKey: Number,
    verifyKeyExpires: Date,
    passwordChangedAt: Number,
    passwordResetToken: String,
    passwordResetExpires: Date,
    phoneNumber: Number,
    address: {
      address: String,
      city: String,
      state: String,
      postalCode: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving it to the database
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.checkPassword = async (candi, user) => {
  return await bcrypt.compare(candi, user);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  const timestamp = parseInt(this.passwordChangedAt?.getTime() / 1000);
  return JWTTimestamp < timestamp;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createVerifyKey = function () {
  function generateOTP() {
    const otpLength = 6;
    const min = Math.pow(10, otpLength - 1);
    const max = Math.pow(10, otpLength) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  this.verifyKey = generateOTP();
  this.verifyKeyExpires = Date.now() + 10 * 60 * 1000;
};

userSchema.methods.createVerifyKey = function () {
  function generateOTP() {
    const otpLength = 6;
    const min = Math.pow(10, otpLength - 1);
    const max = Math.pow(10, otpLength) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  this.verifyKey = generateOTP();
  this.verifyKeyExpires = Date.now() + 10 * 60 * 1000;

  return this.verifyKey; // Return the generated OTP
};

const User = models.User || mongoose.model("User", userSchema);

export default User;
