import React from "react";
import { mount } from "enzyme";
import { newUser, users } from "../../../tools/mockData";
import { ManageUserPage } from "./ManageUserPage";

function render(args) {
  const defaultProps = {
    users,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React Router related behavior.
    history: {},
    saveUser: jest.fn(),
    loadUsers: jest.fn(),
    user: newUser,
    match: {}
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageUserPage {...props} />);
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("first_name is required.");
});
