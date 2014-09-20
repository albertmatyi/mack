#!/bin/bash -xe

DB="`basename $PWD`"
MONGO_URL=mongodb://localhost:27017/$DB meteor
