const numero = 42;

Number.prototype.somar = function (n) {
  return this + n;
};

Number.prototype.subtrair = function (n) {
  return this - n;
};

Number.prototype.multiplicar = function (n) {
  return this * n;
};

Number.prototype.dividir = function (n) {
  return this / n;
};

Number.prototype.ehIgual = function (n) {
  return this === n;
};

console.log(
  numero
    .somar(27)
    .somar(3)
    .subtrair(7)
    .multiplicar(8)
    .dividir(13)
    .dividir(4)
    .ehIgual(10)
);
