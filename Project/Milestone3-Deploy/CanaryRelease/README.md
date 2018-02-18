# Canary Release

## PreTasks
- An empty droplet to configure jenkins on
- The IP address for that droplet set in the inventory/jenkinsInventory
- Same IP address set for Jenkins (Git plugin) service in the checkbox.io repository being deployed (formatted like http://{{Jenkins IP}}:8080/) - this is will hit '/git/nofitfyCommit/' to jenkins on a push and trigger jobs set to poll/pull the branch that was updated (set up by ansible).
- Environment variable DOTOKEN set to user's digital ocean token on ansible host machine.

## To Run
	ansible-playbook main.yml -i inventory/jenkinsInventory
	
## Checkbox Deployment (Stable/Canary) Notes
- Once a push to our master branch for checkbox occurs, the stable job will run and delete the current droplet of checkbox (if exists), get a new droplet, and then configure it.
	- On the same job, if the loadbalancer is also running, the loadbalancer will also be redeployed so it will then route to the new stable droplet.
	- If the loadbalancer/canary has not yet been deployed, then only the stable will be redeployed.
- Once a push to our canary branch for checkbox occurs, the canary job will run and delete the canary/loadbalancer droplets (if they exist), get new droplets, and redeploy both.
- The load balancer/proxy (infrastructure.js) routes 60% of the traffic to the stable, and 40% of the traffic to the canary.
	- The load balancer/proxy does a request every 3 seconds to get the status of the canary instance. If the canary returns a status of 503, then the proxy will no longer route any traffic to canary.
	- The load balancer/proxy will continue to check the status until it returns 200, then it will start rerouting 40% of the traffic again to the canary.
- The canary instance will return a status of 503 if the CPU Usage on that machine goes over 15% (easily configurable to be higher, but set at 15 for demo purposes).
	- For demo purposes, I initially had ansible install the tool 'stress' onto the canary machine. I then ssh onto the canary instance and run..
		> stress --cpu 30 --timeout 60
	- This forces CPU usage to get high and trigger the alert to the load balancer/proxy which then stops routing traffic to it.
		
