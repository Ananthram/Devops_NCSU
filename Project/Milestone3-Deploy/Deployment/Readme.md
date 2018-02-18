# iTrust Deployment and Rolling Updates

## Initial Setup Required

### 1. AWS API Keys
Place a file named "secret_iam.env" in the Deployment folder with your AWS Security credentials in the following format:

	export ANSIBLE_HOST_KEY_CHECKING=False
	export AWS_ACCESS_KEY_ID='AK123'
	export AWS_SECRET_ACCESS_KEY='abc123'

### 2. AWS private key for EC2 instances
Place your EC2 private key in the Deployment folder

### 3. Update the NewRelic License key in the template files in Monitoring role 
```
license_key: <Your license key here>
display_name: Database_{{ ansible_hostname }}
```


## To Run

Use the following command to run playbook to set up Build Servers:

  ansible-playbook install_jenkins.yml -u <Default user of your EC2 Ubuntu instance> --private-key=<Your EC2 Private Key> -i inventory.ini --ask-become-pass

## Note
We have set up a Github webhook that will be trigger build jobs for us when we push to our master (our Production branch)


## Screen Cast Link

[Link to Screencast](https://youtu.be/R8VpypU8uqE)
