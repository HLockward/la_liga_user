import React from "react";
import { cleanup, render } from "react-testing-library";
import UserForm from "./UserForm";

afterEach(cleanup);

function renderUserForm(args) {
  let defaultProps = {
    user: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<UserForm {...props} />);
}

it("should render Add User header", () => {
  const { getByText } = renderUserForm();
  getByText("Add User");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderUserForm();
  getByText("Save");
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText } = renderUserForm({ saving: true });
  getByText("Saving...");
});
