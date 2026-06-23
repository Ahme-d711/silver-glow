import type { EditUserFormValues, UserFormValues } from "../../schemas/user.schema";

export function submitUserFormWithOptionalFile<T extends UserFormValues | EditUserFormValues>(
  values: T,
  selectedFile: File | undefined,
  onSubmit: (values: UserFormValues | EditUserFormValues | FormData) => void
) {
  if (selectedFile) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "picture" && value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });
    formData.append("picture", selectedFile);
    onSubmit(formData);
    return;
  }

  onSubmit(values);
}
