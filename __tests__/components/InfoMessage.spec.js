import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { HEADER_LOGO } from "../../src/constants";
import InfoMessage from "../../src/components/InfoMessage";

Enzyme.configure({ adapter: new Adapter() });

describe("InfoMessage", () => {
  const props = {
    title: "Test title message",
    extraInfo: "Check this other text message test",
  };
  const wrapper = shallow(<InfoMessage {...props} />);

  it("displays the app logo at the start of the message", () => {
    expect(wrapper.find("img").props().src).toBe(HEADER_LOGO);
  });
  it("contains a title received from props", () => {
    expect(wrapper.find("h2").text()).toEqual(props.title);
  });
  it("contains extra info received from props", () => {
    expect(wrapper.find("p").text()).toBe(props.extraInfo);
  });
});
