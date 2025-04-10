"use client";

import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Button from "@/app/components/common/buttons/Button";
import DatePicker from "@/app/components/common/inputFields/DatePicker";
import InputField from "@/app/components/common/inputFields/InputField";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { basicInfoFormFields } from "@/constants/formConstants";
import { FormData } from "@/types/formTypes";

interface ProfileFormData {
  [key: string]: any; // Allow dynamic keys
}

interface BasicPanelProps {
  formData: FormData;
  handleFormSubmit: (values: ProfileFormData) => void;
}

const BasicInfoPanel: React.FC<BasicPanelProps> = ({
  formData,
  handleFormSubmit,
}) => {

  return (
    <Formik
      enableReinitialize
      initialValues={{
        // dateOfBirth: formData?.dateOfBirth,
        // age: formData?.age,
        // city: formData?.city,
        // gender: formData?.gender,
        // height: formData?.height,
        // maritalStatus: formData?.maritalStatus,
        // motherTongue: formData?.motherTongue,
        // religion: formData?.religion,
        // sect: formData?.sect,
        ...basicInfoFormFields.reduce((acc, item) => {
          acc[item.name] = formData?.[item.name] || "";
          return acc;
        }, {} as ProfileFormData),
      }}
      validationSchema={Yup.object({
        dateOfBirth: Yup.string().required("Date of Birth is required"),
        age: Yup.string().required("Age is required"),
        city: Yup.string().required("City is required"),
        gender: Yup.string().required("Gender is required"),
        height: Yup.string().required("Height is required"),
        maritalStatus: Yup.string().required("Marital Status is required"),
        motherTongue: Yup.string().required("Mother Tongue is required"),
        religion: Yup.string().required("Religion is required"),
        sect: Yup.string().required("Sect is required"),
      })}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        isSubmitting,
        touched,
        handleChange,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <Field
              as={InputField}
              label="Full Name"
              name="fullName"
              value={values.fullName}
              error={errors.fullName}
              touched={touched.fullName}
              placeholder="Full Name"
              className="w-full"
            /> */}
            {basicInfoFormFields.map((item, i) => (
              <div key={i}>
                {item?.name === "dateOfBirth" ? (
                  <Field
                    as={DatePicker}
                    name={item?.name}
                    label={item?.label}
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    error={errors.dateOfBirth}
                    touched={touched.dateOfBirth}
                    className="w-full"
                  />
                ) : (
                  <Field
                    as={SelectField}
                    label={item.label}
                    name={item.name}
                    value={values[item.name]}
                    onChange={handleChange}
                    options={item.options}
                    error={errors[item.name]}
                    touched={touched[item.name]}
                    className="w-full"
                  />
                )}
              </div>
            ))}
          </div>
          <Button
            type="submit"
            label={isSubmitting ? "Saving..." : "Save Changes"}
            className="mt-5 md:w-auto w-full"
          />
        </Form>
      )}
    </Formik>
  );
};

export default BasicInfoPanel;
