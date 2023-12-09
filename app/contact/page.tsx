"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactUs = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log(values);
    setSubmitting(false);
  };

  const socialLinks = [
    { href: "/discord", label: "Discord" },
    { href: "/github", label: "GitHub" },
    { href: "/twitter", label: "Twitter" },
    { href: "/linkedin", label: "LinkedIn" },
    {
      href: "/youtube",
      label: "YouTube",
    },
  ];

  return (
    <div className="pt-[70px] min-h-screen flex justify-center items-center px-4 md:px-6 lg::px-8 bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <section>
            <h1>Contact Us</h1>
            <p>
              We'd love your input: questions, feature requests, bugs, or
              compliments.
            </p>
          </section>
          <section>
            <h2>Follow us</h2>
            <ul>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col">
              <div className="flex mb-4 gap-5 w-full">
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border p-2 rounded-md w-full bg-gray-900 bg-opacity-25"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 mt-2"
                  />
                </div>
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="border p-2 rounded-md w-full"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-2"
                  />
                </div>
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="border p-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>
              <div className="mb-4">
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Your message"
                  className="border p-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>

              <button
                type="submit"
                className="bg-white text-black font-medium py-2 px-4 rounded-md"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
