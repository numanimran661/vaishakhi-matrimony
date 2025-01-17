"use client"

import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '@/app/components/common/inputFields/InputField';
import Button from '@/app/components/common/buttons/Button';
import { GoogleLogo } from '@/app/components/common/allImages/AllImages';

const SignupForm: React.FC = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2 className='text-3xl font-bold mb-7'>Create new Account</h2>
          <InputField label="Email Address" name="email" type="email" placeholder='Email Address' />
          <InputField label="Password" name="password" type="password" placeholder='Password' />
          <Button
            type="submit"
            disabled={isSubmitting}
            label='Sign Up'
            className='mt-3 w-full'
          />
          <Button
            type="button"
            disabled={isSubmitting}
            label='Sign Up with google'
            icon={GoogleLogo}
            className='mt-3 w-full bg-lightBlue'
            variant='light'
          />
          <div className='mt-3 font-regular'>
            <span>Already have an account?</span>{" "}
            <span className='text-primary'>Log in</span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
