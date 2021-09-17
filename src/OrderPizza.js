import React from "react";

export default function OrderPizza(props) {
  const { values, submit, change, errors, disabled } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, checked, type } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form id="pizza-form" className="formContainer" onSubmit={onSubmit}>
      <div className="formInputContainer">
        <h2>Build Your Pizza</h2>
      </div>
      <div>
        <div className="formInputContainer">
          <label>
            <h3>Choice of Size</h3>
            <h4>{errors.size}</h4>
            <select
              value={values.size}
              name="size"
              id="size-dropdown"
              onChange={onChange}
            >
              <option value="">-- Select a Size --</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Xlarge">X-Large</option>
            </select>
          </label>
        </div>
        <div className="formInputContainer">
          <h3>Choice of Sauce</h3>
          <h4>{errors.sauce}</h4>

          <label>
            <input
              id="red"
              name="sauce"
              type="radio"
              value="Original Red"
              onChange={onChange}
              checked={values.sauce === "Original Red"}
            />
            Original Red
          </label>
          <label>
            <input
              name="sauce"
              type="radio"
              value="Garlic Ranch"
              onChange={onChange}
              checked={values.sauce === "Garlic Ranch"}
            />
            Garlic Ranch
          </label>
          <label>
            <input
              name="sauce"
              type="radio"
              value="BBQ Sauce"
              onChange={onChange}
              checked={values.sauce === "BBQ Sauce"}
            />
            BBQ Sauce
          </label>
          <label>
            <input
              name="sauce"
              type="radio"
              value="Spinach Alfredo"
              onChange={onChange}
              checked={values.sauce === "Spinach Alfredo"}
            />
            Spinach Alfredo
          </label>
        </div>
        <div className="formInputContainer">
          <h3>Toppings</h3>
          <label>
            <input
              name="pepperoni"
              type="checkbox"
              checked={values.pepperoni}
              value={values.pepperoni}
              onChange={onChange}
            />
            Pepperoni
          </label>
          <label>
            <input
              name="spinach"
              type="checkbox"
              checked={values.spinach}
              value={values.spinach}
              onChange={onChange}
            />
            Spinach
          </label>
          <label>
            <input
              name="sardines"
              type="checkbox"
              checked={values.sardines}
              value={values.sardines}
              onChange={onChange}
            />
            Sardines
          </label>
          <label>
            <input
              name="onions"
              type="checkbox"
              checked={values.onions}
              value={values.onions}
              onChange={onChange}
            />
            Onions
          </label>
        </div>

        <div className="formInputContainer">
          <label>
            <div>
              <h3>Special Instructions</h3>
            </div>
            <div>
              <textarea
                id="special-text"
                name="instructions"
                value={values.instructions}
                onChange={onChange}
              />
            </div>
          </label>
        </div>
        <div className="formInputContainer">
          <label>
            {" "}
            <h3>Full Name</h3>
            <h4>{errors.fullname}</h4>
            <input
              name="fullname"
              id="name-input"
              type="text"
              value={values.fullname}
              onChange={onChange}
            />
          </label>
        </div>
        <div className="formInputContainer">
          <button id="order-button" disabled={disabled}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
