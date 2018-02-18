# CSC 519 : Test + Analysis Milestone

### Question
The Question can be found [here](https://github.com/Ananthram/Devops_NCSU/blob/master/Project/Milestone2-TestingAndAnalysis/Question.md)

### Team
| Name     |      Unity ID     |  Contribution |
|----------|:-----------------:|----------------:|
| Ananthram Eklaspuram | aeklasp| iTrust Fuzzing and Useless Test generator, documentation    |
| Kushagra Mishra |  kmishra | checkbox.io analysis,  documentation    |
| Webb Chawla |    vchawla3   |   iTrust fuzzer , documentation, screencast, post build playbooks  |
| Bhavya Bansal | bbansal | iTrust unit + integration tests, documentation    |




## File Structure


+-- postbuild_iTrust.yml  
+-- Complexity   
+-- ansible    
+--+-- checkbox.xml  
+--+-- install_jenkins.yml  
+--+-- install_python.yml     
+--+-- inventory.sample   
+--+-- itrust.xml   
+--+-- main.yml   
+-- fuzzer  
+-- UseLessTestDetector  
+-- checkbox_analysis.md       
+-- README.md       

## Environment


Host: Ubuntu 16.04 (vagrant image : ubuntu/xenial64)
Remote Jenkins: Ubuntu 16.04 (vagrant image : ubuntu/trusty64)


### Steps to provision a VM
Initialize a virtual machine. `ubuntu/trusty64` is one default image. A list of other virtual machine images can be found [here](https://atlas.hashicorp.com/boxes/search).

    vagrant init ubuntu/trusty64

Start up the virtual machine.

    vagrant up

Then    

    vagrant ssh

You should be able to connect to the machine.




## How to run:

    ansible-playbook -i inventory.sample main.yml

Note:
* The inventory should be of the format of inventory.sample.
* [nodes] is the host used in inventory. If it is changed the same is to be reflected back in the playbooks.

## Itrust Test Report

The Builds folder containing the build logs and published XMLs are in UseLessTestDetector folder.

The [UselessTestDetector Report](https://github.com/Ananthram/Devops_NCSU/blob/master/Project/Milestone2-TestingAndAnalysis/UseLessTestDetector/uselessTestsReport) is placed in the UselessTestDetector folder.

![Report](https://github.com/Ananthram/Devops_NCSU/blob/master/Project/Milestone2-TestingAndAnalysis/UseLessTestDetector/UselessTestReport.png "Report")


## Checkbox analysis Results

The checkbox analysis results can be found in [checkbox_analysis.md](https://github.com/Ananthram/Devops_NCSU/blob/master/Project/Milestone2-TestingAndAnalysis/checbox_analysis.md) file and the [analysis.js](https://github.com/Ananthram/Devops_NCSU/blob/master/Project/Milestone2-TestingAndAnalysis/Complexity/analysis.js) is present
in Complexity folder.

## Screencast
   [Milestone 2](https://youtu.be/JgXBYXU9A84)

## Useless Test Detector Graph

![Report](https://github.com/Ananthram/Devops_NCSU/blob/master/Project/Milestone2-TestingAndAnalysis/useless_graph.png "Useless Test Cases")

**X Axis**: Build Number

**Y Axis**: Number of Useless Cases

## Issues faced
  1. MySQL connection pool exceptions were faced because of few connects to Database server were allowed, we fixed that by editing the MySql conf (my.cnf) to increase max_connection allowed and mysql_connection_timeout.
  2. In CheckBox.io analysis, to implement long message chains we had to use DFS to parse the Esprima tree and return the results per line.
  3. Parsing the Jenkins build log files to implement UselessTest Detector was cumbersome, so we used a Jenkins Junit plugin which reads through the logs and publishes a XML report and then used that XML report to calculate the useless tests.
  4. When reverting the Fuzzer branch back to HEAD/MASTER, we faced issues using git reset, because then the fuzzing branch would be one commit behind. So instead we utilized stashing to simply replace the fuzzed files in the fuzzer branch.
