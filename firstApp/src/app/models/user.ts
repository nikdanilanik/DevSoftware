export class User {
  constructor() {
    this.id = null;
    this.login = "";
    this.role = "";
    this.enabled = false;
  }

  id: number | null;
  login: string;
  role: string;
  enabled: boolean;

  User(login: string, roles: string) {

  }
}

// interface UserInter {
//   id: number | null;
//   login: string;
//   roles: string;
// }
