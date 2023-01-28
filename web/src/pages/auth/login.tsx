import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import Input from "@/components/ui/Input";
import { loginSchema } from "@/helpers/schemas/auth.schemas";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
const initialValues = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const formSubmitHandler = (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    console.log(values);
  };
  return (
    <main>
      <div className="w-full mx-auto max-w-sm pt-10 mt-10">
        <Card className="w-full">
          <CardHeader
            variant="gradient"
            color="blue"
            className="!bg-primary grid h-24 mb-4 place-items-center"
          >
            <Typography className="text-2xl capitalize font-semibold">
              login
            </Typography>
          </CardHeader>
          <CardBody>
            <Formik
              validationSchema={toFormikValidationSchema(loginSchema)}
              onSubmit={formSubmitHandler}
              validateOnChange={true}
              initialValues={initialValues}
            >
              {(props) => (
                <Form className="w-full flex flex-col gap-4">
                  <Input label="Email" name="email" type="email" />
                  <Input label="Password" name="password" type="password" />
                  <div className="flex gap-2 items-center">
                    <Typography className="font-sans">Remember me </Typography>
                    <Checkbox />
                  </div>
                  <Button className="w-full uppercase">login</Button>
                  <Typography className="font-medium text-sm text-center">
                    don't have an account ?{" "}
                    <Link
                      href="/auth/register"
                      className="uppercase text-blue-500 font-bold"
                    >
                      register
                    </Link>
                  </Typography>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </div>
    </main>
  );
};

export default LoginPage;
