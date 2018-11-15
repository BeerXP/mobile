import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import "core-js/es6/symbol";
import "core-js/fn/symbol/iterator";

AppRegistry.registerComponent(appName, () => App);
