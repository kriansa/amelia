# Returns a console-colored red string
red() {
  printf "\033[31m%s\033[0m\n" "$1"
}

# Returns a console-colored green string
green() {
  printf "\033[0;32m%s\033[0m\n" "$1"
}

# Returns a console-colored yellow string
yellow() {
  printf "\033[0;33m%s\033[0m\n" "$1"
}

status() {
  yellow " ➤  $1"
}

success() {
  green " ✔  $1"
}

fail() {
  red " ✖   $1"
  exit 1
}

# Execute the command and finish with error if it fails
execute() {
  if $1; then
    echo
    red "Command '${1}' failed!"
    exit 1
  fi
}
