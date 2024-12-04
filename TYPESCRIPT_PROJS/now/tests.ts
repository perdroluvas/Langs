class Animal {
  name: any;

  constructor(name: any) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  created: number;
  constructor(name: string) {
    super(name);
    this.created = Date.now();
  }
}

let rabbit = new Rabbit("White Rabbit"); // ok now
alert(rabbit.name); // White Rabbit
alert(rabbit.created);

