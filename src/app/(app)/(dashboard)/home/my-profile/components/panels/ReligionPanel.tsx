"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@/app/components/common/buttons/Button";
import DatePicker from "@/app/components/common/inputFields/DatePicker";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { religionFormFields } from "@/constants/formConstants";

interface ProfileFormData {
  [key: string]: any; // Allow dynamic keys
}
interface ReligionPanelProps {
  formData: Record<string, string>; // Flexible type to avoid TS errors
  handleFormSubmit: (values: Record<string, string>) => void;
}

const ReligionPanel: React.FC<ReligionPanelProps> = ({
  formData,
  handleFormSubmit,
}) => {
  // Generate validation schema dynamically based on form fields
  const validationSchema = Yup.object().shape(
    religionFormFields.reduce((schema, field) => {
      schema[field.name] = Yup.string().required(`${field.label} is required`);
      return schema;
    }, {} as Record<string, Yup.StringSchema>)
  );

  return (
    <Formik
      initialValues={{
        ...religionFormFields.reduce((acc, item) => {
          acc[item.name] = formData?.[item.name] || "";
          return acc;
        }, {} as ProfileFormData),
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        setFieldValue,
      }) => (
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {religionFormFields.map((item, i) => (
              <div key={i}>
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
              </div>
            ))}

            {/* Birth Time Picker */}
            <div>
              <Field
                as={DatePicker}
                label="Birth Time"
                name="birthTime"
                value={values.birthTime}
                onChange={handleChange}
                error={errors.birthTime}
                touched={touched.birthTime}
                className="w-full"
              />
            </div>
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

export default ReligionPanel;
