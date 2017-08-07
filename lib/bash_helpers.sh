# Returns a console-colored red string
function red {
  printf "\033[31m$1\033[0m\n"
}

# Returns a console-colored green string
function green {
  printf "\033[0;32m$1\033[0m\n"
}

# Returns a console-colored yellow string
function yellow {
  printf "\033[0;33m$1\033[0m\n"
}

function status {
  yellow " ➤  $1"
}

function success {
  green " ✔  $1"
}

function fail {
  red " ✖   $1"
  exit 1
}

# Execute the command and finish with error if it fails
function execute {
  $1
  if [[ $? != 0 ]]; then
    echo
    red "Command '${1}' failed!"
    exit 1
  fi
}
