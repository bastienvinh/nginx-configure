#!/bin/env bash

declare -r ERROR_CODE_SUCCESS=0
declare -r ERROR_CODE_ERROR=1
declare -r ERROR_CODE_WGET_OR_CURL=30
declare -r FILENAME_PACKAGE_JSON="package.json"

# Detect wget and curl
which wget &> /dev/null
has_wget=$?
which curl &> /dev/null
has_curl=$?

if [ $has_wget -gt $ERROR_CODE_SUCCESS ] || [ $has_curl -gt $ERROR_CODE_SUCCESS ]
then
  echo "Please install wget or curl into your terminal please."
  exit $ERROR_CODE_WGET_OR_CURL
fi

#check on the futur a new config on package.json

mkdir "$(pwd)/.cache/shml.sh"

if [ $has_wget -gt $ERROR_CODE_SUCCESS ]
then
  wget https://raw.githubusercontent.com/odb/shml/master/shml.sh -o "$(pwd)/.cache/shml.sh" --quiet
else
  curl -L https://raw.githubusercontent.com/odb/shml/1.1.0/shml.sh -o "$(pwd)/.cache/shml.sh"
fi