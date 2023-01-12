export interface ICreateUserTokensDTO {
  user_id: string;
  refresh_token: string;
  expire_date: Date;
}
