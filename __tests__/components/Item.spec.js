import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Link } from "react-router-dom";
import Item from "../../src/components/Item";
import ItemBasicInfo from "../../src/components/ItemBasicInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("Item", () => {
  const props = {
    item: {
      id: "3",
      image: "testItem.png",
      name: "Martie",
      gender: "F",
      profession: "DevOps",
    },
  };
  const wrapper = shallow(<Item {...props} />);

  it("displays the item image", () => {
    expect(wrapper.find("img").props().src).toBe(props.item.image);
  });
  it("redirects the user to the item detail when clicking on the item element", () => {
    const homeLink = wrapper.find(Link);
    expect(homeLink.props().to).toEqual(`/${props.item.id}`);
  });
  it("contains ItemBasicInfo component sending the right props", () => {
    const basicInfoComponent = wrapper.find(ItemBasicInfo);
    expect(basicInfoComponent.prop("name")).toBe(props.item.name);
    expect(basicInfoComponent.prop("gender")).toBe(props.item.gender);
    expect(basicInfoComponent.prop("profession")).toBe(
      props.item.profession
    );
  });
});
