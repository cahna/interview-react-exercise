import { FC, MouseEventHandler, memo } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { FormattedMessageDate } from "components/FormattedMessageDate";
import { Message } from "types/messages";

export interface Props {
  message: Message;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

export const MessageItem: FC<Props> = memo(({ message, onDelete }) => (
  <ListItem
    secondaryAction={
      <IconButton
        edge="end"
        role="button"
        aria-label="delete"
        onClick={onDelete}
      >
        <DeleteForeverIcon />
      </IconButton>
    }
    role="listitem"
  >
    <ListItemText
      primary={message.senderUuid}
      secondary={
        <>
          <FormattedMessageDate date={message.sentAt} />
          <br />
          <Typography
            component="span"
            variant="body2"
            color="text.primary"
            role="comment" // eslint-disable-line jsx-a11y/aria-role
            data-author={message.senderUuid}
          >
            {message.content}
          </Typography>
        </>
      }
    />
  </ListItem>
));
