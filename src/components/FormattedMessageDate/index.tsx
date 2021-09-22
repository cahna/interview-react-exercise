import { FC } from "react";
import { FormattedDate, FormattedTime } from "react-intl";

export interface Props {
  date: Date;
}

export const FormattedMessageDate: FC<Props> = ({ date }) => (
  <>
    <FormattedDate value={date} weekday="short" />
    &nbsp;
    <FormattedDate
      value={date}
      day="numeric"
      month="long"
      year="numeric"
    /> at <FormattedTime value={date} timeZoneName="short" />
  </>
);
