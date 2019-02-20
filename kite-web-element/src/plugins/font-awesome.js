import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as icons from "@fortawesome/free-solid-svg-icons";
import kiteIcons from "./icons.json";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

for( let i of kiteIcons){
  library.add( icons[i.name] );
}

Vue.component("fa-icon", FontAwesomeIcon);
