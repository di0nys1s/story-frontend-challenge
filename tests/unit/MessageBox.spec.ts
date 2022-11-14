import { mount } from "@vue/test-utils";
import MessageBox from "@/components/MessageBox/MessageBox.vue";

describe("MessageBox", () => {
  it("renders message when text passed", () => {
    const wrapper = mount(MessageBox, {
      props: {
        message: "This is a message",
      },
    });

    const textMessage = wrapper.find("span");
    expect(textMessage.text()).toBe("This is a message");
  });
});
