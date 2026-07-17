import { useState } from "react";

// useForm() accepts an object of default values, creates a state object,
// a shared change handler, and a reset handler, and returns them so any
// form component can control its inputs without repetitive code.
export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleReset = () => {
    setValues(defaultValues);
  };

  return { values, handleChange, setValues, handleReset };
}
