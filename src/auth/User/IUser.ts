interface IUser extends Document {
    username: string;
    email: string;
    password: string,
    refreshToken?: string;

    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): Promise<string>;
}