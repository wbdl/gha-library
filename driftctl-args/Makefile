IMAGE=node:16

build:
	npm init -y
	npm install @actions/core
	npm install aws-sdk
	npm install -g @vercel/ncc
	ncc build index.js --license licenses.txt

build-in-container:
	docker run -ti -w='/root' -v ~/.aws:/root/.aws:ro -v $$PWD:/root ${IMAGE} make build

clean:
	rm -rf .npm
	rm -rf node_modules

docker-run:
	docker run -ti -w='/root' -v "$$HOME/.aws":/root/.aws:ro -v $$PWD:/root ${IMAGE} bash
