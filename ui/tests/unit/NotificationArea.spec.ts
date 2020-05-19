import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

import { shallowMount } from "@vue/test-utils";
import NotificationArea from "@/components/NotificationArea.vue";
import Playground from "@/components/Playground.vue";

describe("NotificationArea", () => {
  const info = {
    type: "info",
    message: "Info test message.",
    visible: true,
    order: 1
  }

  const alert = {
    type: "alert",
    message: "Alert test message.",
    visible: true,
    order: 2
  }

  const factory = (notifications?: Array<{type: string; message: string; visible: boolean}>) => {
    return shallowMount(NotificationArea, {propsData: {notifications}})
  }

  it("should render no notifications by default.", () => {
    const wrapper = factory();
    expect(wrapper.text()).toBe("");
  });

  it("should render one notification when set to visible.", () => {
    const wrapper = factory([info]);
    expect(wrapper.text()).toBe(info.message);
  });

  it("should not render a notification that is not visible.", () => {
    const wrapper = factory([{...info, ...{visible: false}}]);
    expect(wrapper.text()).toBe("");
  });

  it("should render two notifications.", () => {
    const notifications = [info, alert];
    const wrapper = factory(notifications);
    expect(wrapper.findAll("v-alert-stub").length).toBe(2);
  });

  it("should render only visible notifications.", () => {
    const notifications = [{...info, ...{visible: false}}, alert];
    const wrapper = factory(notifications);
    expect(wrapper.findAll("v-alert-stub").length).toBe(1);
    expect(wrapper.text()).toBe(alert.message);
  });

  it("should re-render when a notification is added.", () => {
    const notifications = [info];
    const wrapper = factory(notifications);
    expect(wrapper.text()).toBe(info.message);
    // wrapper.props().notifications.push(alert)
    notifications.push(alert);
    const props = {propsData: {notifications}}
    wrapper.setProps(props);
    expect(wrapper.findAll("v-alert-stub").length).toBe(2);
  });

  it("should work", () => {
    const numbers = [1,2,3];
    const wrapper = shallowMount(Playground, {propsData: {numbers}});
    numbers.push(4,5,6);
    // wrapper.setProps({numbers: [0,9,8,7]});
    expect(wrapper.findAll("span").length).toBe(6);
  })

});
