# This script installs the neccesary dependencies to develop
# on the chat bot, or use Node in general.

# Set convience variable
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Ensure correct dir, just in case
cd $SCRIPT_DIR

# Update package manager
sudo apt update

# Fetch NVM (Node Version Manager) easy script
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh

# Run easy script
bash install_nvm.sh && rm install_nvm.sh

# Source NVM to Bash
export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
source ~/.bashrc

# Using NVM, install specific Node version for the chat bot
nvm install 16.8.0 -y && \
    nvm use 16.8.0

# Verify correct installation
node -v

echo "Installation and setup completed. Don't forget to populate your .env!"
