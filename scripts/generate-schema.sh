#! /usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR=$DIR/..

pushd $ROOT_DIR &&
cd server/ &&
mix absinthe.schema.json --schema WebApi.Schema &&
mv ./schema.json ../client/server-schema.json &&
popd

