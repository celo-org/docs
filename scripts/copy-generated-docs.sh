git submodule init
git submodule update
cp -R ./submodules/developer-tooling/docs/command-line-interface/* ./docs/cli/
yarn write-heading-ids docs/cli/*