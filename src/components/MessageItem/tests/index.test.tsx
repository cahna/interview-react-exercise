import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Message } from "types/messages";
import { withIntlProvider } from "testing/utils";

import { MessageItem } from "../index";

describe("<MessageItem />", () => {
  it("renders MessageItem component", () => {
    const testMessage: Message = {
      uuid: "5a6a5467-2e91-4d0e-8487-bd18dfe268bd",
      sentAt: new Date(),
      senderUuid: "b7ae4b74-3527-4896-b46c-feaa30d53e81",
      content: "This is a test"
    };
    const mockOnDelete = jest.fn();

    render(
      withIntlProvider(
        <MessageItem message={testMessage} onDelete={mockOnDelete} />
      )
    );
    const dateEl = screen.getByTestId("message-date");
    expect(dateEl).toBeVisible();

    const li = screen.getByRole("listitem");
    expect(li).toBeVisible();

    const text = screen.getByRole("comment");
    expect(text).toHaveTextContent(testMessage.content);

    const deleteButton = screen.getByRole("button", { name: "delete" });
    expect(deleteButton).toBeVisible();
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it("calls onDelete when delete button is clicked", () => {
    const testMessage: Message = {
      uuid: "5a6a5467-2e91-4d0e-8487-bd18dfe268bd",
      sentAt: new Date(),
      senderUuid: "b7ae4b74-3527-4896-b46c-feaa30d53e81",
      content: "This is a test"
    };
    const mockOnDelete = jest.fn();

    render(
      withIntlProvider(
        <MessageItem message={testMessage} onDelete={mockOnDelete} />
      )
    );

    expect(mockOnDelete).not.toHaveBeenCalled();

    const deleteButton = screen.getByRole("button", { name: "delete" });
    expect(deleteButton).toBeEnabled();
    userEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
