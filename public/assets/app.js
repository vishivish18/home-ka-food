angular.module("app",["ngRoute","ui.router"]),angular.module("app").controller("adminCtrl",["$scope","$http",function(e,o){e.loading=!0,e.setup=function(){o.get("/api/users").then(function(o){e.model=o.data,e.loading=!1},function(e){})},e.setup()}]),angular.module("app").controller("loginCtrl",["$scope","auth","$location","$timeout",function(e,o,t,n){console.log("login controller"),e.authFail=!1,e.login=function(t,r){o.login(t,r).then(function(e){o.storeToken(e.data,function(){o.getUser().then(function(e){o.postLoginOps(e.data,function(){o.postLoginRouteHandler()})})})})["catch"](function(o){console.error("Gists error",o.status,o.data),401==o.status&&(e.authFail=!0,n(function(){e.authFail=!1},3e3))})["finally"](function(){console.log("finally finished gists")})}}]),angular.module("app").controller("masterCtrl",["$scope","$rootScope","$route",function(e,o,t){console.log("masterCtrl"),localStorage.getItem("logged_user")&&(o.currentUser=localStorage.getItem("logged_user")),e.$on("login",function(t,n){console.log("Logged In"),e.currentUser=n,o.currentUser=n,localStorage.setItem("logged_user",o.currentUser.username)})}]),angular.module("app").controller("registerCtrl",["$scope","auth","$location",function(e,o,t){e.register=function(n,r,l){o.register(n,r,l).then(function(n){o.login(r,l),e.$emit("login",n.data),t.path("/admin")})["catch"](function(e){console.log(e)})}}]),angular.module("app").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,o,t){o.otherwise("/"),e.state("app",{url:"/",views:{content:{templateUrl:"/landing.html",controller:"userRegisterCtrl"}}}).state("login",{url:"/login",views:{content:{templateUrl:"/login.html",controller:"loginCtrl"}}}).state("register",{url:"/efb82ec7a1a0e477a33e209dacd2a1e0",views:{content:{templateUrl:"/register.html",controller:"registerCtrl"}}}).state("admin",{url:"/admin",views:{content:{templateUrl:"/admin.html",controller:"adminCtrl"}}}),t.html5Mode(!0)}]),angular.module("app").controller("userRegisterCtrl",["$scope","$http",function(e,o){e.setup=function(){e.model={}},e.setup(),e.saveUser=function(){console.log("inside the func"),o.post("/api/users",{name:e.model.name,phone:e.model.phone,email:e.model.email}).then(function(o){console.log(o),$("#thanks").show().delay(5e3).fadeOut(),e.setup()},function(e){console.log(e)})},console.log("here in landing")}]),angular.module("app").service("auth",["$http","$window","$location","$rootScope",function(e,o,t,n){function r(){return e.get("api/admin")}function l(o,t){return e.post("api/sessions",{username:o,password:t})}function a(o,t,n){return e.post("api/admin",{name:o,username:t,password:n})}function i(){localStorage.removeItem("user_token"),localStorage.removeItem("logged_user"),delete e.defaults.headers.common["x-auth"],n.isLogged=!1,n.currentUser=null,t.path("/login")}function s(t,n){o.sessionStorage.user_token=t,localStorage.setItem("user_token",t),e.defaults.headers.common["x-auth"]=o.sessionStorage.user_token,n&&"function"==typeof n&&n()}function u(){}function c(e,o){n.currentUser=e.name,localStorage.setItem("logged_user",n.currentUser),n.isLogged=!0,o&&"function"==typeof o&&o()}function g(){n.intendedRoute?t.path(n.intendedRoute):t.path("/admin")}return{getUser:r,login:l,register:a,logout:i,storeToken:s,isLogged:u,postLoginOps:c,postLoginRouteHandler:g}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImNvbnRyb2xsZXJzL2FkbWluQ3RybC5qcyIsImNvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImNvbnRyb2xsZXJzL21hc3RlckN0cmwuanMiLCJjb250cm9sbGVycy9yZWdpc3RlckN0cmwuanMiLCJjb250cm9sbGVycy9yb3V0ZXMuanMiLCJjb250cm9sbGVycy91c2VyUmVnaXN0ZXJDdHJsLmpzIiwic2VydmljZXMvYXV0aC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29udHJvbGxlciIsIiRzY29wZSIsIiRodHRwIiwibG9hZGluZyIsInNldHVwIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwibW9kZWwiLCJkYXRhIiwiYXV0aCIsIiRsb2NhdGlvbiIsIiR0aW1lb3V0IiwiY29uc29sZSIsImxvZyIsImF1dGhGYWlsIiwibG9naW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwicmVzIiwic3RvcmVUb2tlbiIsImdldFVzZXIiLCJwb3N0TG9naW5PcHMiLCJwb3N0TG9naW5Sb3V0ZUhhbmRsZXIiLCJlcnJvciIsInN0YXR1cyIsIiRyb290U2NvcGUiLCIkcm91dGUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY3VycmVudFVzZXIiLCIkb24iLCJfIiwidXNlciIsInNldEl0ZW0iLCJyZWdpc3RlciIsIm5hbWUiLCIkZW1pdCIsInBhdGgiLCJlcnIiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRsb2NhdGlvblByb3ZpZGVyIiwib3RoZXJ3aXNlIiwic3RhdGUiLCJ1cmwiLCJ2aWV3cyIsImNvbnRlbnQiLCJ0ZW1wbGF0ZVVybCIsImh0bWw1TW9kZSIsInNhdmVVc2VyIiwicG9zdCIsInBob25lIiwiZW1haWwiLCIkIiwic2hvdyIsImRlbGF5IiwiZmFkZU91dCIsInNlcnZpY2UiLCIkd2luZG93IiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsImRlZmF1bHRzIiwiaGVhZGVycyIsImNvbW1vbiIsImlzTG9nZ2VkIiwiY2IiLCJzZXNzaW9uU3RvcmFnZSIsInVzZXJfdG9rZW4iLCJpbnRlbmRlZFJvdXRlIl0sIm1hcHBpbmdzIjoiQUFBQUEsUUFBQUMsT0FBQSxPQUNBLFVBQUEsY0NEQUQsUUFBQUMsT0FBQSxPQUNBQyxXQUFBLGFBQUEsU0FBQSxRQUFBLFNBQUFDLEVBQUFDLEdBRUFELEVBQUFFLFNBQUEsRUFDQUYsRUFBQUcsTUFBQSxXQUVBRixFQUFBRyxJQUFBLGNBQ0FDLEtBQUEsU0FBQUMsR0FDQU4sRUFBQU8sTUFBQUQsRUFBQUUsS0FDQVIsRUFBQUUsU0FBQSxHQUVBLFNBQUFJLE9BT0FOLEVBQUFHLFdDbEJBTixRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsYUFBQSxTQUFBLE9BQUEsWUFBQSxXQUFBLFNBQUFDLEVBQUFTLEVBQUFDLEVBQUFDLEdBQ0FDLFFBQUFDLElBQUEsb0JBQ0FiLEVBQUFjLFVBQUEsRUFDQWQsRUFBQWUsTUFBQSxTQUFBQyxFQUFBQyxHQUNBUixFQUFBTSxNQUFBQyxFQUFBQyxHQUNBWixLQUFBLFNBQUFhLEdBQ0FULEVBQUFVLFdBQUFELEVBQUFWLEtBQUEsV0FDQUMsRUFBQVcsVUFDQWYsS0FBQSxTQUFBYSxHQUNBVCxFQUFBWSxhQUFBSCxFQUFBVixLQUFBLFdBQ0FDLEVBQUFhLGdDQU5BYixTQVlBLFNBQUFILEdBQ0FNLFFBQUFXLE1BQUEsY0FBQWpCLEVBQUFrQixPQUFBbEIsRUFBQUUsTUFDQSxLQUFBRixFQUFBa0IsU0FDQXhCLEVBQUFjLFVBQUEsRUFDQUgsRUFBQSxXQUFBWCxFQUFBYyxVQUFBLEdBQUEsUUFoQkFMLFdBbUJBLFdBQ0FHLFFBQUFDLElBQUEsZ0NDekJBaEIsUUFBQUMsT0FBQSxPQUNBQyxXQUFBLGNBQUEsU0FBQSxhQUFBLFNBQUEsU0FBQUMsRUFBQXlCLEVBQUFDLEdBQ0FkLFFBQUFDLElBQUEsY0FFQWMsYUFBQUMsUUFBQSxpQkFDQUgsRUFBQUksWUFBQUYsYUFBQUMsUUFBQSxnQkFFQTVCLEVBQUE4QixJQUFBLFFBQUEsU0FBQUMsRUFBQUMsR0FDQXBCLFFBQUFDLElBQUEsYUFDQWIsRUFBQTZCLFlBQUFHLEVBQ0FQLEVBQUFJLFlBQUFHLEVBQ0FMLGFBQUFNLFFBQUEsY0FBQVIsRUFBQUksWUFBQWIsZUNYQW5CLFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxnQkFBQSxTQUFBLE9BQUEsWUFBQSxTQUFBQyxFQUFBUyxFQUFBQyxHQUNBVixFQUFBa0MsU0FBQSxTQUFBQyxFQUFBbkIsRUFBQUMsR0FDQVIsRUFBQXlCLFNBQUFDLEVBQUFuQixFQUFBQyxHQUNBWixLQUFBLFNBQUFDLEdBQ0FHLEVBQUFNLE1BQUFDLEVBQUFDLEdBQ0FqQixFQUFBb0MsTUFBQSxRQUFBOUIsRUFBQUUsTUFDQUUsRUFBQTJCLEtBQUEsWUFKQTVCLFNBTUEsU0FBQTZCLEdBQ0ExQixRQUFBQyxJQUFBeUIsU0NWQXpDLFFBQUFDLE9BQUEsT0FDQXlDLFFBQUEsaUJBQUEscUJBQUEsb0JBQUEsU0FBQUMsRUFBQUMsRUFBQUMsR0FFQUQsRUFBQUUsVUFBQSxLQUVBSCxFQUNBSSxNQUFBLE9BQ0FDLElBQUEsSUFDQUMsT0FDQUMsU0FDQUMsWUFBQSxnQkFDQWpELFdBQUEsdUJBT0E2QyxNQUFBLFNBQ0FDLElBQUEsU0FDQUMsT0FDQUMsU0FDQUMsWUFBQSxjQUNBakQsV0FBQSxnQkFNQTZDLE1BQUEsWUFDQUMsSUFBQSxvQ0FDQUMsT0FDQUMsU0FDQUMsWUFBQSxpQkFDQWpELFdBQUEsbUJBTUE2QyxNQUFBLFNBQ0FDLElBQUEsU0FDQUMsT0FDQUMsU0FDQUMsWUFBQSxjQUNBakQsV0FBQSxnQkFVQTJDLEVBQUFPLFdBQUEsTUN2REFwRCxRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsb0JBQUEsU0FBQSxRQUFBLFNBQUFDLEVBQUFDLEdBQ0FELEVBQUFHLE1BQUEsV0FDQUgsRUFBQU8sVUFFQVAsRUFBQUcsUUFDQUgsRUFBQWtELFNBQUEsV0FDQXRDLFFBQUFDLElBQUEsbUJBQ0FaLEVBQUFrRCxLQUFBLGNBQ0FoQixLQUFBbkMsRUFBQU8sTUFBQTRCLEtBQ0FpQixNQUFBcEQsRUFBQU8sTUFBQTZDLE1BQ0FDLE1BQUFyRCxFQUFBTyxNQUFBOEMsUUFHQWhELEtBQUEsU0FBQUMsR0FDQU0sUUFBQUMsSUFBQVAsR0FDQWdELEVBQUEsV0FBQUMsT0FBQUMsTUFBQSxLQUFBQyxVQUNBekQsRUFBQUcsU0FDQSxTQUFBRyxHQUNBTSxRQUFBQyxJQUFBUCxNQU1BTSxRQUFBQyxJQUFBLHNCQ3pCQWhCLFFBQUFDLE9BQUEsT0FDQTRELFFBQUEsUUFBQSxRQUFBLFVBQUEsWUFBQSxhQUFBLFNBQUF6RCxFQUFBMEQsRUFBQWpELEVBQUFlLEdBZUEsUUFBQUwsS0FDQSxNQUFBbkIsR0FBQUcsSUFBQSxhQUdBLFFBQUFXLEdBQUFDLEVBQUFDLEdBRUEsTUFBQWhCLEdBQUFrRCxLQUFBLGdCQUNBbkMsU0FBQUEsRUFDQUMsU0FBQUEsSUFJQSxRQUFBaUIsR0FBQUMsRUFBQW5CLEVBQUFDLEdBRUEsTUFBQWhCLEdBQUFrRCxLQUFBLGFBQ0FoQixLQUFBQSxFQUNBbkIsU0FBQUEsRUFDQUMsU0FBQUEsSUFLQSxRQUFBMkMsS0FDQWpDLGFBQUFrQyxXQUFBLGNBQ0FsQyxhQUFBa0MsV0FBQSxxQkFDQTVELEdBQUE2RCxTQUFBQyxRQUFBQyxPQUFBLFVBQ0F2QyxFQUFBd0MsVUFBQSxFQUNBeEMsRUFBQUksWUFBQSxLQUNBbkIsRUFBQTJCLEtBQUEsVUFNQSxRQUFBbEIsR0FBQUQsRUFBQWdELEdBQ0FQLEVBQUFRLGVBQUEsV0FBQWpELEVBQ0FTLGFBQUFNLFFBQUEsYUFBQWYsR0FDQWpCLEVBQUE2RCxTQUFBQyxRQUFBQyxPQUFBLFVBQUFMLEVBQUFRLGVBQUFDLFdBQ0FGLEdBQUEsa0JBQUFBLElBQ0FBLElBSUEsUUFBQUQsTUFJQSxRQUFBNUMsR0FBQUgsRUFBQWdELEdBR0F6QyxFQUFBSSxZQUFBWCxFQUFBaUIsS0FDQVIsYUFBQU0sUUFBQSxjQUFBUixFQUFBSSxhQUNBSixFQUFBd0MsVUFBQSxFQUNBQyxHQUFBLGtCQUFBQSxJQUNBQSxJQUtBLFFBQUE1QyxLQUNBRyxFQUFBNEMsY0FDQTNELEVBQUEyQixLQUFBWixFQUFBNEMsZUFFQTNELEVBQUEyQixLQUFBLFVBM0VBLE9BQ0FqQixRQUFBQSxFQUNBTCxNQUFBQSxFQUNBbUIsU0FBQUEsRUFDQTBCLE9BQUFBLEVBQ0F6QyxXQUFBQSxFQUNBOEMsU0FBQUEsRUFDQTVDLGFBQUFBLEVBQ0FDLHNCQUFBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAgICduZ1JvdXRlJywgJ3VpLnJvdXRlcidcbl0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignYWRtaW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuXG4gICAgICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLnNldHVwID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICRodHRwLmdldCgnL2FwaS91c2VycycpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcbiAgICAgICAgICAgICAgICAgICAgLy8gb3Igc2VydmVyIHJldHVybnMgcmVzcG9uc2Ugd2l0aCBhbiBlcnJvciBzdGF0dXMuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdsb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGF1dGgsICRsb2NhdGlvbiwgJHRpbWVvdXQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbiBjb250cm9sbGVyXCIpXG4gICAgICAgICRzY29wZS5hdXRoRmFpbCA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIGF1dGgubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBhdXRoLnN0b3JlVG9rZW4ocmVzLmRhdGEsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0aC5nZXRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aC5wb3N0TG9naW5PcHMocmVzLmRhdGEsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aC5wb3N0TG9naW5Sb3V0ZUhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdHaXN0cyBlcnJvcicsIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYXV0aEZhaWwgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHsgJHNjb3BlLmF1dGhGYWlsID0gZmFsc2U7IH0sIDMwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5hbGx5IGZpbmlzaGVkIGdpc3RzXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbWFzdGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHJvdXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibWFzdGVyQ3RybFwiKTtcblxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJykpIHsgICAgICAgICAgXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJylcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuJG9uKCdsb2dpbicsIGZ1bmN0aW9uKF8sIHVzZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2VkIEluXCIpO1xuICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRVc2VyID0gdXNlclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXNlciA9IHVzZXJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dnZWRfdXNlcicsICRyb290U2NvcGUuY3VycmVudFVzZXIudXNlcm5hbWUpXG4gICAgICAgIH0pXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyQ3RybCcsZnVuY3Rpb24oJHNjb3BlLGF1dGgsJGxvY2F0aW9uKXtcblx0JHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24obmFtZSx1c2VybmFtZSxwYXNzd29yZCl7XG5cdFx0YXV0aC5yZWdpc3RlcihuYW1lLHVzZXJuYW1lLHBhc3N3b3JkKVxuXHRcdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcdFx0XHRcblx0XHRcdGF1dGgubG9naW4odXNlcm5hbWUscGFzc3dvcmQpXG5cdFx0XHQkc2NvcGUuJGVtaXQoJ2xvZ2luJyxyZXNwb25zZS5kYXRhKVxuXHRcdFx0JGxvY2F0aW9uLnBhdGgoJy9hZG1pbicpXG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKGVycil7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpXG5cdFx0fSlcblx0fVxuXG59KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9sYW5kaW5nLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3VzZXJSZWdpc3RlckN0cmwnXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2xvZ2luLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5DdHJsJ1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgncmVnaXN0ZXInLCB7XG4gICAgICAgICAgICB1cmw6ICcvZWZiODJlYzdhMWEwZTQ3N2EzM2UyMDlkYWNkMmExZTAnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcmVnaXN0ZXIuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdyZWdpc3RlckN0cmwnXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhZG1pbicsIHtcbiAgICAgICAgICAgIHVybDogJy9hZG1pbicsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50Jzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hZG1pbi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkbWluQ3RybCdcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuXG5cblxuXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKVxuXG5cbiAgICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCd1c2VyUmVnaXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICAgICAgICAkc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuICAgICAgICAkc2NvcGUuc2F2ZVVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5zaWRlIHRoZSBmdW5jXCIpXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3VzZXJzJywge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAkc2NvcGUubW9kZWwubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6ICRzY29wZS5tb2RlbC5waG9uZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5tb2RlbC5lbWFpbFxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICAgICAgJChcIiN0aGFua3NcIikuc2hvdygpLmRlbGF5KDUwMDApLmZhZGVPdXQoKVxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2V0dXAoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBjb25zb2xlLmxvZyhcImhlcmUgaW4gbGFuZGluZ1wiKVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuc2VydmljZSgnYXV0aCcsIGZ1bmN0aW9uKCRodHRwLCAkd2luZG93LCAkbG9jYXRpb24sICRyb290U2NvcGUpIHtcblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRVc2VyOiBnZXRVc2VyLFxuICAgICAgICAgICAgbG9naW46IGxvZ2luLFxuICAgICAgICAgICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxuICAgICAgICAgICAgbG9nb3V0OiBsb2dvdXQsXG4gICAgICAgICAgICBzdG9yZVRva2VuOiBzdG9yZVRva2VuLFxuICAgICAgICAgICAgaXNMb2dnZWQ6IGlzTG9nZ2VkLFxuICAgICAgICAgICAgcG9zdExvZ2luT3BzOiBwb3N0TG9naW5PcHMsXG4gICAgICAgICAgICBwb3N0TG9naW5Sb3V0ZUhhbmRsZXI6IHBvc3RMb2dpblJvdXRlSGFuZGxlclxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRVc2VyKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL2FkbWluJylcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL3Nlc3Npb25zJywge1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZWdpc3RlcihuYW1lLCB1c2VybmFtZSwgcGFzc3dvcmQpIHtcblxuICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdhcGkvYWRtaW4nLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcl90b2tlbicpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2xvZ2dlZF91c2VyJyk7XG4gICAgICAgICAgICBkZWxldGUgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3gtYXV0aCddXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlzTG9nZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL2xvZ2luXCIpXG5cblxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdG9yZVRva2VuKHJlcywgY2IpIHtcbiAgICAgICAgICAgICR3aW5kb3cuc2Vzc2lvblN0b3JhZ2VbXCJ1c2VyX3Rva2VuXCJdID0gcmVzXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcl90b2tlbicsIHJlcyk7XG4gICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsneC1hdXRoJ10gPSAkd2luZG93LnNlc3Npb25TdG9yYWdlLnVzZXJfdG9rZW5cbiAgICAgICAgICAgIGlmIChjYiAmJiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc0xvZ2dlZCgpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcG9zdExvZ2luT3BzKHJlcywgY2IpIHtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gcmVzLm5hbWVcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dnZWRfdXNlcicsICRyb290U2NvcGUuY3VycmVudFVzZXIpXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlzTG9nZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChjYiAmJiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3RMb2dpblJvdXRlSGFuZGxlcigpIHtcbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmludGVuZGVkUm91dGUpIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgkcm9vdFNjb3BlLmludGVuZGVkUm91dGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2FkbWluJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
