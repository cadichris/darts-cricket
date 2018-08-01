/* eslint-disable global-require */

import { AppRegistry } from "react-native";
import { getStorybookUI, configure } from "@storybook/react-native";

// import stories
configure(() => {
  require("../src/Cricket/TableauDesScores/stories/TableauDesScores.stories");
}, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });
AppRegistry.registerComponent("alkeyacricket", () => StorybookUI);
export default StorybookUI;