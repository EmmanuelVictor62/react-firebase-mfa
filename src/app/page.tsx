"use client";
import { useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import {
  RecaptchaVerifier,
  PhoneAuthProvider,
  createUserWithEmailAndPassword,
  PhoneMultiFactorGenerator,
  UserCredential,
  multiFactor,
} from "firebase/auth";

import Input from "@/components/Input";
import Button from "@/components/Button";

import { auth } from "@/utils/firebase";
import { signUpVerificationSchema } from "@/utils/verification";

import styles from "./page.module.scss";

export default function SignUp() {
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);
  const [isPhoneVerification, setIsPhoneVerification] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [userCredential, setUserCredential] = useState<UserCredential | null>(
    null
  );

  const initialValues = {
    email: "",
    password: "",
    phoneNumber: "",
  };

  const handleSignUp = async (values: {
    email: string;
    password: string;
    phoneNumber?: string;
  }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("User created successfully:", userCredential.user);

      setUserCredential(userCredential);

      if (values.phoneNumber) {
        console.log("Phone number provided for MFA.");
        setIsPhoneVerification(true);

        const verifier = recaptchaVerifier.current;

        if (verifier) {
          const phoneAuthProvider = new PhoneAuthProvider(auth);
          const verificationId = await phoneAuthProvider.verifyPhoneNumber(
            values.phoneNumber,
            verifier
          );
          setVerificationId(verificationId);

          console.log("SMS verification sent.");
        }
      } else {
        console.log("Sign-up completed without MFA.");
      }
    } catch (error) {
      console.error("Sign-up failed:", error);
      alert("Sign-up failed. Please try again.");
    }
  };

  const handlePhoneVerification = async () => {
    if (!verificationId || !userCredential || !verificationCode) return;

    try {
      const cred = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const assertion = PhoneMultiFactorGenerator.assertion(cred);
      const user = userCredential.user;

      await multiFactor(user).enroll(assertion, "My Phone Number");
      console.log("MFA enrollment successful!");

      alert("Phone number enrolled for MFA.");
      setIsPhoneVerification(false);
    } catch (error) {
      console.error("Phone verification failed:", error);
      alert("Phone verification failed. Please try again.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      recaptchaVerifier.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: unknown) => {
            console.log("Recaptcha solved!", response);
          },
          "expired-callback": () => {
            console.log("Recaptcha expired.");
          },
        }
      );

      recaptchaVerifier.current.render();
    }
  }, []);

  return (
    <div className={styles["login"]}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSignUp}
        validationSchema={signUpVerificationSchema}
      >
        <Form className={styles["login__form-container"]}>
          {!isPhoneVerification && (
            <>
              <h1 className={styles["login__form-title"]}>Sign Up</h1>
              <div className={styles["login__form-input-container"]}>
                <Input name="email" type="email" placeholder="Email" />
                <Input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone number"
                />
                <Input name="password" type="password" placeholder="Password" />
              </div>

              <Button type="submit" label="Submit" />
            </>
          )}

          {isPhoneVerification && (
            <div className={styles["login__form-verification"]}>
              <h1 className={styles["login__form-title"]}>Verification</h1>

              <p className={styles["login__form-verification-description"]}>
                Enter verification code sent to your phone:
              </p>

              <div style={{ width: "100%" }}>
                <Input
                  type="text"
                  name="verificationCode"
                  placeholder="Verification Code"
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>

              <Button
                type="button"
                label="Verify Phone"
                handleClick={handlePhoneVerification}
              />
            </div>
          )}

          <div id="recaptcha-container" />
        </Form>
      </Formik>

      <div className={styles["login__background"]}></div>
    </div>
  );
}
