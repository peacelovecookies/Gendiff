install:
	npm install
publish:
	npm publish --dry-run | npm link
lint:
	npx eslint
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
