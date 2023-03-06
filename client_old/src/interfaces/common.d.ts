export interface CustomButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface ProfileProps {
  id: string;
  type: string;
  name: string;
  avatar: string;
  email: string;
  posts: Array | undefined;
  skills: string[];
  location: string;
  occupation: string;
  description: string;
}

export interface PostProps {
  _id: string;
  title: string;
  description: string;
  location: string;
  keywords: Array;
  photo: string;
  creator: string;
  postType: string;
}

export interface FormProps {
  type: string;
  register: any;
  onFinish: (
    values: FieldValues
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
  formLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleImageChange: (file) => void;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  postImage: { name: string; url: string };
}

export interface ProfileFormProps {
  register: any;
  onFinish: (
    values: FieldValues
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
  formLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleImageChange: (file) => void;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
}
