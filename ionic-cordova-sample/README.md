# Ionic Angular Sample Application

## Android

```bash
ionic cordova build android --prod --device --release --buildConfig=build-android.json
```

## iOS

> iOS打包依赖于苹果证书，暂不提供

```bash
# 
# 真机运行
# 
ionic cordova run ios --device --buildConfig=build-ios.json --target xxxxxx
#
# 调试包
ionic cordova build ios --prod --debug --device --buildConfig=build-ios.json
# 生产包
ionic cordova build ios --prod --release --device --buildConfig=build-ios.json
```
