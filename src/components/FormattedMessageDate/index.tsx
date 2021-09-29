import { FC } from "react";
import { FormattedDate, FormattedTime } from "react-intl";

export interface Props {
  date: Date;
}

export const FormattedMessageDate: FC<Props> = ({ date }) => (
  <time data-testid="message-date" dateTime={date.toLocaleString()}>
    <FormattedDate value={date} weekday="short" />
    &nbsp;
    <FormattedDate
      value={date}
      day="numeric"
      month="long"
      year="numeric"
    /> at <FormattedTime value={date} timeZoneName="short" />
  </time>
);
