var fs = require('fs');
//var recursive = require('recursive-readdir');


var convert = require('xml2json');

var buildDir = "/var/lib/jenkins/jobs/iTrust/builds/";

var useLessDict = {};
var totalTest ={};


function processJUnit(junit_file) {

    var suite = junit_file.result.suites.suite;


    for (var i = 0, l = suite.length; i < l; i++) {

        var tcase = suite[i].cases.case;

        if (Array.isArray(tcase)) {

            for (var j = 0, m = tcase.length; j < m; j++) {

                //test case has failed
	
                if (tcase[j].failedSince != 0) {
		    console.log("In array failed test case", (tcase[j].className+'.'+tcase[j].testName))
                    delete useLessDict[(tcase[j].className+'.'+tcase[j].testName)];
                }

            }

        }

        else {

            if (tcase.failedSince != 0) {
                console.log("Not array failed test case", tcase.testName)
                delete useLessDict[(tcase.className+'.'+tcase.testName)];
            }

        }

    }


}


function run(buildNo) {


    var pathToJunitresult = buildDir + buildNo + "/junitResult.xml";

    var xml = fs.readFileSync(pathToJunitresult);

    var result1 = convert.toJson(xml, { object: true });

    if (buildNo == 1) {
        for (var i = 0, l = result1.result.suites.suite.length; i < l; i++) {

            var tcase = result1.result.suites.suite[i].cases.case;
            if (Array.isArray(tcase)) {
                for (var j = 0, m = tcase.length; j < m; j++) {
                    useLessDict[(tcase[j].className+'.'+tcase[j].testName)] = 0;
		    totalTest[(tcase[j].className+'.'+tcase[j].testName)] = 0;

                }
            }
            else {
                useLessDict[(tcase.className+'.'+tcase.testName)] = 0;
		totalTest[(tcase.className+'.'+tcase.testName)] = 0;
            }
        }

    }



    processJUnit(result1);


}


for (var buildNo = 1; buildNo <= 100; buildNo++) {

    //Processing for build with ID = buildNo
    run(buildNo);
}

console.log(" -------Useless test after 100 builds---------------");
console.log("Total Test = "+ Object.keys(totalTest).length)
var toFile = " -------Useless test after 100 builds---------------\n\n" + "No of Useless testcases  = " + Object.keys(useLessDict).length + "\n"+"Total Test = "+ Object.keys(totalTest).length + "\n" + "\n The useless tests are \n\n" ;
console.log("No of Useless testcases  = ", Object.keys(useLessDict, "\n The useless tests are \n\n").length);
 
for (var k = 0  ; k < Object.keys(useLessDict).length; k++){
console.log(Object.keys(useLessDict)[k]);
toFile = toFile + Object.keys(useLessDict)[k] + '\n' ; 
}



fs.writeFileSync('uselessTestsReport', toFile);


