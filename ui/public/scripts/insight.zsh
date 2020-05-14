#!/usr/bin/env zsh

echo "#% Meta"
echo "Version=0.0.1"
echo "Shell=ZSH"
echo "Date=$(date --iso-8601=seconds)"
echo

echo "#% Setup"
source ~/.zshrc
precmd_functions=()
preexec_functions=()
echo

echo "#% Variables"
echo "OSTYPE=${OSTYPE}"
echo "SHELL=${SHELL}"
echo "ZSH_VERSION=${ZSH_VERSION}"
echo "TERM=${TERM}"
echo "EDITOR=${EDITOR}"
echo "VISUAL=${VISUAL}"
echo "HISTSIZE=${HISTSIZE}"
echo "SAVEHIST=${SAVEHIST}"
echo "PS1=${PS1}"
echo "plugins=${plugins}"
echo

echo "#% Aliases"
alias
echo

echo "#% History"
builtin fc -R
builtin fc -li 0
echo

echo "#% EOF"

