import { RegisterValues } from "@/models/registerValues";

export const getUsers = async (): Promise<RegisterValues[]> => {
  try {
    const response = await fetch(
      "https://o8tl97gvej.execute-api.us-east-1.amazonaws.com/v1/loans"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
};
