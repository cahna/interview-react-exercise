import { defineMessages } from "react-intl";

export const scope = "src.containers.Messages";

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: "Messages"
  },
  loadNextPageButtonText: {
    id: `${scope}.loadNextPageButtonText`,
    defaultMessage: "Load more"
  }
});
