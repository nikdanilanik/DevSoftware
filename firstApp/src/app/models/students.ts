export class Student {
  constructor() {
    this.id = null;
    this.fio = "";
    this.group = "";
    this.phoneNumber = "";
  }

  id: number | null;
  fio: string;
  group: string;
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
    this.group = "";
    this.curator = "";
    this.phoneNumber = "";
    this.phoneNumberOfParents = "";
  }

  id: number | null;
  fio: string;
  group: string;
  curator: string;
  phoneNumber: string;
  phoneNumberOfParents: string;
}
