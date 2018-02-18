# Fuzzer Code
Note: it is critical that the fuzzer.js, package.json, and runFuzzer.yml be placed in the iTrust-v23 directory (the same level as iTrust).

## To Run

PreReqs: npm, node, and ansible must be installed

1st: Place fuzzer.js, packages.json, and runFuzzer.yml into iTrust-v23 folder (this should also be the git repo).

2nd: run 'npm install'

3rd: run 'ansible-playbook runFuzzer.yml'
