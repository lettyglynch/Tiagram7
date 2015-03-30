 function Sync(method, model, options) {
 debugger; var object_name = model.config.adapter.collection_name;
 
 if (object_name === "photos") {
processACSPhotos(model, method, options);
} else if (object_name === "users") {
processACSUsers(model, method, options);
} else if (object_name === "reviews") {
processACSComments(model, method, opts);
}

function processACSPhotos(model, method, options) {
switch (method) {
case "create":

var params = model.toJSON();

Cloud.Reviews.create(params, function(e) {

if (e.success) {
model.meta = e.meta;
opts.success && opts.success(e.reviews[0]),
model.trigger("fetch");
} else {
Ti.API.error("Comments.create " + e.message);
opts.error && opts.message (e.message || e);
}
});
break;
case "read":
Cloud.Reviews.query((opts.data || {}) , function(e) {
if (e.success) {
model.meta = e.meta;
if (e.photos.length === 1) {
opts.success && opts.success(e.reviews[0]);
} else {
opts.success && opts.success(e.reviews);
}
model.trigger("fetch");
return;
} else {
Ti.API.error("Reviews.query " + e.message);
opts.error && opts.errror(e.message || e);
}
});
break;
case "update":
case "delete":
var params = {};

params.review_id = model.id || (opts.data && opts.data.id);
params.photo_id = opts.data && opts.data.photo_id;

Cloud.Reviews.remove(params, function(e) {
if (e.success) {
model.meta = e.meta;
opts.success && opts.success(model.attributes);
model.trigger("fetch");
return;
}
Ti.API.error(e);
opts.error && opts.error(e.error && e.message || e);
});
break;
}
}
function processACSUsers(model, method, options) {
switch (method) {
case "update":
var params = model.toJSON();
Cloud.Users.update(params, function(e) {
if (e.success) {
model.meta = e.meta;
options.success && options.success(e.users[0]);
model.trigger("fetch");
} else {
Ti.API.error("Cloud.Users.update " + e.message);
options.error && options.error(e.error && e.message || e);
}
});
break;
 }