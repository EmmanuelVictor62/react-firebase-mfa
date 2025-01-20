import * as Yup from "yup";

export const signUpVerificationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Password is required."),
  phoneNumber: Yup.string()
    .matches(/^\+/, "Phone number must start with a +")
    .matches(
      /^[\+][0-9]*$/,
      "Phone number is invalid. It must start with + followed by digits."
    )
    .required("Phone number is required."),
});
