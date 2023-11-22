npx tailwindcss -i ./base.dev.css -o ./base.css
rm build.zip
zip -r build.zip . -x \node_modules\* \.*\* package.json yarn.lock \*.sh tailwind.config.js \*.md