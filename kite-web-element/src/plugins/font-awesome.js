import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSignOutAlt,
  faFile,
  faCog,
  faFolder,
  faExternalLinkAlt,
  faTrash,
  faCircle,
  faBars,
  faDotCircle
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faSignOutAlt,
  faFile,
  faCog,
  faFolder,
  faExternalLinkAlt,
  faTrash,
  faCircle,
  faBars,
  faDotCircle
);

Vue.component("fa-icon", FontAwesomeIcon);
