import { Alert } from "react-native";

function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export function runRegisterationValidation(
  validationObject,
  email,
  passwordCheckPassed,
  password,
  confirmPassword,
  firstname,
  lastname
) {
  let validationsPassed = true;
  const missingFields = [];
  const userCredentials = validationObject;
  const fieldsToValidate = validationObject;

  for (let field in fieldsToValidate) {
    if (!userCredentials[field]) missingFields.push(field);
  }

  if (missingFields.length > 0) {
    return Alert.alert(
      "Errors detected ❌",
      `${missingFields.join(", ")} ${
        missingFields.length > 1 ? "are" : "is"
      } required`,
      [
        {
          text: "CLOSE",
        },
      ]
    );
  }

  if (firstname && !/^[A-Za-z0-9\s]+$/.test(firstname)) {
    return Alert.alert(
      "Invalid inputs ❌",
      "First Name contains unwanted characters",
      [
        {
          text: "CLOSE",
        },
      ]
    );
  }

  if (lastname && !/^[A-Za-z0-9\s]+$/.test(lastname)) {
    return Alert.alert(
      "Invalid inputs ❌",
      "Last Name contains unwanted characters",
      [
        {
          text: "CLOSE",
        },
      ]
    );
  }

  if (email && !validateEmail(email)) {
    return Alert.alert(
      "Invalid Email Format ❌",
      "Plese enter a valid email format",
      [
        {
          text: "CLOSE",
        },
      ]
    );
  }

  if (!passwordCheckPassed) {
    return Alert.alert(
      "Password too weak ❌",
      "Your password has not met the necessary strength requirements",
      [
        {
          text: "CLOSE",
        },
      ]
    );
  }

  if (password !== confirmPassword) {
    return Alert.alert("Password mismatch ❌", "Your passwords have to match", [
      {
        text: "CLOSE",
      },
    ]);
  }

  return validationsPassed;
}

export function runResetPasswordValidations(password, confirmPassword) {
  let validationsPassed = true;

  if (!password || !confirmPassword) {
    return Alert.alert(
      "Empty field detected ❌",
      "Please provide both password credentials",
      [{ text: "CLOSE" }]
    );
  }

  if (password !== confirmPassword) {
    return Alert.alert(
      "Password Mismatch ❌",
      "Both password credentials must match",
      [{ text: "CLOSE" }]
    );
  }

  return validationsPassed;
}
