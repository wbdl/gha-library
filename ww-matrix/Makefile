IMAGE=node:16

build:
	npm init -y
	npm install @actions/core
	npm install -g @vercel/ncc
	ncc build index.js --license licenses.txt

build-in-container:
	docker run --rm -ti -w='/root' -v $$PWD:/root ${IMAGE} make build

clean:
	rm -rf .npm
	rm -rf node_modules
	rm -rf dist
	rm package.json
	rm package-lock.json

docker-run:
	docker run --rm -ti -w='/root' -v $$PWD:/root ${IMAGE} bash
