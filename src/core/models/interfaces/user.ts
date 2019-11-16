export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserInfoUpdate {
    avatar?: File;
    password?: string;
    firstName?: string;
    lastName?: string;
}

export interface IResetPassword {
    email: string;
}

export interface IUpdatePassword {
    resetPasswordToken: string;
    password: string;
}