export class Stack {
    constructor() {
        this.data = [];
    }
}
// DATA
Stack.prototype.data = function () {
    return this.data;
};
// PUSH
Stack.prototype.push = function (value) {
    this.data.push(value);
};
// POP
Stack.prototype.pop = function () {
    if (!this.isEmpty()) {
        return this.data.pop();
    } else {
        return null;
    }
};
// PEEK
Stack.prototype.peek = function () {
    if (!this.isEmpty()) {
        return this.data[this.size() - 1];
    } else {
        return null;
    }
};
// SIZE
Stack.prototype.size = function () {
    return this.data.length;
};
// EMPTY
Stack.prototype.isEmpty = function () {
    return this.size() <= 0;
};
// SEARCH
Stack.prototype.has = function (value) {
    return this.data.includes(value);
};
// CLONE
Stack.prototype.clone = function () {
    return [].concat(this.data);
};
// CLEARn
Stack.prototype.clear = function () {
    this.data = [];
};