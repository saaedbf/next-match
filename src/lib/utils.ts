import { differenceInYears } from "date-fns";
export function calcualateAge(dob: Date) {
  return differenceInYears(new Date(), dob);
}
