"use client";
import React from "react";
import { useField } from "formik";

import styles from "./input.module.scss";

interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type: "text" | "password" | "email" | "number";
  variant?: "primary" | "secondary";
  required?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
  const [field, meta] = useField(props.name);

  const isSuccess = Boolean(field.value && !meta.error);
  const isError = Boolean(meta.error && meta.touched);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e);
    }

    field.onChange(e);
  };

  return (
    <div className={styles["input__wrapper"]}>
      {props.label && (
        <label className={styles["input__label"]} htmlFor={props.name}>
          {props.label}
          <span className={styles["input__required"]}>
            {props.required ? "*" : ""}
          </span>
        </label>
      )}
      <div className={styles["input__container"]}>
        <div
          data-success={Boolean(isSuccess) === true}
          data-error={isError}
          className={styles["input__box"]}
          style={props.style}
          data-variant={props.variant}
        >
          <input
            {...field}
            className={styles["input"]}
            type={props.type}
            placeholder={props.placeholder}
            disabled={props.disabled}
            onChange={handleChange}
          />
        </div>

        {isError && <p className={styles["input__error"]}>{meta.error}</p>}
      </div>
    </div>
  );
};

export default Input;
