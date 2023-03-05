import { BaseKey } from "@pankod/refine-core";

export interface MemberCardProp {
  id?: BaseKey | undefined;
  name: string;
  email: string;
  avatar: string;
  location: string;
  occupation: string;
  noOfPosts: number;
}

export interface InfoBarProps {
  icon: ReactNode;
  name: string;
}
