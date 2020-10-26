import React from "react";
import UserForm from "./UserForm";
import { shallow } from "enzyme";

function renderUserForm(args) {
  const defaultProps = {
    user: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<UserForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderUserForm();
  // console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add User");
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderUserForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save button as "Saving..." when saving', () => {
  const wrapper = renderUserForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
