#!/bin/bash
#
# Install automation for ansible

#######################################
# Print a message in a given color.
# Arguments:
#   Color. eg: green, red
#######################################
function print_color(){
  NC='\033[0m' # No Color
  case $1 in
    "green") COLOR='\033[0;32m' ;;
    "red") COLOR='\033[0;31m' ;;
    "*") COLOR='\033[0m' ;;
  esac

  echo -e "${COLOR} $2 ${NC}"
}

#######################################
# Check if passed command have output for version, 
# if it has output, it means package installed succesfully  
# Arguments:
#   Service Name. eg: docker, ansible, kubectl
#######################################
function check_package_command(){
  # 2>&1 -> this converts stderror / error into output  
  is_command_available=$(eval "sudo $1 --version" 2>&1)

  if [[ "$is_command_available" == *"command not found"* ]]
  then
    print_color "green" "$1 not installed"
    exit 1
  else
    print_color "green" "$1 installed"
  fi
}

print_color "green" "Ansible installation started..."

# update system
print_color "green" "Updating apt "
sudo apt update -y 

# install software common properties
print_color "green" "common software properties"
sudo apt install software-properties-common

# add ansible repository
print_color "green" "adding ansible repository"
sudo add-apt-repository --yes --update ppa:ansible/ansible

# install ansible
print_color "green" "installing ansible"
sudo apt install ansible -y

# Check if ansible command is enabled 
check_package_command "ansible"

print_color "green" "---------------- Setup / Installation of ansible - Finished ------------------"
