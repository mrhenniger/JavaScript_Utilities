/*
Welcome to "Tests"

This a simple utility for testing other classes.
*/

let Tests = (function(ref = null) {

    let __testResults = [];

    function add(functionName, testName, passFail, actual) {
        __testResults.push([functionName, testName, passFail, actual]);
    }

    function dump() {
        console.log("Test results...");
        let passCount = 0;
        let failCount = 0;

        __testResults.forEach((aResult) => {
            let message = `${aResult[0]} - ${aResult[1]} - `;
            message += aResult[2] ? "passed" : "FAILED";
            if (!aResult[2]) {
                failCount++;
                console.error(message, aResult[2]);
            } else {
                passCount++;
                console.log(message)
            }
        });
        console.log(`Passed: ${passCount}`);
        console.log(`Failed: ${failCount}`);
    }

    return {
        add: add,
        dump: dump,
    }
});
