# Flightfox Pro

## Dev

Init procedure:

* [New Window] mongod
* npm run-script db
* [New Window] gulp watch
* [New Window] npm run-script debug

Test scripts:

* npm test

Dev setup:

* Install Node
    - Download binaries and install node.js
* Install Mongo
    - Download binaries from mongodb.org
    - tar -zxvf [dir]
    - mkdir -p /usr/local/mongodb
    - cp -R -n [dir] /usr/local/mongodb
    - vi ~/.bash_profile
    - export PATH=/usr/local/mongodb/bin:$PATH
* npm install

# Prod

* Next two lines are for MongoDB. For more info see http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

$ echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

$ sudo apt-get update
$ sudo apt-get install build-essential
$ sudo apt-get install -y mongodb-org
$ sudo curl -sL https://deb.nodesource.com/setup | sudo bash -
$ sudo apt-get install -y nodejs
$ sudo npm install --global gulp
$ sudo npm install --global naught
$ sudo apt-get install git git-core

* Configs
$ git config --global user.name "Your Name"
$ git config --global user.email "youremail@example.com"

If by running sudo the terminal throws "sudo unable to resolve host" grab the host name shown in the error
and edit /etc/hosts. Put it there like like
    127.0.1.1 ip-172-30-0-136

Where ip-172-30-0-136 is the host that can't be resolved

* If you want to kill the node process id that listens on port 3000 you can
$ sudo kill `sudo lsof -t -i:3000`

# DEPLOYMENT
cd into dist/ and run gulp, pass one of the following tasks.
    gulp [deploy_staging | deploy_production]

# UPSTART CONFIGURATION
Checkout the files in dist/upstart. Depending on the box, grab either production.conf or staging.conf and rename it to flightfox.conf
and throw it inside /etc/init/ Then do a:
$ sudo start flightfox
or
$ sudo service flightfox start

Both also accepts "stop" flag.

# NGINX CONF
