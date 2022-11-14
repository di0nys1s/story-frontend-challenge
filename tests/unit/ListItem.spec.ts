import { mount } from "@vue/test-utils";
import ListItem from "@/components/ListItem/ListItem.vue";
import Tag from "@/components/Tag/Tag.vue";

describe("ListItem", () => {
  it("Display selected list item as tag when clicked", () => {
    const wrapper = mount(ListItem, {
      props: {
        item: "Amsterdam",
      },
    });

    wrapper.find("button").trigger("click");

    const wrapperTag = mount(Tag, {
      props: {
        item: "Amsterdam",
      },
    });

    expect(wrapperTag.find("li").text()).toBe("Amsterdam");
  });
});
