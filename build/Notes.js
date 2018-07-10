import _regeneratorRuntime from 'babel-runtime/regenerator';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/Notes.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Dialog, Input, Button, Form, Select, BotText, ImageCropper, Tabs, TabPane, SectionHeading, Switch, Loader, List, ListItem, SubmitWrapper } from 'react-sprucebot';

import isDblTouchTap from './isDblTouchTap';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styled from 'styled-components';
import * as _ from 'lodash';
var ImageNote = styled.img.withConfig({
	displayName: 'Notes__ImageNote',
	componentId: 'u119m2-0'
})(['width:100%;']);

var Notes = function (_Component) {
	_inherits(Notes, _Component);

	function Notes(props) {
		_classCallCheck(this, Notes);

		var _this = _possibleConstructorReturn(this, (Notes.__proto__ || Object.getPrototypeOf(Notes)).call(this, props));

		_this.state = {
			creating: false,
			notesLoading: true,
			togglingPinned: false,
			notes: [],
			pinned: [],
			errorMessage: false,
			note: {
				isPinned: false,
				isPrivate: _this.props.user.role === 'teammate',
				body: ''
			},
			uploadingImage: false,
			crop: {
				x: 20,
				y: 20,
				width: 30,
				height: 30
			}
		};

		_this.handleChange = _this.handleChange.bind(_this);
		_this.togglePinned = _this.togglePinned.bind(_this);
		return _this;
	}

	_createClass(Notes, [{
		key: 'refreshNotes',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
				var _ref2, notes, pinned;

				return _regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return this.props.actions.notes.get(this.props.user.UserId);

							case 3:
								_ref2 = _context.sent;
								notes = _ref2.notes;
								pinned = _ref2.pinned;
								_context.next = 8;
								return this.setState({
									pinned: pinned ? [pinned] : [],
									notes: notes,
									notesLoading: false,
									errorMessage: '',
									togglingPinned: false
								});

							case 8:
								_context.next = 15;
								break;

							case 10:
								_context.prev = 10;
								_context.t0 = _context['catch'](0);

								console.log('refreshNotes', _context.t0);
								_context.next = 15;
								return this.setState({
									notesLoading: false,
									errorMessage: _context.t0.friendlyReason || this.props.lang.getText('unknownError')
								});

							case 15:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 10]]);
			}));

			function refreshNotes() {
				return _ref.apply(this, arguments);
			}

			return refreshNotes;
		}()
	}, {
		key: 'componentWillMount',
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
				return _regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.prev = 0;
								_context2.next = 3;
								return injectTapEventPlugin();

							case 3:
								_context2.next = 7;
								break;

							case 5:
								_context2.prev = 5;
								_context2.t0 = _context2['catch'](0);

							case 7:
								_context2.next = 9;
								return this.refreshNotes();

							case 9:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this, [[0, 5]]);
			}));

			function componentWillMount() {
				return _ref3.apply(this, arguments);
			}

			return componentWillMount;
		}()
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {}
	}, {
		key: 'handleChange',
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(key, value) {
				return _regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.setState(function (prevState) {
									prevState.note[key] = value;
									return prevState;
								});

							case 2:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function handleChange(_x, _x2) {
				return _ref4.apply(this, arguments);
			}

			return handleChange;
		}()
	}, {
		key: 'resetNoteForm',
		value: function () {
			var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
				var _this2 = this;

				return _regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								this.setState(function (prevState) {
									prevState.note.body = '';
									prevState.note.isPinned = false;
									prevState.note.isPrivate = _this2.props.user.role === 'teammate';
									return prevState;
								});

							case 1:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function resetNoteForm() {
				return _ref5.apply(this, arguments);
			}

			return resetNoteForm;
		}()
	}, {
		key: 'handleSubmit',
		value: function () {
			var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(e) {
				var _state$note, isPinned, isPrivate, body, user, resp, prevNotes;

				return _regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								e.preventDefault();

								if (!(!this.state.note.body || this.state.creating)) {
									_context5.next = 3;
									break;
								}

								return _context5.abrupt('return');

							case 3:
								_context5.prev = 3;

								this.setState({ creating: true });
								_state$note = this.state.note, isPinned = _state$note.isPinned, isPrivate = _state$note.isPrivate, body = _state$note.body;
								user = this.props.user;
								_context5.next = 9;
								return this.props.actions.notes.create({
									userId: user.UserId,
									isPinned: isPinned,
									isPrivate: isPrivate,
									body: body
								});

							case 9:
								resp = _context5.sent;
								prevNotes = Array.from(this.state.notes);

								if (!resp.isPinned) {
									_context5.next = 15;
									break;
								}

								this.props.user.pinned = resp;
								_context5.next = 17;
								break;

							case 15:
								_context5.next = 17;
								return this.setState({ notes: [resp].concat(prevNotes) });

							case 17:
								this.refreshNotes();
								_context5.next = 20;
								return this.props.onSubmit();

							case 20:
								this.resetNoteForm();
								this.setState({ creating: false });
								_context5.next = 28;
								break;

							case 24:
								_context5.prev = 24;
								_context5.t0 = _context5['catch'](3);

								console.log('submit', _context5.t0);
								this.setState({
									errorMessage: _context5.t0.friendlyReason || this.props.lang.getText('unknownError')
								});

							case 28:
								_context5.prev = 28;
								return _context5.finish(28);

							case 30:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this, [[3, 24, 28, 30]]);
			}));

			function handleSubmit(_x3) {
				return _ref6.apply(this, arguments);
			}

			return handleSubmit;
		}()
	}, {
		key: 'togglePinned',
		value: function () {
			var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(note) {
				var user, resp;
				return _regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								_context6.prev = 0;

								if (!(note.type === 'image' || note.isPrivate)) {
									_context6.next = 4;
									break;
								}

								this.setState({
									errorMessage: this.props.lang.getText('privateAndImageWarn')
								});
								return _context6.abrupt('return');

							case 4:
								this.setState({ togglingPinned: true });
								user = this.props.user;
								_context6.next = 8;
								return this.props.actions.notes.togglePinned(note, user.UserId);

							case 8:
								resp = _context6.sent;

								if (resp.isPinned) {
									//TODO: Remove this anti pattern code
									this.props.user.pinned = resp;
								} else {
									//TODO: Remove this anti pattern code
									this.props.user.pinned = null;
								}
								_context6.next = 12;
								return this.refreshNotes();

							case 12:
								_context6.next = 17;
								break;

							case 14:
								_context6.prev = 14;
								_context6.t0 = _context6['catch'](0);

								this.setState({
									errorMessage: _context6.t0.friendlyReason || this.props.lang.getText('unknownError')
								});

							case 17:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this, [[0, 14]]);
			}));

			function togglePinned(_x4) {
				return _ref7.apply(this, arguments);
			}

			return togglePinned;
		}()
	}, {
		key: 'handlePrivateToggle',
		value: function () {
			var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(value) {
				return _regeneratorRuntime.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								if (value) {
									this.handleChange('isPinned', false);
								}
								this.handleChange('isPrivate', value);

							case 2:
							case 'end':
								return _context7.stop();
						}
					}
				}, _callee7, this);
			}));

			function handlePrivateToggle(_x5) {
				return _ref8.apply(this, arguments);
			}

			return handlePrivateToggle;
		}()
	}, {
		key: 'notesList',
		value: function notesList(notes) {
			var _this3 = this;

			return notes.map(function (note, idx) {
				return React.createElement(
					ListItem,
					{
						key: 'item-' + idx,
						onClick: function () {
							var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(e) {
								return _regeneratorRuntime.wrap(function _callee8$(_context8) {
									while (1) {
										switch (_context8.prev = _context8.next) {
											case 0:
												if (!isDblTouchTap(e)) {
													_context8.next = 3;
													break;
												}

												_context8.next = 3;
												return _this3.togglePinned(note);

											case 3:
											case 'end':
												return _context8.stop();
										}
									}
								}, _callee8, _this3);
							}));

							return function (_x6) {
								return _ref9.apply(this, arguments);
							};
						}(),
						__source: {
							fileName: _jsxFileName,
							lineNumber: 181
						}
					},
					React.createElement(
						BotText,
						{
							__source: {
								fileName: _jsxFileName,
								lineNumber: 190
							}
						},
						note.isPinned ? '📌 ' : '',
						note.isPrivate ? '🤐 ' : '',
						note.type === 'image' ? React.createElement(ImageNote, { src: note.body, __source: {
								fileName: _jsxFileName,
								lineNumber: 194
							}
						}) : React.createElement(
							'strong',
							{
								__source: {
									fileName: _jsxFileName,
									lineNumber: 196
								}
							},
							note.body
						),
						'- ',
						note.signature
					)
				);
			});
		}
	}, {
		key: 'onTakePhoto',
		value: function () {
			var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9() {
				return _regeneratorRuntime.wrap(function _callee9$(_context9) {
					while (1) {
						switch (_context9.prev = _context9.next) {
							case 0:
								if (!this.state.uploadingImage) {
									this.setState({ uploadingImage: true });
								}

							case 1:
							case 'end':
								return _context9.stop();
						}
					}
				}, _callee9, this);
			}));

			function onTakePhoto() {
				return _ref10.apply(this, arguments);
			}

			return onTakePhoto;
		}()
	}, {
		key: 'onSaveImageNote',
		value: function () {
			var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(base64ImageNote) {
				var _state$note2, isPinned, isPrivate, user;

				return _regeneratorRuntime.wrap(function _callee10$(_context10) {
					while (1) {
						switch (_context10.prev = _context10.next) {
							case 0:
								_context10.prev = 0;
								_state$note2 = this.state.note, isPinned = _state$note2.isPinned, isPrivate = _state$note2.isPrivate;
								user = this.props.user;
								_context10.next = 5;
								return this.props.actions.notes.saveNoteImage({
									userId: user.UserId,
									isPinned: isPinned,
									isPrivate: isPrivate,
									body: base64ImageNote
								});

							case 5:
								this.resetNoteForm();
								this.setState({ creating: false, uploadingImage: false });
								this.props.onSubmit();
								_context10.next = 14;
								break;

							case 10:
								_context10.prev = 10;
								_context10.t0 = _context10['catch'](0);

								console.log('onsaveimagenote', _context10.t0);
								this.setState({
									errorMessage: _context10.t0.friendlyReason || this.props.lang.getText('unknownError')
								});

							case 14:
							case 'end':
								return _context10.stop();
						}
					}
				}, _callee10, this, [[0, 10]]);
			}));

			function onSaveImageNote(_x7) {
				return _ref11.apply(this, arguments);
			}

			return onSaveImageNote;
		}()
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props = this.props,
			    lang = _props.lang,
			    auth = _props.auth,
			    config = _props.config,
			    props = _objectWithoutProperties(_props, ['lang', 'auth', 'config']);

			return React.createElement(
				'div',
				_extends({}, props, {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 237
					}
				}),
				React.createElement(
					Dialog,
					{
						show: !!this.state.errorMessage,
						onTapClose: function onTapClose() {
							_this4.setState({ errorMessage: false });
						},
						ref: function ref(_ref12) {
							return _this4.eDialog = _ref12;
						},
						__source: {
							fileName: _jsxFileName,
							lineNumber: 238
						}
					},
					React.createElement(
						'div',
						{
							__source: {
								fileName: _jsxFileName,
								lineNumber: 245
							}
						},
						React.createElement(
							BotText,
							{
								__source: {
									fileName: _jsxFileName,
									lineNumber: 246
								}
							},
							this.state.errorMessage
						),
						React.createElement(
							Button,
							{
								primary: true,
								onClick: function onClick() {
									_this4.setState({ errorMessage: '' });
								},
								type: 'button',
								__source: {
									fileName: _jsxFileName,
									lineNumber: 247
								}
							},
							lang.getText('errorCloseBtn')
						)
					)
				),
				!this.state.notesLoading && !this.state.errorMessage && this.state.pinned.length === 0 && this.state.notes.length === 0 && React.createElement(
					BotText,
					{
						__source: {
							fileName: _jsxFileName,
							lineNumber: 262
						}
					},
					lang.getText('noNotesFound')
				),
				this.state.notes && React.createElement(
					List,
					{
						__source: {
							fileName: _jsxFileName,
							lineNumber: 266
						}
					},
					this.notesList(this.state.pinned.concat(this.state.notes))
				),
				(this.state.notesLoading || this.state.togglingPinned) && React.createElement(Loader, {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 270
					}
				}),
				React.createElement(
					Form,
					{ onSubmit: function onSubmit(e) {
							return _this4.handleSubmit(e);
						}, __source: {
							fileName: _jsxFileName,
							lineNumber: 272
						}
					},
					React.createElement(
						List,
						{
							__source: {
								fileName: _jsxFileName,
								lineNumber: 273
							}
						},
						!this.state.uploadingImage && React.createElement(
							ListItem,
							{
								__source: {
									fileName: _jsxFileName,
									lineNumber: 275
								}
							},
							React.createElement(
								SectionHeading,
								{
									__source: {
										fileName: _jsxFileName,
										lineNumber: 276
									}
								},
								lang.getText('addTextNote')
							),
							React.createElement(Input, {
								multiline: true,
								placeholder: lang.getText('notePlaceholder'),
								onChange: function onChange(value, e) {
									_this4.handleChange('body', value);
								},
								value: this.state.note.body,
								__source: {
									fileName: _jsxFileName,
									lineNumber: 277
								}
							})
						),
						config.ENABLE_IMAGE_UPLOADS === 'true' && this.state.note.body === '' && React.createElement(
							ListItem,
							{ onClick: this.onTakePhoto.bind(this), __source: {
									fileName: _jsxFileName,
									lineNumber: 289
								}
							},
							React.createElement(ImageCropper, {
								crop: this.state.crop,
								uploadButtonText: lang.getText('uploadButtonText'),
								onSave: this.onSaveImageNote.bind(this),
								__source: {
									fileName: _jsxFileName,
									lineNumber: 290
								}
							})
						),
						!this.state.note.isPrivate && !this.state.uploadingImage && React.createElement(ListItem, {
							title: lang.getText('pinnedLabel'),
							subtitle: lang.getText('pinnedSubLabel'),
							rightInput: React.createElement(Switch, {
								on: this.state.note.isPinned,
								onChange: function onChange(value) {
									return _this4.handleChange('isPinned', value);
								},
								__source: {
									fileName: _jsxFileName,
									lineNumber: 303
								}
							}),
							__source: {
								fileName: _jsxFileName,
								lineNumber: 299
							}
						}),
						auth.role === 'owner' && React.createElement(ListItem, {
							title: lang.getText('privateLabel'),
							subtitle: lang.getText('privateSubLabel'),
							rightInput: React.createElement(Switch, {
								on: this.state.note.isPrivate,
								onChange: function onChange(value) {
									return _this4.handlePrivateToggle(value);
								},
								__source: {
									fileName: _jsxFileName,
									lineNumber: 315
								}
							}),
							__source: {
								fileName: _jsxFileName,
								lineNumber: 311
							}
						})
					),
					React.createElement(
						SubmitWrapper,
						{
							__source: {
								fileName: _jsxFileName,
								lineNumber: 323
							}
						},
						React.createElement(
							Button,
							{
								primary: true,
								busy: this.state.creating,
								disabled: !this.state.note.body,
								type: 'submit',
								__source: {
									fileName: _jsxFileName,
									lineNumber: 324
								}
							},
							lang.getText('saveNote')
						)
					)
				)
			);
		}
	}]);

	return Notes;
}(Component);

export default Notes;


Notes.propTypes = {
	user: PropTypes.object.isRequired, // user we are editing
	auth: PropTypes.object.isRequired,
	lang: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	config: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired
};

Notes.defaultProps = {
	onSubmit: function onSubmit() {}
};