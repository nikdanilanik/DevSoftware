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
