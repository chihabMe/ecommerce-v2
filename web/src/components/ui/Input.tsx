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
    <div className="flex flex-col gap-2">
      <MUInput
        size="lg"
        variant="standard"
        success={meta.touched && !meta.error}
        error={meta.touched && meta.error != undefined}
        label={label}
        {...field}
      />
      {meta.error && meta.touched && (
        <span className="text-sm text-red-400 font-medium">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
