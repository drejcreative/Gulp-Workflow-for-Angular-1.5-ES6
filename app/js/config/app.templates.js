angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('home/home.html','<h1>{{ $ctrl.appName }}</h1>\r\n');
$templateCache.put('layout/app-view.html','\n<div ui-view></div>\n');}]);