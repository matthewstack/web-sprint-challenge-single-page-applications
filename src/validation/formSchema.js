import * as yup from "yup";

const formSchema = yup.object().shape({
  fullname: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "name must be at least 2 characters"),
  size: yup
    .string()
    .oneOf(["Small", "Medium", "Large", "Xlarge"], "You must select a size"),
  sauce: yup
    .string()
    .oneOf(
      ["Original Red", "Garlic Ranch", "BBQ Sauce", "Spinach Alfredo"],
      "You  must select a sauce"
    ),
  pepperoni: yup.boolean(),
  spinach: yup.boolean(),
  sardines: yup.boolean(),
  onions: yup.boolean(),
  instructions: yup.string().trim(),
});

export default formSchema;
