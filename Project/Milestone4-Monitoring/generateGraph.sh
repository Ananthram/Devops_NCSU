#! /bin/sh

extension=".svg"
perf script > $1

./FlameGraph/stackcollapse-perf.pl < ./$1 |  ./FlameGraph/flamegraph.pl > ./$1$extension

rm perf.data
rm $1
