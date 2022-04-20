// class Calculator {
//     add(a, b) {
//         return a + b;
//     }

//     multiply(a, b) {
//         return a * b;
//     }

//     divide(a, b) {
//         return a / b;
//     }
// }

// we use module.exports when we want to export one single value, in this case the calculator class
module.exports = class {
    add(a, b) {
        return a + b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }
}