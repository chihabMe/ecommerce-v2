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
import { loginSchema } from "@/helpers/schemas/auth.schemas";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { API, loginEndpoint } from "@/config/constances";
import { Spinner } from "@/components/ui/Spinner";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useUser } from "@/context/auth.context";
const initialValues = {
  email: "",
  password: "",
};
interface Response {
  status: "error" | "success";
  errors?: string;
  refreshToken?: string;
  accessToken?: string;
}
const LoginPage = () => {
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
      url: loginEndpoint,
      body: JSON.stringify(values),
    });
    if (resData.status == "error")
      actions.setErrors({
        email: "",
        password: "",
      });
    else actions.setErrors({});

    setData(resData);
  };

  useEffect(() => {
    if (!loading && success) {
      loadUser();
      router.push("/");
    }
  }, [loading, success]);
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
                  {error && (
                    <div>
                      <Typography className="text-red-400 text-sm font-medium">
                        {data?.errors}
                      </Typography>
                    </div>
                  )}

                  <div className="flex gap-2 items-center">
                    <Typography className="font-sans">Remember me </Typography>
                    <Checkbox />
                  </div>
                  <Button
                    type="submit"
                    className="w-full uppercase flex justify-center items-center gap-4"
                  >
                    <span>login</span>
                    {loading && <Spinner />}
                  </Button>
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
