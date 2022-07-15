FROM ubuntu:focal

ARG NODE_VERSION=16

RUN apt update && apt install -y \
	curl \
	git \
	make \
	zip

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
	unzip awscliv2.zip && \
	./aws/install

RUN curl -fsSL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" -o install_node.sh && \
	bash install_node.sh && \
	rm install_node.sh && \
	apt install -y nodejs

ENTRYPOINT [ "/usr/bin/make" ]
