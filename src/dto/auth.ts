export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roles?: string[];
  avatarFile?: File;
}
