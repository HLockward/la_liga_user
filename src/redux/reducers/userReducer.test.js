import userReducer from "./userReducer";
import * as actions from "../actions/userActions";

it("should add user when passed CREATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      title: "A"
    },
    {
      title: "B"
    }
  ];

  const newUser = {
    title: "C"
  };

  const action = actions.createUserSuccess(newUser);

  // act
  const newState = userReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("should update user when passed UPDATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];

  const user = { id: 2, title: "New Title" };
  const action = actions.updateUserSuccess(user);

  // act
  const newState = userReducer(initialState, action);
  const updatedUser = newState.find(a => a.id == user.id);
  const untouchedUser = newState.find(a => a.id == 1);

  // assert
  expect(updatedUser.title).toEqual("New Title");
  expect(untouchedUser.title).toEqual("A");
  expect(newState.length).toEqual(3);
});
