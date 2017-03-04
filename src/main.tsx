import * as React from "react";
import * as ReactDom from "react-dom";

import { MainControllerView } from "./components/MainControllerView";

let main = document.getElementById("main");
ReactDom.render(<MainControllerView />, main);