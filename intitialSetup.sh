#!/bin/bash

echo "Installing Geany - a lightweight IDE..."
sudo apt-get install geany

echo "Installing Meteor JS..."
curl https://install.meteor.com/ | sh

echo "Installing JDK8..."
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer

echo "Installing required 32bit libs for Android SDK..."
sudo apt-get install --yes lib32z1 lib32stdc++6

echo "Installing Android SDK..."
meteor install-sdk android

echo "Installing Git..."
sudo apt-get install git

echo "Initial setup done!"
