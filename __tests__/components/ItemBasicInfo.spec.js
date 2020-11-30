import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { GENDER } from "../../src/constants";
import ItemBasicInfo from "../../src/components/ItemBasicInfo";
import Skeleton from "react-loading-skeleton";

Enzyme.configure({ adapter: new Adapter() });

describe("ItemBasicInfo", () => {
  it("displays the item data: name, gender and profession", () => {
    const props = {
      name: "Anie",
      gender: "F",
      profession: "UX Designer",
    };
    const wrapper = shallow(<ItemBasicInfo {...props} />);

    expect(wrapper.find("h3").text()).toBe(props.name);
    expect(wrapper.find("p").at(0).text()).toBe(GENDER(props.gender));
    expect(wrapper.find("p").at(1).text()).toBe(props.profession);
  });
  it("displays a loading skeleton if the information doesn't arrive", () => {
    const wrapper = shallow(<ItemBasicInfo />);
    expect(wrapper.find(Skeleton)).toHaveLength(3);
  });
});
