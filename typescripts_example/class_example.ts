class User {
  name: string;
  private email: string;

  constructor(name: string, email: string = 'default') {
    this.name = name;
    this.email = email;
  }

  getInfo() {
    return `${this.name} contact: ${this.email}`;
  }
}

class Employee extends User {
  salary: number;
  company: string;
  constructor(name: string, salary: number, company: string, email: string = "default") {
    super(name, email);
    this.salary = salary;
    this.company = company;
  }

  getContact() {
    const info = super.getInfo();
    return `${info} company: ${this.company}`;
  }
}

const myInfo = new User('jirot joe', 'my@email.com');
const myEmployee = new Employee('jirot joe', 30000, 'zercle');

console.log(myEmployee.getInfo());
console.log(myEmployee.getContact());
