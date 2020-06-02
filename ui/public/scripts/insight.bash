#!/bin/bash -li

echo "#% Meta"
echo "Version=0.0.1"
echo "Shell=BASH"
echo "Date=$(date +%Y-%m-%dT%H:%M:%S%z)"
echo

echo "#% Setup"
echo

echo "#% Variables"
echo "OSTYPE=${OSTYPE}"
echo "SHELL=${SHELL}"
echo "BASH_VERSION=${BASH_VERSION}"
echo "TERM=${TERM}"
echo "EDITOR=${EDITOR}"
echo "VISUAL=${VISUAL}"
echo "HISTSIZE=${HISTSIZE}"
echo "HISTFILESIZE=${HISTFILESIZE}"
echo "HISTTIMEFORMAT=${HISTTIMEFORMAT}"
echo "PS1=${PS1}"
echo

echo "#% Aliases"
alias
echo

echo "#% History"
history
echo

echo "#% EOF"
