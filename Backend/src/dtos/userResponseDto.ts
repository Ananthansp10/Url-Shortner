export interface IUserData {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
}

export interface IUserResponseDto {
  userData: IUserData;
  accessToken: string;
  refreshToken: string;
}
