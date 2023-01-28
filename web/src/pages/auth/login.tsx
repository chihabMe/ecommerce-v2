import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import Input from "@/components/ui/Input";
import { loginSchema } from "@/helpers/schemas/auth.schemas";
import { toFormikValidationSchema } from "zod-formik-adapter";
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
      <div className="w-full mx-auto max-w-md pt-10 mt-10">
        <Card className="w-full">
          <CardHeader>login</CardHeader>
          <CardBody>
            <Formik
              validationSchema={toFormikValidationSchema(loginSchema)}
              onSubmit={formSubmitHandler}
              validateOnChange={true}
              initialValues={initialValues}
            >
              {(props) => (
                <Form className="w-full flex flex-col gap-6">
                  <Input label="Email" name="email" type="email" />
                  <Input label="Password" name="password" type="password" />
                  <Button className="w-full">login</Button>
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
