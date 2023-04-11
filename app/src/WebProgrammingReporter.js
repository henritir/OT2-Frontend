var fs = require("fs");

class WebProgrammingReporter {
  /**
   * constructor for the reporter
   *
   * @param {Object} globalConfig - Jest configuration object
   * @param {Object} options - Options object defined in jest config
   */
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  /**
   * Hook to process the test run before running the tests, the only real data
   * available at this time is the number of test suites about to be executed
   *
   * @param {JestTestRunResult} - Results for the test run, but only `numTotalTestSuites` is of use
   * @param {JestRunConfig} - Run configuration
   */
  onRunStart(runResults, runConfig) {
    //console.log(`onRunStart arguments: ${JSON.stringify(arguments)}`);
    //console.log("Total count of tests:", runResults.numTotalTestSuites);
  }

  /**
   * Hook to process the test run results after a test suite has been executed
   * This will be called many times during the test run
   *
   * @param {JestTestSuiteRunConfig} testRunConfig - Context information about the test run
   * @param {JestTestSuiteResult} testResults - Results for the test suite just executed
   * @param {JestTestRunResult} - Results for the test run at the point in time of the test suite being executed
   */
  onTestResult(testRunConfig, testResults, runResults) {
    
    var numTotal = testResults.testResults.length;
    console.log("\n");
    console.log("TESTIN TULOKSET:");
    //console.log("Tests passed: %d/%d and failed %d/%d", testResults.numPassingTests, numTotal, (numTotal-testResults.numPassingTests), numTotal);

    var r = this.groupBy(testResults.testResults, "ancestorTitles");
    //console.log(r);
    //console.log(r.fields);

    //for(var i=0; i < r.length; i++)
    let totalPoints = 0;
    for(var testCase in r)
    {
      //var testCase = r[i];
      //console.log(testCase);
      //console.log(r[testCase]);
      let passed = 0, failed = 0;        
      let testSuiteName = "";
      for(var t=0; t < r[testCase].length; t++)
      {        
        var testRun = r[testCase][t];
        testSuiteName = r[testCase][t]['ancestorTitles'][0];
        if ( testRun.status == "passed"){
          console.log('\x1b[32m', "Tulos: " + testRun.title + "/" + testRun.status, '\x1b[0m');
          passed++;
        }
        else {
          console.log('\x1b[31m', "Tulos: " + testRun.title + "/" + testRun.status, '\x1b[0m');  
          failed++;
        }
      }

      let total = passed + failed;
      let tulos = passed / total;
      let pisteet = tulos >= 0.5 ? 1 : 0;
      totalPoints += pisteet;
      console.log(`${testSuiteName}: passed/failed: ${passed}/${failed} tulos: ${tulos.toFixed(1)} -> pisteet: ${pisteet}`);
    }
    console.log('\x1b[0m')
    var txt = `KOKONAISPISTEET: ${totalPoints}`;
    console.log(txt);

    fs.writeFileSync('result.txt', txt);

    //console.log("onTestResult", runResults);
  }

  /**
   * Hook to process the test run results after all the test suites have been
   * executed
   *
   * @param {string} test - The Test last run
   * @param {JestTestRunResult} - Results from the test run
   */
  onRunComplete(test, runResults) {
    //console.log(`onRunComplete arguments: ${JSON.stringify(arguments)}`);
    //console.log("onRunComplete");
    //console.log(runResults);
    //console.log("numFailedTests", runResults.numFailedTests);
    //console.log("numPassedTests", runResults.numPassedTests);
    //console.log("numTotalTests", runResults.numTotalTests);
  }

  onTestCaseResult(test,testCaseResult)
  {
    console.log("onTestCaseResult:", test);
    console.log("onTestCaseResult:", testCaseResult);
  }
  
  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  getLastError() {
    if (this._shouldFail) {
      return new Error('my-custom-reporter.js reported an error');
    }
  }
}

module.exports = WebProgrammingReporter;
