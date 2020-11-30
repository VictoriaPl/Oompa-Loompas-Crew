import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Header from "../../src/components/Header";
import { Link } from "react-router-dom";
import { HEADER_LOGO } from "../../src/constants";

Enzyme.configure({ adapter: new Adapter() });

describe("Header", () => {
  const wrapper = shallow(<Header />);

  it("displays a header with the right logo", () => {
    expect(wrapper.find("img").props().src).toBe(HEADER_LOGO);
  });
  it("redirects the user to home when clicking on the header icon", () => {
    const homeLink = wrapper.find(Link);
    expect(homeLink.props().to).toEqual("/");
  });
  it("contains the right title", () => {
    expect(wrapper.find("h3").text()).toBe("Oompa Loompa's Crew");
  });
});
