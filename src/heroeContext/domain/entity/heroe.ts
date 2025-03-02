export class Hero {
  public id: number;
  public name: string;
  public thumbnail: { extension: string; path: string };
  constructor({
    id,
    name,
    thumbnail,
  }: {
    id: number;
    name: string;
    thumbnail: {
      extension: string;
      path: string;
    };
  }) {
    this.id = id;
    this.name = name;
    this.thumbnail = thumbnail;
  }
}
