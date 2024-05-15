git submodule init
git submodule update
git submodule foreach git pull origin master
cp -R ./submodules/developer-tooling/docs/command-line-interface/* ./docs/cli/
yarn write-heading-ids docs/cli/*