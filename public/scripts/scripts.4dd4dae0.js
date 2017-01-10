"use strict";angular.module("hplannerFrontendApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","multipleDatePicker","config"]).config(["$routeProvider","$httpProvider","$mdThemingProvider",function(a,b,c){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/recommendations",{templateUrl:"views/recommendations.html",controller:"RecommendCtrl",controllerAs:"recommend"}).otherwise({redirectTo:"/"}),b.defaults.useXDomain=!0,delete b.defaults.headers.common["X-Requested-With"]}]),angular.module("config",[]).constant("ENV",{name:"development",apiEndpoint:"http://localhost:3000"}),angular.module("hplannerFrontendApp").service("HolidayListService",["$http","ENV",function(a,b){this.dates=function(){return a.get(b.apiEndpoint+"/api/leaves.json").then(function(a){return a.data},function(a){return-1})}}]),angular.module("hplannerFrontendApp").service("UserPreferenceService",["$http","ENV",function(a,b){this.recommendations={api_recommendations:-1},this.plans=function(e,f){return e.holiday_list=c(e.holiday_list),e.date_from=d(e.date_from),a.post(b.apiEndpoint+"/api/leaves/gen_plan.json",e).then(function(a){return f.api_recommendations=a.data,a.data},function(a){return-1})};var c=function(a){for(var b=0;b<a.length;b++)a[b]=d(a[b]);return a},d=function(a){return a.format("YYYY-MM-DD")}}]),angular.module("hplannerFrontendApp").controller("MainCtrl",["HolidayListService","UserPreferenceService","$scope","$location","$interval","$mdSidenav",function(a,b,c,d,e,f){var g=a.dates();g.then(function(a){var b=a.holiday_list;if(c.circle=0,c.fmonth=0,c.submited=!1,c.submit_form={holiday_list:[],leaves:0},-1===b)c.submit_form.date_from=moment.now(),c.submit_form.date_to=moment.now()+365;else{for(var d=0;d<b.length;d++)c.submit_form.holiday_list.push(moment(b[d]));c.submit_form.date_from=moment(a.date_from),c.submit_form.date_to=moment(a.date_to)}});for(var h=[],i=moment(c.date_from),j=moment(i).add(550,"d");j>i;i.add(1,"month"))h.push(moment(i));c.months=h,c.changeFmonth=function(a){c.fmonth=a},c.submit=function(){e(function(){c.circle+=1,c.circle>100&&(c.circle=30)},100),c.submited=!0,b.plans(c.submit_form,b.recommendations).then(function(a){d.path("/recommendations")},function(a){d.path("/")})},c.changeFmonthSidenav=function(a){c.fmonth=a,f("left").close()},c.openSideNavPanel=function(){f("left").open()},c.closeSideNavPanel=function(){f("left").close()}}]),angular.module("hplannerFrontendApp").controller("RecommendCtrl",["UserPreferenceService","$scope","$location","$mdSidenav",function(a,b,c,d){var e=a.recommendations.api_recommendations;-1===e&&c.path("/"),b.date_from=moment(e.date_from),b.date_to=moment(b.date_from).add(365,"days"),b.rnumber=0;var f=e.response;b.recommendations=[];for(var g=0;g<f.length;g++){var h={id:g};h.fitness_score=f[g].fitness_score,h.plan=[];for(var i=0;i<f[g].array.length;i++)"workday"!==f[g].array[i][1]&&h.plan.push(moment(f[g].array[i][0]));b.recommendations.push(h)}b.disableClick=function(a){a.preventDefault()};for(var j=[],k=moment(b.date_from),l=moment(k).add(550,"d");l>k;k.add(1,"month"))j.push(moment(k));b.months=j,b.changeRnumber=function(a){b.rnumber=a},b.changeRnumberSidenav=function(a){b.rnumber=a,d("left").close()},b.openSideNavPanel=function(){d("left").open()},b.closeSideNavPanel=function(){d("left").close()}}]),angular.module("hplannerFrontendApp").run(["$templateCache",function(a){a.put("views/main.html",'<div flex class="padding-left-5 padding-right-5 padding-bottom-5"> <md-nav-bar hide-xs md-selected-nav-item="currentNavItem" nav-bar-aria-label="navigation links"> <md-nav-item md-nav-click="changeFmonth(0)" name="page1">1-4</md-nav-item> <md-nav-item md-nav-click="changeFmonth(4)" name="page2">5-8</md-nav-item> <md-nav-item md-nav-click="changeFmonth(8)" name="page3">9-12</md-nav-item> <md-nav-item md-nav-click="changeFmonth(12)" name="page4">13-13</md-nav-item> </md-nav-bar> <multiple-date-picker ng-model="submit_form.holiday_list" disable-days-before="submit_form.date_from" disable-days-after="submit_form.date_to" month="months[fmonth]" disable-navigation="true" hide> </multiple-date-picker> <md-sidenav class="md-sidenav-left md-whiteframe-z2" hide-gt-xs md-component-id="left"> <md-toolbar layout="row"> <div class="md-toolbar-tools"> <h4> <span>Months from today</span> </h4> <span flex></span> <md-button class="md-icon-button" aria-label="Close Side Panel" ng-click="closeSideNavPanel()"> <md-tooltip>Close Side Panel</md-tooltip> <md-icon class="small-icon" md-svg-icon="images/icons/cross.e5d31c39.svg"></md-icon> </md-button> </div> </md-toolbar> <md-list layout="column"> <md-button flex class="md-primary" ng-click="changeFmonthSidenav(0)">1 - 4</md-button> <md-button flex class="md-primary" ng-click="changeFmonthSidenav(4)">5 - 8</md-button> <md-button flex class="md-primary" ng-click="changeFmonthSidenav(8)">9 - 12</md-button> <md-button flex class="md-primary" ng-click="changeFmonthSidenav(12)">13 - 13</md-button> </md-list> </md-sidenav> <div hide-gt-xs layout="row"> <span flex="80"></span> <md-button flex class="md-icon-button md-primary icon-1" aria-label="Settings" ng-click="openSideNavPanel()"> <md-icon md-svg-icon="images/icons/menu.de12d65d.svg"></md-icon> </md-button> </div> <div flex ng-cloak> <form ng-submit="submit()" novalidate> <md-input-container class="md-block"> <div class="padding-bottom-25px"> <label class="font-10"> Select prefered dates * </label> </div> <div flex layout-xs="column" layout-gt-xs="row"> <div> <div flex class="padding-left-3 padding-right-3 padding-bottom-7"> <multiple-date-picker ng-model="submit_form.holiday_list" disable-days-before="submit_form.date_from" disable-days-after="submit_form.date_to" month="months[fmonth+0]" disable-navigation="true"> </multiple-date-picker> </div> </div> <div> <div flex class="padding-left-3 padding-right-3 padding-bottom-7"> <multiple-date-picker ng-model="submit_form.holiday_list" disable-days-before="submit_form.date_from" disable-days-after="submit_form.date_to" month="months[fmonth+1]" disable-navigation="true"> </multiple-date-picker> </div> </div> <div> <div flex class="padding-left-3 padding-right-3 padding-bottom-7"> <multiple-date-picker ng-model="submit_form.holiday_list" disable-days-before="submit_form.date_from" disable-days-after="submit_form.date_to" month="months[fmonth+2]" disable-navigation="true"> </multiple-date-picker> </div> </div> <div> <div flex class="padding-left-3 padding-right-3 padding-bottom-7"> <multiple-date-picker ng-model="submit_form.holiday_list" disable-days-before="submit_form.date_from" disable-days-after="submit_form.date_to" month="months[fmonth+3]" disable-navigation="true"> </multiple-date-picker> </div> </div> </div> </md-input-container> <md-input-container class="md-block"> <label> Prefered number of leaves this year </label> <input required type="number" ng-model="submit_form.leaves" min="0"> </md-input-container> <div layout="row"> <md-button class="md-primary" flex="60" type="submit" ng-click="plans_resp()" md-no-ink ng-disabled="submited">Generate Plans</md-button> <md-progress-circular flex align="center" md-mode="determinate" value="{{circle}}"></md-progress-circular> </div> </form> </div> </div>'),a.put("views/recommendations.html",'<div layout="column" flex class="padding-left-5 padding-right-5 padding-bottom-5"> <md-nav-bar hide-xs md-selected-nav-item="currentNavItem" nav-bar-aria-label="navigation links" md-no-ink> <md-nav-item class="padding-left-5" md-nav-click="changeRnumber(0)" name="page1">r1</md-nav-item> <md-nav-item md-nav-click="changeRnumber(1)" name="page2">r2</md-nav-item> <md-nav-item md-nav-click="changeRnumber(2)" name="page3">r3</md-nav-item> <md-nav-item md-nav-click="changeRnumber(3)" name="page4">r4</md-nav-item> </md-nav-bar> <div hide-gt-xs layout="row"> <span flex="80"></span> <md-button flex class="md-icon-button md-primary icon-1" aria-label="Settings" ng-click="openSideNavPanel()"> <md-icon md-svg-icon="images/icons/menu.de12d65d.svg"></md-icon> </md-button> </div> <md-sidenav hide-gt-xs class="md-sidenav-left md-whiteframe-z2" md-component-id="left"> <md-toolbar layout="row"> <div class="md-toolbar-tools"> <h4> <span>Recommendations</span> </h4> <span flex></span> <md-button class="md-icon-button" aria-label="Close Side Panel" ng-click="closeSideNavPanel()"> <md-tooltip>Close Side Panel</md-tooltip> <md-icon class="small-icon" md-svg-icon="images/icons/cross.e5d31c39.svg"></md-icon> </md-button> </div> </md-toolbar> <md-list layout="column"> <md-button flex class="md-primary" ng-click="changeRnumberSidenav(0)">recommendation 1</md-button> <md-button flex class="md-primary" ng-click="changeRnumberSidenav(1)">recommendation 2</md-button> <md-button flex class="md-primary" ng-click="changeRnumberSidenav(2)">recommendation 3</md-button> <md-button flex class="md-primary" ng-click="changeRnumberSidenav(3)">recommendation 4</md-button> </md-list> </md-sidenav> <div layout="row" layout-xs="column" class="padding-left-1 padding-right-1"> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[0]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[1]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[2]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[3]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[4]" disable-navigation="true"> </multiple-date-picker> </div> </div> <div layout="row" layout-xs="column" class="padding-left-1 padding-right-1"> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[5]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[6]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[7]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[8]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[9]" disable-navigation="true"> </multiple-date-picker> </div> </div> <div layout="row" layout-xs="column" class="padding-left-1 padding-right-1"> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[10]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[11]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[12]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[13]" disable-navigation="true"> </multiple-date-picker> </div> <div class="padding-left-1 padding-right-1 padding-top-1"> <multiple-date-picker ng-model="recommendations[rnumber][\'plan\']" disable-days-before="date_from" disable-days-after="date_to" day-click="disableClick" month="months[14]" disable-navigation="true"> </multiple-date-picker> </div> </div> </div>')}]);