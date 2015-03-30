function doOpen() {
if (OS_ANDROID) {
var activity = $.getView().activity;
var menuItem = null;
activity.onCreateOptionsMenu = function(e) {
if ($.tabGroup.activeTab.title === "Feed") {
menuItem = e.menu.add({
title : "Take Photo",
showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
icon : Ti.Android.R.drawable.ic_menu_camera
});
menuItem.addEventListener("click", function(e) {
$.feedController.cameraButtonClicked();
});
}
};
activity.invalidateOptionsMenu();
$.tabGroup.addEventListener('blur', function(_event) {
$.getView().activity.invalidateOptionsMenu();
});
}
}
var user = Alloy.createModel('User');
user.login("wileytigram_admin", "wileytigram_admin", function(_response) {
if(_response.success)
{
$.tabGroup.open();
$.feedController.initialize();
} else {
alert("Error starting application " + _response.error);
Ti.API.error('error logging in ' + _response.error);
}
});
$.loginSuccessAction = function(_options) {
initializePushNotifications(_options.model);
Ti.API.info('logged in user information');
Ti.API.info(JSON.stringify(_options.model, null, 2));
$.tabGroup.open();
$.tabGroup.setActiveTab(0);
$.feedController.initialize();
Alloy.Globals.currentUser = _options.model;
$.feedController.parentController = $;
$.friendsController.parentController = $;
$.settingsController.parentController = $;
$.loginController && $.loginController.close();
};
$.userNotLoggedInAction = function() {
debugger;
if (!$.loginController) {
var loginController = Alloy.createController("login", {
parentController : $,
reset : true
});
$.loginController = loginController;
}
$.loginController.open(true);
};
$.userLoggedInAction = function() {
user.showMe(function(_response) {
if (_response.success === true) {
$.loginSuccessAction(_response);
} else {
alert("Application Error\n " + _response.error.message);
Ti.API.error(JSON.stringify(_response.error, null, 2));
$.userNotLoggedInAction();
}
});
};
var user = Alloy.createModel('User');
if (user.authenticated() === true) {
$.userLoggedInAction();
} else {
$.userNotLoggedInAction();
}
Alloy.Globals.openCurrentTabWindow = function(_window) {
$.tabGroup.activeTab.open(_window);
};
