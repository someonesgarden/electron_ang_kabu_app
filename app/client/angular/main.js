var request = require('request');
var cheerio = require('cheerio');
require('date-utils');

var myApp = angular.module('myApp',[]);
myApp.controller('myController', ['$scope', function($scope){

    getNikkeiPrice($scope,'日経平均','998407.O'); // 日経平均取得

    getNowTime($scope); //　取得日時分秒

    // 取得ボタン押下処理
    $scope.getPrice = function(){
        getNikkeiPrice($scope,'日経平均','998407.O');
        //　取得日時分秒
        getNowTime($scope);
    }
}]);


// 日経平均株価取得処理
function getNikkeiPrice($scope,title,code){
    var url = 'http://stocks.finance.yahoo.co.jp/stocks/detail/?code='+code;
    request(url, function(error, response, body){
        if(!error  && response.statusCode === 200){
            var $ = cheerio.load(body);
            hoge = $(".stoksPrice").text();
            // 不要な空白を削除
            hoge  = hoge.replace(/\s/g,"");
            // スコープに値を設定
            $scope.$apply(function(){
                $scope.price = hoge;
                $scope.title = title;
            })
        }
    });
}

// 取得日時分秒取得処理
function getNowTime($scope){
    var now = new Date();
    var nowTime = now.toFormat("YYYY/MM/DD HH24:MI:SS");
    $scope.getTime = nowTime;
}