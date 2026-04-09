"use client";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UploadForm } from "./upload-form";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const push = jest.fn();
const refresh = jest.fn();
const mockUseRouter = jest.mocked(useRouter);

describe("UploadForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push,
      refresh,
    } as ReturnType<typeof useRouter>);
    global.fetch = jest.fn();
  });

  it("shows a validation message when submitting without a file", async () => {
    const user = userEvent.setup();

    render(<UploadForm />);

    await user.click(screen.getByRole("button", { name: "Upload" }));

    expect(screen.getByText("Please select a PDF.")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("uploads the selected file and navigates to the document page", async () => {
    const user = userEvent.setup();
    const file = new File(["pdf-content"], "guide.pdf", {
      type: "application/pdf",
    });

    jest.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        document_id: "doc-9",
        filename: "guide.pdf",
        status: "processed",
      }),
    } as Response);

    render(<UploadForm />);

    const input = screen.getByRole("button", { name: "Upload" }).form?.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement | null;

    expect(input).not.toBeNull();

    await user.upload(input!, file);
    expect(screen.getByText("Ready to upload: guide.pdf")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Upload" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/documents/upload", {
        method: "POST",
        body: expect.any(FormData),
      });
    });

    expect(push).toHaveBeenCalledWith("/documents/doc-9");
    expect(refresh).toHaveBeenCalled();
  });

  it("shows an error when the upload response is invalid", async () => {
    const user = userEvent.setup();
    const file = new File(["pdf-content"], "guide.pdf", {
      type: "application/pdf",
    });

    jest.mocked(global.fetch).mockResolvedValue({
      ok: false,
      json: async () => ({
        message: "Backend failed",
      }),
    } as Response);

    render(<UploadForm />);

    const input = screen.getByRole("button", { name: "Upload" }).form?.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement | null;

    expect(input).not.toBeNull();

    await user.upload(input!, file);
    await user.click(screen.getByRole("button", { name: "Upload" }));

    expect(await screen.findByText("Upload failed.")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
    expect(refresh).not.toHaveBeenCalled();
  });
});
