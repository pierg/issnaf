import { BaseKey } from "@pankod/refine-core";

export interface FormFieldProp {
  title: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  description: string;
  postType: string;
  location: string;
  keywords: string[];
}

export interface PostCardProps {
  id?: BaseKey | undefined;
  title: string;
  location: string;
  keywords: string[];
  photo: string;
  postType: string;
}
