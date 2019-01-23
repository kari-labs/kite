import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCube,
  faSignOutAlt,
  faFile,
  faCog,
  faFolder,
  faExternalLinkAlt,
  faTrash,
  faCircle
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCube,
  faSignOutAlt,
  faFile,
  faCog,
  faFolder,
  faExternalLinkAlt,
  faTrash,
  faCircle
);

Vue.component("fa-icon", FontAwesomeIcon);
