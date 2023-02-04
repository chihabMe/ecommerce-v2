import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import Input from "@/components/ui/Input";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { API, loginEndpoint, registrationEndpoint } from "@/config/constances";
import { Spinner } from "@/components/ui/Spinner";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useUser } from "@/context/auth.context";
import { registrationSchemas } from "@/helpers/schemas/auth.schemas";
const initialValues = {
  email: "",
  name: "",
  password: "",
  rePassword: "",
};
interface Response {
  status: "error" | "success";
  errors?: string;
  refreshToken?: string;
  accessToken?: string;
}
const RegisterPage = () => {
  //   const { post, error, loading } = useFetch(API, {

  // cache: "no-cache",
  //   });
  const router = useRouter();
  const { loading, success, error, post } = useFetch();
  const { loadUser } = useUser();
  const [data, setData] = useState<Response | null>(null);

  const formSubmitHandler = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    const resData = await post({
      url: registrationEndpoint,
      body: JSON.stringify(values),
    });

    console.log("data=>", data);
    if (resData.status == "error") actions.setErrors(resData.errors);
    else actions.setErrors({});

    setData(resData);
  };

  useEffect(() => {
    if (!loading && success) {
      loadUser();
      router.push("/auth/login");
    }
  }, [loading, success]);
  return (
    <main>
      <div className="mx-auto mt-10 w-full max-w-sm pt-10">
        <Card className="w-full">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-24 place-items-center !bg-primary text-white"
          >
            <Typography className="text-2xl font-semibold capitalize">
              register
            </Typography>
          </CardHeader>
          <CardBody>
            <Formik
              validationSchema={toFormikValidationSchema(registrationSchemas)}
              onSubmit={formSubmitHandler}
              validateOnChange={true}
              initialValues={initialValues}
            >
              {(props) => (
                <Form className="flex w-full flex-col gap-4">
                  <Input label="Username" name="name" type="text" />
                  <Input label="Email" name="email" type="email" />
                  <Input label="Password" name="password" type="password" />
                  <Input
                    label="Password confirmation"
                    name="rePassword"
                    type="password"
                  />

                  <Button
                    type="submit"
                    className="flex w-full items-center justify-center gap-4 bg-primary uppercase"
                  >
                    <span>register</span>
                    {loading && <Spinner />}
                  </Button>
                  <div className="flex items-center justify-center gap-2">
                    <Typography className="px-px text-center text-sm font-medium">
                      do you have an account ?
                    </Typography>
                    <Link
                      href="/auth/login"
                      className="!text-xs font-bold uppercase text-primary"
                    >
                      login
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </div>
    </main>
  );
};

export default RegisterPage;
