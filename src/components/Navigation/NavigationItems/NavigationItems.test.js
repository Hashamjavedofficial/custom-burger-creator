import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });
let wrapper = null;
beforeEach(() => {
  wrapper = shallow(<NavigationItems />);
});

describe("NavigationItems", () => {
  it("Single test for navigation is not auth", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it("Single test for navigation is not auth", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("Single test for navigation is not auth", () => {
    wrapper.setProps({ isAuth: true });
    expect(
      wrapper.contains(<NavigationItem link={"/logout"}>Logout</NavigationItem>)
    ).toEqual(true);
  });
});
