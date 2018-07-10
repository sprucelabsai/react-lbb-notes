"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = isDblTouchTap;
var dblTouchTapMaxDelay = 750;
var latestTouchTap = {
	time: 0,
	target: null
};

function isDblTouchTap(event) {
	var touchTap = {
		time: new Date().getTime(),
		target: event.currentTarget
	};
	var isFastDblTouchTap = touchTap.target === latestTouchTap.target && touchTap.time - latestTouchTap.time < dblTouchTapMaxDelay;
	latestTouchTap = touchTap;
	return isFastDblTouchTap;
}