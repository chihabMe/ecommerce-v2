import { useField, useFormik } from "formik";
import React from "react";
import { Input as MUInput } from "@material-tailwind/react";

const Input = ({
  name,
  label,
  type,
}: {
  name: string;
  label: string;
  type: string;
}) => {
  const [field, meta, actions] = useField({ type, name });
  return (
    <div className="flex flex-col gap-2 px-1">
      <MUInput
        size="lg"
        variant="standard"
        className="  font-medium"
        color="orange"
        success={meta.touched && !meta.error}
        error={meta.touched && meta.error != undefined}
        label={label}
        type={type}
        {...field}
      />
      {meta.error && meta.touched && (
        <span className="text-sm font-medium text-red-400">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
