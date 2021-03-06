# This script prepares and organizes the host computer with all necessary packages and tools.

# SECTION
# Setup and initialization
cd ~
sudo apt update && \
    sudo apt upgrade -y && 
    sudo apt autoremove -y

sudo apt install byobu -y

# SECTION
# Install Node and NPM
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
bash install_nvm.sh && rm install_nvm.sh
export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
source ~/.bashrc

nvm install 16.8.0 -y && \
    nvm use 16.8.0

# SECTION
# Project install and setup
git clone https://github.com/bananabrann/chat-golem.git
cd chat-golem
mv .env.example .env
npm install

# SECTION 
# FIN
echo "Installation and setup completed. Don't forget to populate your .env!"
