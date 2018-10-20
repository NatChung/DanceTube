#  DanceTube
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

## Build issues
#### react-native third party can't find config.h (https://github.com/facebook/react-native/issues/14382)
be in node_modules/react-native folder.
run ./scripts/ios-install-third-party.sh.
go to node_modules/react-native/third-party/glog-0.3.4.
run ../../scripts/ios-configure.sh.
done.

#### Xcode 10 libfishhook.a cannot be found (https://github.com/facebook/react-native/issues/19569)
