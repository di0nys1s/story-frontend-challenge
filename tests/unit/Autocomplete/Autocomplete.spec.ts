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
});
