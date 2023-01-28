import { useField, useFormik } from "formik";
import React from "react";
import { Input as MUInput } from "@material-tailwind/react";

const Input = ({
  name,
  label,
  type,
  ...props
}: {
  name: string;
  label: string;
  type: string;
}) => {
  const [field, meta, actions] = useField({ name, type });
  return (
    <div className="flex flex-col gap-2">
      <MUInput
        success={meta.touched && !meta.error}
        error={meta.touched && meta.error != undefined}
        name={name}
        label={label}
        {...props}
      />
      {meta.error && meta.touched && (
        <span className="text-sm text-red-400 font-medium">{meta.error}</span>
      )}
      <span>
        {field.name}
        {field.value}
      </span>
    </div>
  );
};

export default Input;
