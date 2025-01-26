const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "" || email === null)
    return { error: true, helperText: "message-email-required" };

  if (!emailRegex.test(email))
    return { error: true, helperText: "message-email-invalid-format" };

  return { error: false, helperText: null };
};

const validPassword = (password) => {
  if (password === "" || password === null)
    return { error: true, helperText: "message-password-required" };

  if (password.length < 6)
    return {
      error: true,
      helperText: "message-password-min-6-digits",
    };

  return { error: false, helperText: null };
};

const validateEat = (data) => {
  const invalidFields = [];

  if (!data || !data.type || ![1, 2].includes(data.type))
    invalidFields.push("eat-type");

  if (!data || !data.start_date)
    invalidFields.push(data.type === 1 ? "data-hour" : "data-hour-start");

  if (data.type === 1) {
    if (!data || !data.quantity || Number(data.quantity) < 0)
      invalidFields.push("quantity");
  } else {
    if (!data || !data.side || ![1, 2, 3].includes(data.side))
      invalidFields.push("eat-side");

    if (!data || !data.end_date) invalidFields.push("data-hour-end");
  }

  return invalidFields;
};

const validateSleep = (data) => {
  const invalidFields = [];

  if (!data || !data.start_date) invalidFields.push("data-hour-start");

  if (!data || !data.end_date) invalidFields.push("data-hour-end");

  return invalidFields;
};

const validateDiaper = (data) => {
  const invalidFields = [];

  if (!data || !data.start_date) invalidFields.push("data-hour-start");

  if (!data || !data.type || ![1, 2, 3, 4].includes(data.type))
    invalidFields.push("diaper-status");

  return invalidFields;
};

const validateFields = (data, actionType) => {
  console.log(data);
  switch (actionType) {
    case "1":
      return validateSleep(data);
    case "2":
      return validateEat(data);
    case "3":
      return validateDiaper(data);
    default:
      return validateEat(data);
  }
};

const validName = (name) => {
  if (name === null || name.trim() === "")
    return { error: true, helperText: "message-name-required" };

  return { error: false, helperText: null };
};

const validBirth = (birth) => {
  if (birth === null)
    return { error: true, helperText: "message-birth-required" };

  return { error: false, helperText: null };
};

const validWeight = (weight) => {
  if (weight === null || weight === "")
    return { error: true, helperText: "message-weight-required" };

  if (weight < 0)
    return { error: true, helperText: "message-weight-invalid-format" };

  return { error: false, helperText: null };
};

const validHeight = (height) => {
  if (height === null || height === "")
    return { error: true, helperText: "message-height-required" };

  if (height < 0)
    return { error: true, helperText: "message-height-invalid-format" };

  return { error: false, helperText: null };
};

export {
  validateEmail,
  validPassword,
  validateFields,
  validName,
  validWeight,
  validHeight,
  validBirth,
};
