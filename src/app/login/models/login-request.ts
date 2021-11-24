export class LoginRequest{
    username: string;
    password: string;
    authType: string;
    client_id: string;
    grant_type: string;
    team: string;
    client_secret: string;
    constructor(username: string, password: string, teamId: string){
        this.username = username;
        this.password = password;
        this.client_id = 'mobile_api_client';
        this.client_secret="password"
        if(teamId == 'SuperAdmin'){
          this.authType = 'ldap';
        }
        else{
          this.authType = 'employee';
          this.team = teamId;
        }

        this.grant_type = 'password';
        // this.teamName = teamName;
    }
}
