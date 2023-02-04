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
      <div className="mx-auto mt-10 w-full max-w-sm pt-10">
        <Card className="w-full">
          <CardHeader
            color="blue"
            className="mb-4 grid h-24 place-items-center  !bg-primary"
          >
            <Typography className="text-2xl font-semibold capitalize">
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
                <Form className="flex w-full flex-col gap-4">
                  <Input label="Email" name="email" type="email" />
                  <Input label="Password" name="password" type="password" />
                  {error && (
                    <div>
                      <Typography className="text-sm font-medium text-red-400">
                        {data?.errors}
                      </Typography>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Typography className="font-sans">Remember me </Typography>
                    <Checkbox />
                  </div>
                  <Button
                    type="submit"
                    className="flex w-full items-center justify-center gap-4 bg-primary uppercase"
                  >
                    <span>login</span>
                    {loading && <Spinner />}
                  </Button>
                  <div className="flex items-center justify-center gap-2">
                    <Typography className="px-px text-center text-sm font-medium">
                      don't have an account ?{" "}
                    </Typography>
                    <Link
                      href="/auth/register"
                      className="!text-xs font-bold uppercase text-primary"
                    >
                      register
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

export default LoginPage;
