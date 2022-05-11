export interface sessionType {
    user?:    User;
    expires?: Date;
}

export interface User {
    name?:         string | undefined;
    email?:        string | undefined;
    image?:        string | undefined;
    accessToken?:  string | undefined;
    refreshToken?: string | undefined;
    username?:     string | undefined;
}
