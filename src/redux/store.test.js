import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as userActions from "./actions/userActions";

it("Should handle creating users", function() {
  // arrange
  const store = createStore(rootReducer, initialState);
  const user = {
    title: "Clean Code"
  };

  // act
  const action = userActions.createUserSuccess(user);
  store.dispatch(action);

  // assert
  const createdUser = store.getState().users[0];
  expect(createdUser).toEqual(user);
});
