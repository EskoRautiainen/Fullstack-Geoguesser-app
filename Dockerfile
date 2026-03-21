# Base image will be latest Alpine Linux
FROM alpine:latest

# Copy everything from your project directory to
# a folder called /app in the container.
# Note: this also copies the Dockerfile itself, which is
# harmless but unnecessary. In later sections we will use
# a .dockerignore file to exclude such files.
COPY . /app

# Move into that directory
WORKDIR /app

# Install Java 25
RUN apk update && apk add openjdk25

# Compile app
RUN javac Main.java

# Run the compiled app
CMD ["java", "Main"]