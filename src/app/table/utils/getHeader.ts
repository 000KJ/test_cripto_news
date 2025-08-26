import { headers } from "./constnants";

export const getHeader = (key: string) => headers[key as keyof typeof headers];
