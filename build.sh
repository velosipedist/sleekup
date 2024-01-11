npx tailwindcss -i ./base.dev.css -o ./base.css
rm -Rf ./build
mkdir -p ./build/icons/
mkdir -p ./build/webfonts/
ln ./icons/*.* ./build/icons/
ln ./webfonts/*.* ./build/webfonts/
ln ./base.css ./build/
ln ./lib.js ./build/
ln ./main.js ./build/
ln ./popup.js ./build/
ln ./*.html ./build/
ln ./manifest.json ./build/
#cp -Rf ./icons/*.* ./build/icons/
#cp -Rf ./webfonts/*.* ./build/webfonts/
#cp -Rf ./base.css ./build/
#cp -Rf ./lib.js ./build/
#cp -Rf ./main.js ./build/
#cp -Rf ./popup.js ./build/
#cp -Rf ./*.html ./build/
#cp -Rf ./manifest.json ./build/
#rm build.zip
#zip -r build.zip . -x \node_modules\* \.*\* package.json yarn.lock \*.sh tailwind.config.js \*.md