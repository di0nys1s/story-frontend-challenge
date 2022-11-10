import { shallowMount } from "@vue/test-utils";
import DashboardPage from "@/components/Pages/DashboardPage/index.vue";

describe("DashboardPage.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(DashboardPage, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
