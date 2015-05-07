# Chat - node.js

## Dev

### Setup

Step 1. Download and install node.js
Step 2. Download mongo from mongodb.org, then run:

```
tar -zxvf [dir]
mkdir -p /usr/local/mongodb
cp -R -n [dir] /usr/local/mongodb
vi ~/.bash_profile
export PATH=/usr/local/mongodb/bin:$PATH
```

Step 3. Install all project node modules:

```
npm install
```

### Start

```
mongod
gulp reset-db
[New Window] gulp watch
[New Window] npm run-script debug
```

### Test

`npm test`

## Prod


### Setup

* Install MongoDB (http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)

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

* Git Config

    $ git config --global user.name "Your Name"
    $ git config --global user.email "youremail@example.com"

If by running sudo the terminal throws "sudo unable to resolve host" grab the host name shown in the error and edit /etc/hosts. Put it there like this:

    127.0.1.1 ip-172-30-0-136

Where ip-172-30-0-136 is the host that can't be resolved

* If you want to kill the node process id that listens on port 3000 you can

    $ sudo kill `sudo lsof -t -i:3000`

* Copy the nginx configs from dist/*
* For the first time setup, make sure to run

    $ gulp deploy

* Since naught hasn't been started yet we need to create a symlink for bin/www so naught can execute it outside the project code dir.

    $ ln -s /var/www/chat-nodejs/releases/LATEST_RELEASE_DIR/bin/www /var/www/chat-nodejs/www

* cd into chat-nodejs working dir:

    $ cd /var/www/chat-nodejs

* Then start naught:

    $ sudo NODE_ENV=prod naught start --cwd ./releases/LATEST_RELEASE_DIR/bin/ www

* Replace LATEST_RELEASE_DIR for the name of the dir with the latest release. For further deployments, gulp deploy command will take care of updating naught for the latest code.
