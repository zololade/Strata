//Captial "I" > "Incoming"
class Task {
  id: string;
  title: string;
  overview: string;
  flag: string[] | null;
  items: Set<string>;

  constructor(
    Ititle: string,
    Ioverview: string,
    Iflag: string[] | null,
    itemesData: string[],
    Iid: string = crypto.randomUUID(),
  ) {
    this.id = Iid;
    this.title = Ititle;
    this.overview = Ioverview;
    this.flag = Iflag;
    this.items = new Set(itemesData);
  }
}

export { Task };
