install:
	npm-install
publish:
	npm publish --dry-run | npm link
lint:
	npx eslint