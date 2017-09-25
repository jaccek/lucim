#!/bin/bash

OUT_DIR="output"

function createDirIfNotExists {
    DIR_NAME=$1
    if [ ! -d "$DIR_NAME" ]; then
        mkdir $DIR_NAME
    fi
}

# create output directories
createDirIfNotExists $OUT_DIR
createDirIfNotExists $OUT_DIR/css
createDirIfNotExists $OUT_DIR/js

# copy html files
cp src/index.html output

# copy css files
# TODO: use sass
cp -r src/css output

# compile typescript
tsc
