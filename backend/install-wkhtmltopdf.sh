#!/bin/bash

# Install wkhtmltopdf
apt-get update
apt-get install -y wget
wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.bionic_amd64.deb
apt install -y ./wkhtmltox_0.12.6-1.bionic_amd64.deb
