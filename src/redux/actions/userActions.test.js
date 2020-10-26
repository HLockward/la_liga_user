import * as userActions from "./userActions";
import * as types from "./actionTypes";
import { users } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Users Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading users", () => {
      fetchMock.mock("*", {
        body: users,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, users }
      ];

      const store = mockStore({ users: [] });
      return store.dispatch(userActions.loadUsers()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createUserSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    //arrange
    const user = users[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      user
    };

    //act
    const action = userActions.createUserSuccess(user);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
