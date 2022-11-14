import { mount } from "@vue/test-utils";
import ListItems from "@/components/ListItems/ListItems.vue";

describe("ListItems", () => {
  it("does not display any list item without data", () => {
    const wrapper = mount(ListItems, {
      props: {
        items: [],
      },
    });

    const listItem = wrapper.find('button[role="list-item"]');

    expect(listItem.exists()).toBe(false);
  });

  it("does display list item with data", () => {
    const wrapper = mount(ListItems, {
      props: {
        items: ["item1"],
      },
    });

    const listItem = wrapper.find('button[role="list-item"]');

    expect(listItem.exists()).toBe(true);
  });
});
