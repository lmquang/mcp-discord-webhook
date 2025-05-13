# Makefile for MCP Discord Webhook Server

# Variables
TSC := npx tsc
NODE := node
NPM := npm
RM := rm -rf

# Source and Distribution Directories
SRC_DIR := src
DIST_DIR := dist

# Main TypeScript and JavaScript files
MAIN_TS_FILE := server.ts
MAIN_TS := $(SRC_DIR)/$(MAIN_TS_FILE)
MAIN_JS := $(DIST_DIR)/$(MAIN_TS_FILE:.ts=.js) # Replaces .ts with .js

# Find all TypeScript source files
TS_FILES := $(shell find $(SRC_DIR) -name '*.ts')

# Sentinel file to track if npm install has been run for current package-lock.json
NODE_MODULES_MARKER := node_modules/.installed

# Phony targets (targets that don't represent actual files)
.PHONY: all build run clean install help

# Default target: build the project
all: build

# Install project dependencies
# This target creates a marker file in node_modules.
# It will only run `npm install` if package.json or package-lock.json is newer
# than the marker, or if the marker doesn't exist.
$(NODE_MODULES_MARKER): package.json package-lock.json
	@echo "Installing/updating project dependencies..."
	$(NPM) install
	@# Create the marker directory if it doesn't exist, then touch the marker file
	@mkdir -p $(shell dirname $(NODE_MODULES_MARKER))
	@touch $(NODE_MODULES_MARKER)

install: $(NODE_MODULES_MARKER)

# Build the TypeScript project
# This depends on all .ts files, the tsconfig.json, and that dependencies are installed.
# It produces the main JS file as its target.
$(MAIN_JS): $(TS_FILES) tsconfig.json $(NODE_MODULES_MARKER)
	@echo "Building TypeScript project..."
	$(TSC)

build: $(MAIN_JS)

cli: build
	@echo "Starting MCP Discord Webhook CLI..."
	$(NODE) dist/cli.js

# Run the server
# Depends on the main JS file being built.
run: $(MAIN_JS)
	@echo "Starting MCP Discord Webhook server..."
	$(NODE) $(MAIN_JS)

# Clean build artifacts and installed dependencies marker
clean:
	@echo "Cleaning build artifacts..."
	$(RM) $(DIST_DIR)
	@echo "Cleaning node_modules marker..."
	$(RM) $(NODE_MODULES_MARKER)
	@echo "Note: To remove all node_modules, run 'rm -rf node_modules' manually if needed."

# Help target to display available commands
help:
	@echo "Available commands for MCP Discord Webhook Server:"
	@echo "  make install    - Install project dependencies (if changed or not present)"
	@echo "  make build      - Compile TypeScript to JavaScript (default target)"
	@echo "  make run        - Build (if necessary) and run the server"
	@echo "  make clean      - Remove compiled files (dist directory) and dependency marker"
	@echo "  make all        - Alias for 'make build'"
	@echo ""
	@echo "Project structure assumed:"
	@echo "  - TypeScript sources in: $(SRC_DIR)/"
	@echo "  - Main server file:      $(MAIN_TS)"
	@echo "  - Compiled output to:    $(DIST_DIR)/"
	@echo "  - Main compiled file:    $(MAIN_JS)"