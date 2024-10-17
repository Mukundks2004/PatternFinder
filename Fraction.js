export class Fraction {
  //Totally trusting we dont abuse this to make 1/0 haha
  constructor(num, denom) {
    this.num = num;
    this.denom = denom;
    if (num === 0) {
      this.denom = 1;
    }
    else {
      this.balance();
    }
  }

  plus(a) {
    return new Fraction(this.num * a.denom + a.num * this.denom, this.denom * a.denom);
  }

  minus(a) {
    return new Fraction(this.num * a.denom - a.num * this.denom, this.denom * a.denom);
  }

  times(a) {
    return new Fraction(this.num * a.num, this.denom * a.denom);
  }

  dividedby(a) {
    return new Fraction(this.num * a.denom, this.denom * a.num);
  }

  reciprocal() {
    return new Fraction(this.denom, this.num);
  }

  isZero() {
    return this.num === 0;
  }

  balance() {
    if (this.isZero()) {
      this.denom = 1;
      return;
    }

    //shorten
    if (this.denom < 0) {
      this.num *= -1;
      this.denom *= -1;
    }

    let gcd = getGCD(Math.abs(this.num), this.denom);
    this.num /= gcd;
    this.denom /= gcd;
  }

  isEqual(other) {
    return this.num === other.num && this.denom === other.denom;
  }
}

function getGCD(a, b) {
  while (a !== 0 && b !== 0) {
    if (a > b) {
      a %= b;
    }
    else {
      b %= a;
    }
  }
  return a || b;
}