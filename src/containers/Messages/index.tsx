import { FC } from "react";
import { FormattedMessage } from "react-intl";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { MessageItem } from "components/MessageItem";
import { useMessages } from "hooks/messages";

import i18n from "./i18n";

export const Messages: FC<{}> = () => {
  const { loading, messages, deleteMessage, loadNextPage } = useMessages();

  return (
    <>
      <Stack spacing={2}>
        <Toolbar component={AppBar}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, padding: 2 }}
          >
            <FormattedMessage {...i18n.title} />
          </Typography>
        </Toolbar>
        <List>
          {messages.map((msg) => (
            <MessageItem
              message={msg}
              onDelete={() => deleteMessage(msg.uuid)}
              key={msg.uuid}
            />
          ))}
        </List>
        <Button variant="contained" onClick={loadNextPage} disabled={loading}>
          <FormattedMessage {...i18n.loadNextPageButtonText} />
        </Button>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
