import { View, Text } from "react-native";
import { useState } from "react";
import SignUpForm from "../../components/signup_form/SignUpForm";
import Interests from "../../components/interests/Interests";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function CreateAccountscreen() {
  const [pageStep, setPageStep] = useState(1);
  const [values, setValues] = useState(initialValues);
  const [interests, setInterests] = useState([]);

  function nextStep() {
    setPageStep((currentStep) => currentStep + 1);
  }

  function previousStep() {
    if (pageStep === 1) return;
    setPageStep((currentStep) => currentStep - 1);
  }

  function handleInputChange(name, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  switch (pageStep) {
    case 1:
      return (
        <SignUpForm
          values={values}
          handleInputChange={handleInputChange}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <Interests
          values={values}
          setValues={setValues}
          initialValues={initialValues}
          interests={interests}
          setInterests={setInterests}
          previousStep={previousStep}
        />
      );
    default:
      return null;
  }
}
