#! /bin/sh

perf record -F 99 -p `pgrep -n node` -g -- sleep 30
