/*
Welcome to "Promises"

*** THIS FILE IS UNDER CONSTRUCTION, IT HAS NO TEST FILE YET ***

This is simply a collection of promise utilities which I have found useful.  I am wrote this class in the form
of a set of stand-alone static functions and in class form which make use of the static functions and provides for
changing.

I would appreciate any feedback you may have.
*/





let Promises = function (param=null) {
    // Check for a native promise in the parameter
    if (param !== null && typeof param === 'object' && param?.constructor?.name === 'Promise') {
        this.__thePromise = param;
        return this;
    }

    // If we are given an array of promises that follow the all path
    if (typeof param === 'object' && param?.length) {
        this.allSettled(param);
        return this;
    }

    // If here then we have a standard promise
    this.__acceptIt = null;
    this.__rejectIt = null;
    this.__thePromise = new Promise(function(resolve, reject) {
        this.__acceptIt = resolve;
        this.__rejectIt = reject;
    }.bind(this));
    return this;
};

Promises.prototype.accept = function(payload) {
    this.__acceptIt(payload);
}

Promises.prototype.reject = function(payload) {
    this.__rejectIt(payload);
}

Promises.prototype.then = function(func) {
    return this.__thePromise.then(func);
}

Promises.prototype.allSettled = function(promiseArr) {
    let basePromises = [];
    promiseArr.forEach(aPromises => {
        basePromises.push(aPromises.__thePromise);
    });
    this.__thePromise = Promise.allSettled(basePromises);
}
