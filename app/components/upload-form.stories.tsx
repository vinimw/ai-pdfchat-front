import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, userEvent, within } from "storybook/test";
import { UploadForm } from "./upload-form";

const meta = {
  title: "Documents/UploadForm",
  component: UploadForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Formulario de envio de PDFs. A documentacao cobre o estado inicial, validacao sem arquivo e o feedback ao selecionar um PDF.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UploadForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ValidationError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("button", {
        name: "Upload",
      })
    );

    await expect(canvas.getByText("Please select a PDF.")).toBeInTheDocument();
  },
};

export const FileSelected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Select a PDF file");
    const file = new File(["story"], "company-overview.pdf", {
      type: "application/pdf",
    });

    await userEvent.upload(input, file);

    await expect(
      canvas.getByText("Ready to upload: company-overview.pdf")
    ).toBeInTheDocument();
  },
};
