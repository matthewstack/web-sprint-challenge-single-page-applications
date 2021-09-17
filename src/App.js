import React, { useState, useEffect } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import schema from "./validation/formSchema";
import OrderPizza from "./OrderPizza";
import "./App.css";

const initialFormValues = {
  fullname: "",
  size: "",
  sauce: "",
  pepperoni: false,
  spinach: false,
  sardines: false,
  onions: false,
  instructions: "",
};

const initialFormErrors = {
  fullname: "",
  size: "",
  sauce: "",
};

const initialOrders = [];
const initialDisabled = true;

const App = () => {
  const [orders, getOrders] = useState(initialOrders);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const postNewOrder = (newOrder) => {
    axios
      .post("https://reqres.in/api/orders", newOrder)
      .then((res) => {
        console.log(res.data);
        getOrders(orders.concat(newOrder));
      })
      .catch((err) => console.error(err));
    setDisabled(initialDisabled);
    setFormValues(initialFormValues);
  };

  const formSubmit = () => {
    const newOrder = {
      fullname: formValues.fullname.trim(),
      size: formValues.size.trim(),
      sauce: formValues.sauce.trim(),
      toppings: ["pepperoni", "spinach", "sardines", "onions"].filter(
        (topping) => !!formValues[topping]
      ),
      instructions: formValues.instructions.trim(),
    };
    postNewOrder(newOrder);
    console.log(newOrder);
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div>
      <div className="navigation">
        <h1>Lambda Eats</h1>
        <NavLink to="/">
          <button id="home">Home</button>
        </NavLink>
      </div>
      <Switch>
        <Route exact path="/">
          <div>
            <NavLink to="/pizza">
              <button id="order-pizza">Order Pizza</button>
            </NavLink>
          </div>
        </Route>
        <Route path="/pizza">
          <OrderPizza
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            errors={formErrors}
            disabled={disabled}
          />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
