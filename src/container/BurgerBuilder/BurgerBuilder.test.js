import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BugerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });
let wrapper = null;
beforeEach(() => {
  wrapper = shallow(<BugerBuilder onSetIngredients={() => {}} />);
});

describe("Test for Burger Builder", () => {
  it("For build Controls ", () => {
    wrapper.setProps({ ingredients: { meat: 1 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
