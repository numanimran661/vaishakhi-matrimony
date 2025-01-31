import { SelectFieldConstantsProps } from "@/types/formTypes";


export const selectFields: SelectFieldConstantsProps = [
    {
      label: "Age",
      name: "age",
      options: [
        { value: "18-25", label: "18-25" },
        { value: "26-35", label: "26-35" },
        { value: "36-45", label: "36-45" },
      ],
    },
    {
      label: "Gender",
      name: "gender",
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
      ],
    },
    {
      label: "Height",
      name: "height",
      options: [
        { value: "Short", label: "Short" },
        { value: "Medium", label: "Medium" },
        { value: "Tall", label: "Tall" },
      ],
    },
    {
      label: "Marital Status",
      name: "maritalStatus",
      options: [
        { value: "Single", label: "Single" },
        { value: "Married", label: "Married" },
        { value: "Divorced", label: "Divorced" },
      ],
    },
    {
      label: "Religion",
      name: "religion",
      options: [
        { value: "Christian", label: "Christian" },
        { value: "Muslim", label: "Muslim" },
        { value: "Other", label: "Other" },
      ],
    },
    {
      label: "Mother Tongue",
      name: "motherTongue",
      options: [
        { value: "English", label: "English" },
        { value: "Hindi", label: "Hindi" },
        { value: "Other", label: "Other" },
      ],
    },
    {
      label: "Cast",
      name: "cast",
      options: [
        { value: "General", label: "General" },
        { value: "OBC", label: "OBC" },
        { value: "SC/ST", label: "SC/ST" },
      ],
    },
    {
      label: "City",
      name: "city",
      options: [
        { value: "New York", label: "New York" },
        { value: "Los Angeles", label: "Los Angeles" },
        { value: "Other", label: "Other" },
      ],
    },
  ];


export const selectFieldsPersonal: SelectFieldConstantsProps = [
    {
      label: "Highest Degree",
      name: "hd",
      options: [
        { value: "Software Engineer", label: "Software Engineer" },
        { value: "Electrical Engineer", label: "Electrical Engineer" },
        { value: "Electronics Engineer", label: "Electronics Engineer" },
      ],
    },
    {
      label: "Occupation",
      name: "occupation",
      options: [
        { value: "Engineer", label: "Engineer" },
        { value: "Doctor", label: "Doctor" },
        { value: "Developer", label: "Developer" },
      ],
    },
    {
      label: "Employment",
      name: "employment",
      options: [
        { value: "HR", label: "HR" },
        { value: "Manager", label: "Manager" },
        { value: "Asso. Engineer", label: "Asso. Engineer" },
      ],
    },
    {
      label: "Annual Income",
      name: "ai",
      options: [
        { value: "1000000", label: "1000000" },
        { value: "3000000", label: "4444444" },
        { value: "233232323", label: "233232323" },
      ],
    },
    {
      label: "Work Location",
      name: "wl",
      options: [
        { value: "Onsite", label: "Onsite" },
        { value: "Remote", label: "Remote" },
        { value: "Hybrid", label: "Hybrid" },
      ],
    },
  ];