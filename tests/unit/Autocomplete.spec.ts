import { mount } from "@vue/test-utils";
import AutocompleteSearch from "@/components/AutocompleteSearch/AutocompleteSearch.vue";

describe("Autocomplete", () => {
  it("renders input when data passed", async () => {
    const wrapper = mount(AutocompleteSearch, {
      props: {
        searchCategory: "cities",
      },
    });

    await wrapper.setData({ searchFilter: "sa" });

    const textInput = wrapper.find("input");
    const value = textInput.element.value;
    expect(value).toBe("sa");
  });

  it("renders an error if length is less than 3", async () => {
    const wrapper = mount(AutocompleteSearch, {
      props: {
        searchCategory: "cities",
      },
    });
    await wrapper.setData({ searchFilter: "sa" });

    const textInput = wrapper.find("span");
    const value = textInput.text();
    expect(value).toBe("You need to enter at least 3 characters");
  });

  it("renders no results message if filter length is more than 3 and without a match", async () => {
    const wrapper = mount(AutocompleteSearch, {
      props: {
        searchCategory: "cities",
      },
    });
    await wrapper.setData({ searchFilter: "san" });

    const textInput = wrapper.find("span");
    const value = textInput.text();
    expect(value).toBe("There are no results");
  });

  it("displays results list when data length is more than 3 and matched any list item", async () => {
    const wrapper = mount(AutocompleteSearch, {
      props: {
        searchCategory: "books",
      },
    });
    await wrapper.setData({ searchFilter: "don" });
    const listItem = wrapper.find('div[role="list"');

    expect(listItem.exists()).toBe(true);
  });
});
