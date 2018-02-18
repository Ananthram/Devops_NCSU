# CSC 519 : Deploy Milestone


### Team
| Name     |      Unity ID     |  Contribution |
|----------|:-----------------:|----------------:|
| Kushagra Mishra |  kmishra | nomad,  redis, documentation    |
| Ananthram Eklaspuram | aeklasp| iTrust Deploy, AWS setup, rolling update, documentation   |
| Webb Chawla |    vchawla3   |   canary , checkbox, proxy, documentation |
| Bhavya Bansal | bbansal | jenkin, droplet setup    |



## File Structure

```
.
├── CanaryRelease
│   ├── ansibleSetupOnJenkins.yml
│   ├── checkboxCanary
│   │   ├── canarySetup.yml
│   │   ├── checkboxCanary.xml
│   │   ├── createCanary.yml
│   │   └── post-receive
│   ├── checkboxStable
│   │   ├── checkboxStable.xml
│   │   ├── createStable
│   │   ├── createStable.yml
│   │   └── stableSetup.yml
│   ├── install_jenkins.yml
│   ├── inventory
│   │   ├── canaryInventory
│   │   ├── jenkinsInventory
│   │   ├── loadBalancerInventory
│   │   └── stableInventory
│   ├── loadbalancer
│   │   ├── createLoadBalancer.yml
│   │   ├── infrastructure.js
│   │   ├── loadBalancerSetup.yml
│   │   ├── package.json
│   │   └── package-lock.json
│   ├── main.yml
|   ├──node_modules
│   ├── README.md
│   └── setupSSHJenkins.yml
├── Deployment
│   ├── aws_ec2.yml
│   ├── deploy_iTrust
│   │   └── tasks
│   │       └── main.yml
│   ├── haproxy
│   │   ├── files
│   │   │   └── haproxy_default
│   │   ├── handlers
│   │   │   └── main.yml
│   │   ├── tasks
│   │   │   └── main.yml
│   │   ├── templates
│   │   │   └── haproxy.cfg.j2
│   │   └── vars
│   │       └── main.yml
│   ├── install_jenkins.yml
│   ├── inventory.ini
│   ├── iTrustVars.yml
│   ├── iTrust.xml
│   ├── MyEC2KeyPair.pem
│   ├── mysql
│   │   ├── tasks
│   │   │   └── main.yml
│   │   ├── templates
│   │   │   └── my.cnf.j2
│   │   └── vars
│   │       └── main.yml
│   ├── python
│   │   └── tasks
│   │       └── python_pretask.yml
│   ├── Readme.md
│   └── secret_iam.env
├── README.md
├── redis_nomad
│   ├── ansible.cfg
│   ├── inventory.sample
│   ├── playbooks
│   │   ├── bootstrap-cluster.yml
│   │   ├── configure-control-server.yml
│   │   ├── configure_redis.yml
│   │   ├── install-nomad.yml
│   │   ├── main.yml
│   │   ├── requirements.yml
│   │   ├── stableSetup.yml
│   │   ├── templates
│   │   │   ├── checbox.nomad
│   │   │   ├── checkbox.nomad
│   │   │   ├── redis_master.conf
│   │   │   ├── redis_slave.conf
│   │   │   └── service.nomad
│   │   ├── test.yaml
│   │   └── vars.yml
│   └── README.md
└── temp.txt

156 directories, 627 files


```


## Screencasts

Checkbox Production Deployment/Canary Release/Proxy/Alerts [SCREENCAST HERE](https://youtu.be/LeLG2DdaVX4) & [IMPLEMENTATION DETAILS HERE](https://github.com/Ananthram/Devops_NCSU/blob/master/Project/Milestone3-Deploy/CanaryRelease/README.md)

Nomad & Redis [ScreenCast](https://youtu.be/yNJcn4j7Z9E)


iTrust Deployment and Rolling Update [ScreenCast](https://youtu.be/R8VpypU8uqE)
