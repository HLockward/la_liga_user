import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUsers, saveUser } from "../../redux/actions/userActions";
import PropTypes from "prop-types";
import UserForm from "./UserForm";
import { newUser } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageUserPage({
  users,
  loadUsers,
  saveUser,
  history,
  ...props
}) {
  const [user, setUser] = useState({ ...props.user });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      loadUsers().catch(error => {
        alert("Loading users failed" + error);
      });
    } else {
      setUser({ ...props.user });
    }
  }, [props.user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  function formIsValid() {
    const { first_name, last_name, email } = user;
    const errors = {};

    if (!first_name) errors.first_name = "first_name is required.";
    if (!last_name) errors.last_name = "last_name is required";
    if (!email) errors.email = "email is required.";
    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveUser(user)
      .then(() => {
        toast.success("User saved.");
        history.push("/users");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return users.length === 0 ? (
    <Spinner />
  ) : (
    <UserForm
      user={user}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageUserPage.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  loadUsers: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getUserBySlug(users, id) {
  console.log(users);
  return users.find(user => user.id == id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const user =
    id && state.users.length > 0
      ? getUserBySlug(state.users, id)
      : newUser;   
  return {
    user,
    users: state.users,
  };
}

const mapDispatchToProps = {
  loadUsers,
  saveUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUserPage);
