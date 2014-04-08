#!/bin/bash
echo "$(dirname $0)/processTourAndSaveResult.R"
Rscript "$(dirname $0)"/processTourAndSaveResult.R $*
exit 0
