class Num {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  say() {
  }
}
console.log(Num.constructor)
let a = new Num(11,22)


function Word(words) {
  this.words = words;
}

Word.prototype = {
  alert() {
    console.log(this.words)
  }
}

var w = new Word('hello word')
w.print = function () {
  console.log(this.words)
  console.log(this)
  console.log(w.__proto__)
}

Function.prototype.a = 'abc'
Object.prototype.a = 'cba'

function Aas() {}
console.log(Aas.a)
let aas = new Aas()
console.log(aas.__proto__.__proto__)
console.log(aas.__proto__.constructor)
