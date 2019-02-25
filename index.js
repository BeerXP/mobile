import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

// Import para evitar o erro
import "core-js/es6/map";
import "core-js/es6/symbol";
import "core-js/fn/symbol/iterator";
// Import para evitar o erro

AppRegistry.registerComponent(appName, () => App);
