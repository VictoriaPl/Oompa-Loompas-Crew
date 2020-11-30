import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { SEARCH_ICON } from "../../src/constants";
import SearchBar from "../../src/components/SearchBar";

Enzyme.configure({ adapter: new Adapter() });

describe("SearchBar", () => {
  const props = {
    handleChange: jest.fn(),
  };
  const wrapper = shallow(<SearchBar {...props} />);

  it("contains an input that calls handleCange on change", () => {
    const searchInput = wrapper.find("input");
    expect(searchInput.props().placeholder).toEqual("Search");
    expect(searchInput.props().type).toEqual("text");

    searchInput.simulate("change", { target: { value: "Triz" } });
    expect(props.handleChange).toHaveBeenCalledWith("Triz");
  });
  it("displays the search icon on the search bar", () => {
    expect(wrapper.find("img").props().src).toBe(SEARCH_ICON);
  });
});
