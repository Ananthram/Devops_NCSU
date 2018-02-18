MILESTONE: TEST+ANALYSIS
------------------------

You will continue to work with checkbox.io and iTrust.

Testing Component
Extend the build definitions for iTrust to include the ability to run its test suite, measure coverage, and report the results.

You now need to have jenkins have tomcat + mysql in order to properly run the unit + integration tests.

Automated Commit Generation - Commit Fuzzer
Develop a tool that automatically commits new random changes to source code which will trigger a build and run of the test suite.

Support the following fuzzing operations:

change content of "strings" in code.
swap "<" with ">"
swap "==" with "!="
swap 0 with 1
any operation you can think of.
To support the commit fuzzer, create a new branch for iTrust, called fuzzer. Create a corresponding jenkins job which enables you to run the test suite against this branch. Finally, you will need to handle rollback (reverting the commit/reseting to head in git) after submitting to jenkins. Create a ansible playbook that can help you run the fuzzer.

Using your automated commit fuzzer, generate 100 random commits (that still compile) and test runs. Warning, in order to do this you must have a working fuzzer well ahead of the deadline.

Useless test detector
Write a "useless" test detector that will analyze the results of the 100 commit fuzzer runs and test cases. A useless test is one that never fails in after all fuzzed commits. You can extend the workshop we used for analyzing test case results. Generate a report that displays tests cases that always pass.

To get full credit for test detector+fuzzer, you must detect at least 100 useless tests.

Analysis Component
Using esprima's ast parser and visitor pattern, create an analysis tool that runs on checkbox.io's server-side code (not front-end) and implements the following detections. Using regex will result in 0 credit.

Long method: Detect any long methods (greater than 120 lines of code).
Sync calls: Detect any function that has more than one *Sync method call: e.g. readFileSync.
Message chains: Detect message chains with length greater than 3 in a function. For example, consider this statement as having message chain of length 4: foo.hello.get(call.size).length.
The Big O. Detect any method with a big O greater than 3.
Provide a report of the detected items in a seperate markdown file in your project submission.

Finally, ensure to fail the build if any of these results occur.
