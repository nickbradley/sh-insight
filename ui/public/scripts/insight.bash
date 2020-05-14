#!/usr/bin/env bash

set -o errexit
set -o history

source "~/.bashrc"

echo "#% Variables"
echo "SHELL=${SHELL}"
echo "TERM=${TERM}"
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
