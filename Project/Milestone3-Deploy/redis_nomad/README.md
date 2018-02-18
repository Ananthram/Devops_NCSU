# Nomad & Redis Feature Flag

## To Run

To set up control server: 
	ansible-playbook playbooks/configure-control-server.yml -i inventory 

From Control Server:
	ansible-playbook playbooks/main.yml -i inventory 
	
## Nomad & Reids Notes
- First a control server is created and all relevant files are copied to the control server. 
- The main.yml configures the nomad cluster and redis master slave nodes.
- The checkbox.io code was changed to add a toggleFeature route "<host>/api/toggleFeature", which toggles the redis feature flag.

Reference:

- https://github.ncsu.edu/kpresle/techtalk
- https://github.com/CSC-DevOps/Queues
		
