var app = angular.module('LChat', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "static/templates/home.html"
        })
        .state("login", {
            url:"/login",
            templateUrl: "static/templates/login.html"
        })
        .state("signup", {
            url: "/signup",
            templateUrl: "static/templates/signup.html"
        })
    ;
});