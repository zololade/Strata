//Captial "I" > "Incoming"
class Item {
  id: string;
  content: string;
  note: string;
  flag: null | string[];

  constructor(
    Icontent: string,
    Inote: string,
    Iflag: string[] | null,
    Iid: string = crypto.randomUUID(),
  ) {
    this.id = Iid;
    this.note = Inote;
    this.content = Icontent;
    this.flag = Iflag;
  }
}

export { Item };
