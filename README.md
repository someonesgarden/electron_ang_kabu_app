# Electron + Angular.js 株価リアルタイム表示アプリ
by <http://someonesgarden.org>

Electronを使ったデスクトップアプリケーションです。

README.mdファイルを読み込んで、それを解読しリアルタイムでマークアップした文章のプレビューを画面右側に表示させます。


### Packaging
`
electron-packager ./app readmeeditor --platform=darwin,win32 --arch=x64 --version=1.4.0
`


`
electron --version
`

これでversionが1.4.1とわかったので、buildするときはtargetを1.4.1に設定すること。
`
node-gyp rebuild --target=1.4.1 --arch=x86
node-gyp rebuild --target=1.4.1 --arch=x86 --dist-url=https://atom.io/download/atom-shell
`