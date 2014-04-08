#!/bin/bash
echo "$(dirname $0)/branchandboundproto.R"
Rscript "$(dirname $0)"/processTourAndSaveResult.R $*
exit 0
