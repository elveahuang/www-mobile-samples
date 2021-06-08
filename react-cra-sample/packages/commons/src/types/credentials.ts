export default interface Credentials {
    grant_type: 'password' | 'refresh_token';
    username?: string;
    password?: string;
    client_id: 'webapp';
    client_secret: 'webapp';
    refresh_token?: string;
}
