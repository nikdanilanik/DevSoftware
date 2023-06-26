import { Group } from "./group";

export class Student {
  constructor() {
    this.id = null;
    this.fio = "";
    this.group = new Group();
    this.phoneNumber = "";
  }

  id: number | null;
  fio: string;
  group: Group;
  phoneNumber: string;
}

export class DeleteStudent {
  constructor() {
    this.id = null;
  }

  id: number | null;
}

export class AllDataOfStudent {
  constructor() {
    this.id = null;
    this.fio = "";
    this.group = new Group();
    this.curator = "";
    this.phoneNumber = "";
    this.phoneNumberOfParents = "";
  }

  id: number | null;
  fio: string;
  group: Group;
  curator: string;
  phoneNumber: string;
  phoneNumberOfParents: string;
}
