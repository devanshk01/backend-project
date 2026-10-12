const add = (a, b) => {
    return a + b
}

const higherSum = (a, b) => () => {
    return add(a, b)
}
    

const higher = (fn) => (a, b) => {
    return fn(a, b)
}

console.log(higher(add)(1, 2));