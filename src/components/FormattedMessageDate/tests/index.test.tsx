import { render, screen } from "@testing-library/react";

import { withIntlProvider } from "testing/utils";

import { FormattedMessageDate } from "../index";

describe("<FormattedMessageDate />", () => {
  // TODO: test different timezones by mocking or forcible setting node TZ
  [
    {
      date: new Date(4518662400000),
      expected: "Sat March 11, 2113 at 12:00 AM"
    }
  ].forEach(({ date, expected }) => {
    it(`renders expected format for date: ${date}`, () => {
      render(withIntlProvider(<FormattedMessageDate date={date} />));

      const el = screen.getByTestId("message-date");
      expect(el).toBeVisible();
      expect(el).toHaveTextContent(expected);
    });
  });
});
