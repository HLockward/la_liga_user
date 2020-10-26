import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const UserForm = ({
  user,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{user.id ? "Edit" : "Add"} User</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="first_name"
        label="First Name"
        value={user.first_name}
        onChange={onChange}
        error={errors.first_name}
      />

      <TextInput
        name="last_name"
        label="Last Name"
        value={user.last_name}
        onChange={onChange}
        error={errors.last_name}
      />

      <TextInput
        name="email"
        label="Email"
        value={user.email}
        onChange={onChange}
        error={errors.email}
      />

      <TextInput
        name="avatar"
        label="Avatar"
        value={user.avatar}
        onChange={onChange}
        error={errors.avatar}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default UserForm;
