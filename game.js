/*********************************************
 * Tululoo Game Maker v1.3.0
 *
 * Creators 
 * Zoltan Percsich
 * Vadim "YellowAfterlife" Dyachenko
 *
 * (c) SilentWorks 2011 - 2013
 * All rights reserved.
 * www.tululoo.com
 *
 * Contributors:
 * Csaba Herbut
 ********************************************/
 /* * * *
 H A C K S
 - - - - -
 tululoo-school.ru
 
 tu_nodraw(artem73)
 optimise_loop(artem73)
 fps(COSMO)
 some drawing optimization (COSMO)
 * * * */

 /* HACK: tu_nodraw {}*/tu_nodraw=false;
 
function tu_detect_audio(_type) {
	var _au = document.createElement('audio');
	return _au.canPlayType && _au.canPlayType(_type).replace(/no/, '');
}
//
var	__path__ = window.__path__ ? window.__path__ : '',
	// system variables:
	tu_gameloop = tu_canvas = tu_context = tu_room_to_go = null, tu_canvas_id = 'tululoocanvas',
	tu_canvas_css = 'background: rgb(42, 42, 42); border: 0;',
	tu_loading = tu_load_total = 0,
	var_override_ = (Object.defineProperty != undefined),
	// resources:
	tu_sprites = [], tu_audios = [], tu_backgrounds = [], tu_fonts = [], tu_scenes = [],
	// math:
	max = Math.max, min = Math.min, round = Math.round, floor = Math.floor, ceil = Math.ceil,
	sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, tan = Math.tan, rand = Math.random,
	arccos = Math.acos, arcsin = Math.asin, arctan = Math.atan, arctan2 = Math.atan2,
	tu_r2d = -180 / Math.PI, tu_d2r = Math.PI / -180, tu_2pi = Math.PI * 2,
  abs = Math.abs,
	// i/o variables:
	mouse_x = mouse_y = 0, mouse_down = mouse_pressed = mouse_released = false,
	key_down = [], key_pressed = [], key_released = [], tu_vkeys = [],
	tu_keys_pressed = [], tu_keys_released = [],
	touch_x = [], touch_y = [], touch_count = 0,
	tu_unpausekey = 27, tu_paused = false, tu_modal = null, tu_modaldraw = true,
	// i/o constants:
	vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51, vk_4 = 52, vk_5 = 53, vk_6 = 54,
	vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_a = 65, vk_add = 107, vk_alt = 18, vk_b = 66,
	vk_backspace = 8, vk_c = 67, vk_ctrl = 17, vk_d = 68, vk_decimal = 110, vk_delete = 46,
	vk_divide = 111, vk_down = 40, vk_e = 69, vk_end = 35, vk_enter = 13, vk_escape = 27,
	vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
	vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123,
	vk_g = 71, vk_h = 72, vk_home = 36, vk_f = 70, vk_i = 73, vk_insert = 45, vk_j = 74, vk_k = 75,
	vk_l = 76, vk_left = 37, vk_m = 77, vk_multiply = 106, vk_n = 78, vk_num0 = 96, vk_num1 = 97,
	vk_num2 = 98, vk_num3 = 99, vk_num4 = 100, vk_num5 = 101, vk_num6 = 102, vk_num7 = 103,
	vk_num8 = 104, vk_num9 = 105, vk_o = 79, vk_p = 80, vk_pagedown = 34, vk_pageup = 33,
	vk_pause = 19, vk_q = 81, vk_r = 82, vk_right = 39, vk_s = 83, vk_shift = 16, vk_space = 32,
	vk_subtract = 109, vk_t = 84, vk_tab = 9, vk_u = 85, vk_up = 38, vk_v = 86, vk_w = 87,
	vk_x = 88, vk_y = 89, vk_z = 90,
	// collisions:
	ct_null = 0, ct_point = 1, ct_box = 2, ct_circle = 3,
	// tiles:
	tu_tiles = [], tu_tilesi = [], tu_tilez = 256,
	// sound variables:
	tu_wav_supported = tu_detect_audio('audio/wav; codecs="1"'),
	tu_ogg_supported = tu_detect_audio('audio/ogg; codecs="vorbis"'),
	tu_mp3_supported = tu_detect_audio('audio/mpeg;'),
	// drawing:
	tu_draw_color = "rgb(0,0,0)", 
	tu_redraw, tu_redraw_auto = true,
	tu_viewport_inst = null,
	// drawing constants:
	fa_left = "left", fa_center = "center", fa_right = "right",
	fa_top = "top", fa_middle = "middle", fa_bottom = "bottom",
	// system room variables:
	tu_depth = [], tu_depthi = [], tu_depthu = [], tu_types = [], tu_persist = [],
	// public room variables:
	room_current = null,
	room_speed = 30, fps = room_speed, fpss = room_speed,
	room_background = null,
	room_width = 0, room_height = 0,
	room_background_color_show = true, room_background_color_red = 0, 
	room_background_color_green = 0, room_background_color_blue = 0,
	room_viewport_width = 0, room_viewport_height = 0,
	room_viewport_object = null,
	room_viewport_hborder = 0, room_viewport_vborder = 0,
	room_viewport_x = 0, room_viewport_y = 0,
	global = null;
// keyboard functions:
function keyboard_check(_key) { return key_down[_key]; }
function keyboard_check_pressed(_key) { return key_pressed[_key]; }
function keyboard_check_released(_key) { return key_released[_key]; }
// mouse functions:
function mouse_check() { return mouse_down; }
function mouse_check_pressed() { return mouse_pressed; }
function mouse_check_released() { return mouse_released; }
// virtual keys:
function vkey() {
	this.top = 0;
	this.left = 0;
	this.right = 0;
	this.bottom = 0;
	this.key = 0;
	this.down = false;
	this.active = true;
}
function vkey_add(_x, _y, _w, _h, _k) {
	var _v = new vkey();
	_v.left = _x;
	_v.top = _y;
	_v.right = _x + _w;
	_v.bottom = _y + _h;
	_v.width = _w;
	_v.height = _h;
	_v.key = _k;
	tu_vkeys.push(_v);
	return _v;
}
// misc:
function trace() { console.log.apply(console, arguments); }
function tu_idle() { } // left empty on purpose
// minimal math:
function sign(_value) { return _value > 0 ? 1 : _value < 0 ? -1 : 0; }
function choose() { return arguments[~~(Math.random() * arguments.length)]; }
function random(_value) { return Math.random() * _value; }
function irandom(_value) { return ~~(Math.random() * _value + 1); }
// trig functions:
function lengthdir_x(_length, _direction) { return _length * Math.cos(_direction * tu_d2r); }
function lengthdir_y(_length, _direction) { return _length * Math.sin(_direction * tu_d2r); }
function point_distance(_x1, _y1, _x2, _y2) { return Math.sqrt(Math.pow(( _x1 - _x2), 2) + Math.pow((_y1 - _y2), 2)); }
function point_direction(_x1, _y1, _x2, _y2) { return Math.atan2(_y2 - _y1, _x2 - _x1) * tu_r2d; }
function degtorad(_degree) { return _degree * tu_d2r; }
function radtodeg(_degree) { return _degree * tu_r2d; }
// sound functions:
function sound_mode(_sound, _mode) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	switch (_sound.type) {
	case "wav": if (!tu_wav_supported) return; break;
	case "ogg": if (!tu_ogg_supported) return; break;
	case "mp3": if (!tu_mp3_supported) return; break;
	}
	if (_mode != 3) {
		_sound.audio.pause();
		if (_mode != 0) {
			_sound.audio.currentTime = 0;
		} else return;
		_sound.audio.loop = _mode > 1;
	}
	_sound.audio.play();
}
function sound_play(_sound) { sound_mode(_sound, 1); }
function sound_loop(_sound) { sound_mode(_sound, 2); }
function sound_resume(_sound) { sound_mode(_sound, 3); }
function sound_stop(_sound) { sound_mode(_sound, 0); }
function sound_stop_all() { for ( var _s = 0; _s < tu_audios.length; _s++) sound_stop( tu_audios[_s] ); }
function sound_volume( _sound, _volume) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	_sound.audio.volume = _volume;
}
// draw sprite:
function draw_sprite(_sprite_index, _sub_image, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image > _sprite_index.frames.length - 1) _sub_image = 0;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset, -_sprite_index.yoffset);
	tu_context.restore();
}
function draw_sprite_part(_sprite_index, _sub_image, _left, _top, _width, _height, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], _left, _top, _width, _height, 0, 0, _width, _height);
	tu_context.restore();
}
function draw_sprite_ext(_sprite_index, _sub_image, _x, _y, _xscale, _yscale, _rotation, _alpha) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.rotate(degtorad(_rotation));
	tu_context.scale(_xscale, _yscale);
	tu_context.globalAlpha = _alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset , -_sprite_index.yoffset, _sprite_index.width, _sprite_index.height);
	tu_context.restore();
}
// draw text:
function draw_text(_x, _y, _text) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_context.globalAlpha + ")";
	tu_context.fillText( _text, _x - room_viewport_x, _y - room_viewport_y );
}
// draw shapes:
function draw_rectangle(_x1, _y1, _x2, _y2, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_context.globalAlpha + ")";
	tu_context.beginPath();
	if (_outline) tu_context.strokeRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	else tu_context.fillRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	tu_context.closePath();
}
function draw_circle(_x, _y, _r, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_context.globalAlpha + ")";
	tu_context.beginPath();
	tu_context.arc( _x - room_viewport_x, _y - room_viewport_y, _r, 0, tu_2pi, true );
	tu_context.closePath();
	!_outline ? tu_context.fill() : tu_context.stroke();
}

function draw_line(_x1, _y1, _x2, _y2) {
	tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_context.globalAlpha + ")";
	tu_context.beginPath();
	tu_context.moveTo( _x1 - room_viewport_x, _y1 - room_viewport_y );
	tu_context.lineTo( _x2 - room_viewport_x, _y2 - room_viewport_y );
	tu_context.closePath();
	tu_context.stroke();	
}
// draw settings:
function draw_set_alpha(_alpha) {
	tu_context.globalAlpha = _alpha;
}
function draw_set_color( _r, _g, _b) {
	tu_draw_color = _r + "," + _g + "," + _b;
}
function draw_set_linewidth(_width) { tu_context.lineWidth = _width; }
// draw settings - font:
function draw_set_font (_font) {
	tu_context.font = (_font.bold == 1 ? "bold" : "") + " " + (_font.italic == 1 ? "italic" : "") + " " + _font.size + "px " + _font.family;
}
function draw_set_halign(_halign) { tu_context.textAlign = _halign; }
function draw_set_valign(_valign) { tu_context.textBaseline = _valign; }
// room translations:
function room_goto(_scene) {
	tu_viewport_inst = null;
	tu_room_to_go = _scene;
}
function room_goto_next() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri + 1)] == "object") room_goto(tu_scenes[_ri + 1]);
}
function room_goto_previous() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri - 1)] == "object") room_goto(tu_scenes[_ri - 1]);
}
function room_goto_first() { room_goto(tu_scenes[0]); }
function room_goto_last() { room_goto(tu_scenes[(tu_scenes.length - 1)]); }
function room_restart() { room_goto(room_current); }
// instance functions:
function instance_create_(_x, _y, _object) {
	var o = new _object.constructor;
	o.parameters = arguments.length > 3 ? Array.prototype.slice.call(arguments, 3) : [];
	o.object_index = _object;
	o.__instance = true;
	o.xstart = o.x = _x;
	o.ystart = o.y = _y;
	o._depth = o.depthstart;
	instance_activate(o);
	return o;
}
function instance_create(_x, _y, _object) {
	var o = instance_create_.apply(this, arguments);
	o.on_creation();
	return o;
}
function instance_number(_object) {
	return instance_list(_object).length;
}
function instance_first(_object) {
	var l = instance_list(_object);
	return l.length ? l[0] : null;
}
// BBox <> BBox
function collide_bbox_bbox(l1, t1, r1, b1, l2, t2, r2, b2) {
	return !(b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2);
}
// BBox <> SpriteBox
// (left, top, right, bottom, instX, instY, scaleX, scaleY, sprite, ofsX, ofsY)
function collide_bbox_sbox(l1, t1, r1, b1, x2, y2, h2, v2, s2) {
	return
	!( b1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| t1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| r1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| l1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> BBox
function collide_sbox_point(x2, y2, h2, v2, s2, x1, y1) {
	return
	!( y1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| y1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| x1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| x1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> Circle
function collide_sbox_circle(x2, y2, h2, v2, s2, x1, y1, r1) {
	var u, v, dx, dy;
	u = x2 + h2 * (s2.collision_left - s2.xoffset);
	v = x2 + h2 * (s2.collision_right - s2.xoffset);
	dx = (x2 < u ? u : x2 > v ? v : x2) - x2;
	u = y2 + v2 * (s2.collision_top - s2.yoffset);
	v = y2 + v2 * (s2.collision_bottom - s2.yoffset);
	dy = (y2 < u ? u : y2 > v ? v : y2) - y2;
	return (dx * dx + dy * dy < r1 * r1);
}
// BBox <> Point
function collide_bbox_point(l1, t1, r1, b1, x2, y2) {
	return (x2 > l1 && x2 < r1 && y2 > t1 && y2 < b1);
}
// BBox <> Circle
function collide_bbox_circle(l1, t1, r1, b1, x2, y2, r2) {
	var dx = (x2 < l1 ? l1 : x2 > r1 ? r1 : x2) - x2, 
		dy = (y2 < t1 ? t1 : y2 > b1 ? b1 : y2) - y2;
	return (dx * dx + dy * dy < r2 * r2);
}
// Circle <> Range
function collide_circle_range(dx, dy, dr) {
	return (dx * dx + dy * dy < dr * dr);
}
// Circle <> Circle
function collide_circle_circle(x1, y1, r1, x2, y2, r2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1 + r2);
}
// Circle <> Point
function collide_circle_point(x1, y1, r1, x2, y2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1);
}
// instance collision checking:
function instance_position(_px, _py, _object, _mult) {
	var _x, _y, _ox, _oy, _sx, _sy, _o, _s, _i, _il, _r, _dx, _dy,
		_q = (_object.__instance ? [_object] : instance_list(_object)),
		_tm = (_mult) ? true : false;
	if (_tm) _ta = [];
	_il = _q.length;
	for (_i = 0; _i < _il; _i++) {
		_o = _q[_i];
		if (!_o.collision_checking) continue;
		_s = _o.sprite_index;
		if (!_s) continue;
		_x = _o.x; _sx = _o.image_xscale;
		_y = _o.y; _sy = _o.image_yscale;
		switch (_s.collision_shape)
		{
		case 0x2:
			if (_sx == 1 && _sy == 1) {
				_ox = _s.xoffset; _oy = _s.yoffset;
				if (!collide_bbox_point(_x + _s.collision_left - _ox, _y + _s.collision_top - _oy,
				_x + _s.collision_right - _ox, _y + _s.collision_bottom - _oy, _px, _py)) break;
			} else if (!collide_sbox_point(_x, _y, _sx, _sy, _s)) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		case 0x3:
			_r = _s.collision_radius * Math.max(_o.image_xscale, _o.image_yscale);
			_dx = _o.x + (_s.width / 2 - _s.xoffset) - _px;
			_dy = _o.y + (_s.height / 2 - _s.yoffset) - _py;
			if ((_dx * _dx) + (_dy * _dy) > _r * _r) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		}
	}
	return _tm ? _ta : null;
}
//
function __place_meeting__(nx, ny, what, many) {
	this.other = null;
	var i, l,
		// sprite, scale:
		ts = this.sprite_index,
		tsx, tsy, tfx, tfy, tst,
		// circle:
		tcx, tcy, tcr,
		// bbox:
		tbl, tbr, tbt, tbb,
		// instances, multiple, output, types:
		tz, tm, ct, ch, ra,
		// other:
		o, ox, oy, os, ost, osx, osy, ofx, ofy, ofr;
	if (ts == null) return false;
	tfx = ts.xoffset;
	tfy = ts.yoffset;
	tsx = this.image_xscale;
	tsy = this.image_yscale;
	tst = ts.collision_shape;
	// bbox:
	if (tst == 2) {
		tbl = nx + tsx * (ts.collision_left - tfx);
		tbr = nx + tsx * (ts.collision_right - tfx);
		tbt = ny + tsy * (ts.collision_top - tfy);
		tbb = ny + tsy * (ts.collision_bottom - tfy);
	}
	// circle:
	if (tst == 3) {
		tcr = ts.collision_radius * (tsx > tsy ? tsx : tsy);
		tcx = nx + tsx * (ts.width / 2 - tfx);
		tcy = ny + tsy * (ts.height / 2 - tfy);
	}
	//
	tz = (what.__instance ? [what] : instance_list(what));
	tm = many ? true : false;
	if (tm) ra = [];
	l = tz.length;
	for (i = 0; i < l; i++) {
		o = tz[i];
		if (!o.collision_checking) continue;
		os = o.sprite_index;
		if (os == null) continue;
		ox = o.x; osx = o.image_xscale;
		oy = o.y; osy = o.image_yscale;
		ost = os.collision_shape;
		ct = (tst << 4) | ost;
		ch = false;
		switch(ct) {
		case 0x22:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_bbox(tbl, tbt, tbr, tbb,
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy)) break;
			} else if (!collide_bbox_sbox(tbl, tbt, tbr, tbb, ox, oy, osx, osy, os)) break;
			ch = true;
			break;
		case 0x23:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_bbox_circle(tbl, tbt, tbr, tbb, ofx, ofy, ofr)) break;
			ch = true;
			break;
		case 0x32:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_circle(
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy,
				tcx, tcy, tcr)) break;
			} else if (!collide_sbox_circle(ox, oy, osx, osy, os, tcx, tcy, tcr)) break;
			ch = true;
			break;
		case 0x33:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_circle_circle(tcx, tcy, tcr, ofx, ofy, ofr)) break;
			ch = true;
			break;
		} if (!ch) continue;
		this.other = o;
		o.other = this;
		if (!tm) return (o);
		ra.push(o);
	} return ra;
}
function position_meeting(_x, _y, _object) {
	return instance_position(_x, _y, _object) != null;
}
function __move_towards_point__(_x, _y, _speed) {
	if (_speed == 0) return;
	if (this.x == _x && this.y == _y) return;
	var _dx = _x - this.x,
		_dy = _y - this.y,
		_dist = _dx * _dx + _dy * _dy;
	if (_dist < _speed * _speed) {
		this.x = _x;
		this.y = _y;
	} else {
		_dist = Math.sqrt(_dist);
		this.x += _dx * _speed / _dist;
		this.y += _dy * _speed / _dist;
	}
}

function __instance_destroy__() {
	tu_trash.push( this );
}
// web data:
function save_web_data(_name, _value) { if (window.localStorage) window.localStorage.setItem(_name, _value); }
function save_web_integer(_name, _value) { if (window.localStorage) window.localStorage.setItem("int_" + _name, _value); }
function save_web_float(_name, _value) { if (window.localStorage) window.localStorage.setItem("float_" + _name, _value); }
function save_web_string(_name, _value) { if (window.localStorage) window.localStorage.setItem("string_" + _name, _value); }
function load_web_data(_name) { if (window.localStorage) return window.localStorage.getItem(_name); }
function load_web_integer(_name) { if (window.localStorage) return parseInt(window.localStorage.getItem("int_" + _name)); }
function load_web_float(_name) { if (window.localStorage) return parseFloat(window.localStorage.getItem("float_" + _name)); }
function load_web_string(_name) { if (window.localStorage) return '' + window.localStorage.getItem("string_" + _name); }
function delete_web_data(_name) { if (window.localStorage) window.localStorage.removeItem(_name); }
function delete_web_integer(_name) { if (window.localStorage) window.localStorage.removeItem("int_" + _name); }
function delete_web_float(_name) { if (window.localStorage) window.localStorage.removeItem("float_" + _name); }
function delete_web_string(_name) { if (window.localStorage) window.localStorage.removeItem("string_" + _name); }
function clear_web_data() { if (window.localStorage) window.localStorage.clear(); }
function web_data_number() { if (window.localStorage) return window.localStorage.length; }
// misc functions:
function pause_game( _key) {
	tu_paused = true;
	tu_unpausekey = _key;
}
function modal_end() {
	if (tu_modal == null) return;
	tu_modal.instance_destroy();
	tu_modal = null;
}
function modal_start(_inst, _draw) {
	if (tu_modal != null) modal_end();
	tu_modal = _inst;
	tu_modaldraw = _draw;
}
//
function show_mouse() { tu_canvas.style.cursor = "default"; }
function hide_mouse() { tu_canvas.style.cursor = "none"; }
//
function tu_gettime() { return (new Date()).getTime(); }

/***********************************************************************
 * ENGINE
 ***********************************************************************/
 
function tu_global () { }
global = new tu_global();
//{ Events
function __keydownlistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	if (e.repeat) return;
	var keyCode = window.event ? e.which : e.keyCode;
	if (!key_down[keyCode]) {
		key_pressed[keyCode] = true;
		tu_keys_pressed.push(keyCode);
	}
	key_down[keyCode] = true;
	if (!r) e.preventDefault();
	return r;
};
function __keyuplistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	var keyCode = window.event ? e.which : e.keyCode;
	if (key_down[keyCode])
	{
		key_released[keyCode] = true;
		tu_keys_released.push(keyCode);
	}
	key_down[keyCode] = false;
	if (!r) e.preventDefault();
	return r;
};
function __touchsim__(_x, _y) {
	var r = [{}];
	r[0].pageX = tu_canvas.offsetLeft + _x;
	r[0].pageY = tu_canvas.offsetTop + _y;
	__touchvkey__(r);
}
function __mousemovelistener__(_e) {
	if (_e.pageX != undefined && _e.pageY != undefined) {
		mouse_x = _e.pageX;
		mouse_y = _e.pageY;
	} else {
		mouse_x = _e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouse_y = _e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	if (room_current != null) {
		mouse_x -= tu_canvas.offsetLeft;
		mouse_y -= tu_canvas.offsetTop;			
	}
	if (mouse_down) __touchsim__(mouse_x, mouse_y);
};
function __mousedownlistener__(_e) {
	//if (!mouse_down) mouse_pressed = true;
	//mouse_down = true;
	__touchsim__(mouse_x, mouse_y);
};
function __mouseuplistener__(_e) {
	//if (mouse_down) mouse_released = true;
	//mouse_down = false;
	__touchvkey__([]);
};
function __touchvkey__(_t) {
	var _tx = 0, _ty = 0, _tc = 0, _tl = _t.length, _vl = tu_vkeys.length, _i, _j, _c, _k,
		_dx = tu_canvas.offsetLeft, _dy = tu_canvas.offsetTop, _mx = _my = 1;
	if (tu_canvas.style.width) _mx 
	touch_x = []; touch_y = []; touch_count = 0;
	for (_i = 0; _i < _vl; _i++) tu_vkeys[_i].count = 0;
	for (_i = 0; _i < _tl; _i++) {
		_c = 0;
		for (_j = 0; _j < _vl; _j++) {
			if (!tu_vkeys[_j].active) continue;
			if (_t[_i].pageX - _dx > tu_vkeys[_j].right) continue;
			if (_t[_i].pageX - _dx < tu_vkeys[_j].left) continue;
			if (_t[_i].pageY - _dy < tu_vkeys[_j].top) continue;
			if (_t[_i].pageY - _dy > tu_vkeys[_j].bottom) continue;
			tu_vkeys[_j].count++;
			if (!tu_vkeys[_j].down) {
				tu_vkeys[_j].down = true;
				_k = tu_vkeys[_j].key;
				if (!key_down[_k]) {
					key_down[_k] = true;
					key_pressed[_k] = true;
					tu_keys_pressed.push(_k);
				}
			}
			_c++;
		}
		if (_c == 0) {
			_tx += _t[_i].pageX;
			_ty += _t[_i].pageY;
			touch_x[_tc] = _t[_i].pageX - _dx;
			touch_y[_tc] = _t[_i].pageY - _dy;
			_tc++;
		}
	}
	for (_i = 0; _i < _vl; _i++) {
		if (tu_vkeys[_i].count != 0) continue;
		if (!tu_vkeys[_i].down) continue;
		tu_vkeys[_i].down = false;
		_k = tu_vkeys[_i].key;
		if (key_down[_k]) {
			key_down[_k] = false;
			key_released[_k] = true;
			tu_keys_released.push(_k);
		}
	}
	touch_count = _tc;
	if (_tc != 0) {
		mouse_x = (_tx / _tc) - _dx;
		mouse_y = (_ty / _tc) - _dy;
		if (!mouse_down) {
			mouse_down = true;
			mouse_pressed = true;
		}
	} else if (mouse_down) {
		mouse_down = false;
		mouse_released = true;
	}
};
function __touchlistener__(e) {
	e.preventDefault();
	__touchvkey__(e.targetTouches);
};
//}
function tu_init () {
	if (document.addEventListener) {
		document.addEventListener("keydown", __keydownlistener__, false);
		document.addEventListener("keyup", __keyuplistener__, false);
		document.addEventListener("mousemove", __mousemovelistener__, false);
		document.addEventListener("mousedown", __mousedownlistener__, false);
		document.addEventListener("mouseup", __mouseuplistener__, false);
		document.addEventListener("touchstart", __touchlistener__, false);
		document.addEventListener("touchend", __touchlistener__, false);
		document.addEventListener("touchmove", __touchlistener__, false);
		document.addEventListener("touchenter", __touchlistener__, false);
		document.addEventListener("touchleave", __touchlistener__, false);
		document.addEventListener("touchcancel", __touchlistener__, false);
	} else {
		document.attachEvent("onkeydown", __keydownlistener__);
		document.attachEvent("onkeyup", __keyuplistener__);
		document.attachEvent("onmousemove", __mousemovelistener__);
		document.attachEvent("onmousedown", __mousedownlistener__);
		document.attachEvent("onmouseup", __mouseuplistener__);
	}
	// initialize keycodes
	for (var _k = 0; _k < 256; _k++) {
		key_down[_k] = key_pressed[_k] = key_released[_k] = false;
	}
}

function tu_loading_inc() { tu_loading++; tu_load_total++; }
function tu_loading_dec() { tu_loading--; }

function _$_(_id_) {
	return document.getElementById( _id_ );
}

function var_override(_what, _svar, _fget, _fset) {
	if (var_override_) {
		if (_what.hasOwnProperty(_svar)) return;
		Object.defineProperty(_what, _svar, {
			get: _fget,
			set: _fset
		});
	} else {
		if (_what.__lookupGetter__(_svar) != undefined) return;
		_what.__defineGetter__(_svar, _fget);
		_what.__defineSetter__(_svar, _fset);
	}
}

//{ Depth
function _tu_depth_find(_d) {
	var _tl = tu_depthi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_depthi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function _tu_depth_new(_d) {
	var _i = _tu_depth_find(_d), _o = [];
	tu_depth.splice(_i, 0, _o);
	tu_depthi.splice(_i, 0, _d);
	return _i;
}
function tu_depth_add(_d, _o) {
	var _t = tu_depthi.indexOf(_d);
	if (_t == -1) _t = _tu_depth_new(_d); // create array if none
	tu_depth[_t].push(_o);
}
function tu_depth_delete(_d, _o) {
	var _t = tu_depth[tu_depthi.indexOf(_d)], _ti = _t.indexOf(_o);
	if (_ti == -1) return;
	_t.splice(_ti, 1);
}
function tu_depth_update() {
	var i, l = tu_depthu.length, o;
	if (l == 0) return;
	for (i = 0; i < l; i++) {
		o = tu_depthu[i];
		if (o.instance_active && o._depth !== undefined) tu_depth_delete(o._depth, o);
		o._depth = o._depthn;
		if (o.instance_active && o._depth !== undefined) tu_depth_add(o._depth, o);
		o._depthu = false;
	}
	tu_depthu = [];
}
// Accessors:
function tu_depth_get() { return this._depth; }
function tu_depth_set(_d) {
	if (this._depth == _d) return; // don't change on depth match
	this._depthn = _d;
	if (this._depthu) return;
	this._depthu = true;
	tu_depthu.push(this);
}
//}
//{ Types
function instance_list(_o) {
	var _t = _o._object_index_;
	if (tu_types[_t] == undefined) tu_types[_t] = [];
	return tu_types[_t];
}
function tu_type_add(_d, _o) {
	instance_list(_d).push(_o);
}
function tu_type_delete(_o, _p) {
	var _d = tu_types[_p], _t = _d.indexOf(_o);
	_d.splice(_t, 1);
}
function tu_type_get() { return this._object_index; }
//}
//{ Tileset functions
function tile_layer_find(_d) {
	var _tl = tu_tilesi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_tilesi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function tile_layer_add(_d) {
	var _i = tile_layer_find(_d), _o = [];
	tu_tiles.splice(_i, 0, _o);
	tu_tilesi.splice(_i, 0, _d);
	return _o;
}
function tile(_s, _x, _y, _l, _t, _w, _h) {
	this.source = _s;
	this.x = _x;
	this.y = _y;
	this.left = _l;
	this.top = _t;
	this.width = _w;
	this.height = _h;
	this.width2 = _w;
	this.height2 = _h;
	this.sectors = [];
}
function tile_add(_b, _l, _t, _w, _h, _x, _y, _z) {
	var	_tx1 = Math.floor(_x / tu_tilez),
		_ty1 = Math.floor(_y / tu_tilez),
		_tx2 = Math.floor((_x + _w) / tu_tilez),
		_ty2 = Math.floor((_y + _h) / tu_tilez),
		_tt = new tile(_b, _x, _y, _l, _t, _w, _h),
		_tx, _ty, _ts,
		_d, _e = tu_tilesi.indexOf(_z);
	if (_e != -1) _d = tu_tiles[_e];
	else _d = tile_layer_add(_z);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_d[_tx] == null) _d[_tx] = [];
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_d[_tx][_ty] == null) _d[_tx][_ty] = [];
			_ts = _d[_tx][_ty];
			_ts.push(_tt);
			_tt.sectors.push(_ts);
		}
	}
	return _tt;
}
function tile_find(_x, _y, _w, _h, _d) {
	var _xw = _x + _w,
		_yh = _y + _h,
		_r = [],
		_tx, _ty, _ti, _tl, _ts, _tt, _ta,
		_tx1, _ty1, _tx2, _ty2;
	_ti = tu_tilesi.indexOf(_d);
	if (_ti == -1) return _r;
	_ta = tu_tiles[_ti];
	_tx1 = Math.floor(_x / tu_tilez);
	_ty1 = Math.floor(_y / tu_tilez);
	_tx2 = Math.floor((_x + _w) / tu_tilez);
	_ty2 = Math.floor((_y + _h) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_ta[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_ta[_tx][_ty] == null) continue;
			_ts = _ta[_tx][_ty];
			_tl = _ts.length;
			for (_ti = 0; _ti < _tl; _ti++) {
				_tt = _ts[_ti];
				if (_tt.x >= _xw) continue;
				if (_tt.y >= _yh) continue;
				if (_tt.x + _tt.width2 < _x) continue;
				if (_tt.y + _tt.height2 < _y) continue;
				_r.push(_tt);
			}
		}
	}
	return _r;
}
function tile_delete(_t) {
	var _ti, _tl, _ts;
	_tl = _t.sectors.length;
	for (_ti = 0; _ti < _tl; _ti++) {
		_ts = _t.sectors[_ti];
		_ts.splice(_ts.indexOf(_t), 1);
	}
}
function tile_srender(_s) {
	var _ti, _tt;
	for (_ti = 0; _ti < _s.length; _ti++) {
		if (_s[_ti] == null) continue;
		_tt = _s[_ti];
		if (_tt.source == null) continue;
		if (_tt.source.image == null) continue;
		tu_context.drawImage(_tt.source.image, _tt.left, _tt.top, _tt.width, _tt.height, _tt.x - room_viewport_x, _tt.y - room_viewport_y, _tt.width2, _tt.height2);
	}
}
function tile_lrender(_l) {
	var _tx, _ty,
		_tx1 = Math.floor(room_viewport_x / tu_tilez),
		_tx2 = Math.floor((room_viewport_x + room_viewport_width) / tu_tilez),
		_ty1 = Math.floor(room_viewport_y / tu_tilez),
		_ty2 = Math.floor((room_viewport_y + room_viewport_height) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_l[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_l[_tx][_ty] == null) continue;
			tile_srender(_l[_tx][_ty]);
		}
	}
}
//} /Tileset functions
//{ Some events & accessors
function tu_id_get() { return this; }
function tu_parent_get() { return this._parent_index; }
function image_single_get() { return (this.image_speed == 0 ? this.image_index : -1); }
function image_single_set(_o) { this.image_speed = 0; this.image_index = _o; }
// Handles object size & sprite updates. Should get rid of this in favor of accessors.
function __handle_sprite__(_object_) {
	if (_object_.sprite_index == null) return;
	_object_.sprite_width = _object_.sprite_index.width;
	_object_.sprite_height = _object_.sprite_index.height;
	_object_.sprite_xoffset = _object_.sprite_index.xoffset;
	_object_.sprite_yoffset = _object_.sprite_index.yoffset;
	_object_.image_number = _object_.sprite_index.frames.length;
	_object_.image_index += _object_.image_speed;
	if (_object_.image_index >= _object_.image_number) _object_.image_index = _object_.image_index % _object_.image_number;
	if (_object_.image_index < 0) _object_.image_index = _object_.image_number - 1 + (_object_.image_index % _object_.image_number);
}
function __draw_self__() {
	draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
//}
//{ Inherited event lookup functions.
// There's also a way to do this with much shorter code.
function on_creation_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_creation !== on_creation_i)
	return o.on_creation.apply(this);
}
function on_destroy_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_destroy !== on_destroy_i)
	return o.on_destroy.apply(this);
}
function on_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_step !== on_step_i)
	return o.on_step.apply(this);
}
function on_end_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_end_step !== on_end_step_i)
	return o.on_end_step.apply(this);
}
function on_draw_d() {
	__handle_sprite__(this);
	__draw_self__.apply(this);
}
function on_draw_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_draw !== on_draw_i)
	return o.on_draw.apply(this);
	on_draw_d.apply(this);
}
on_collision_i = tu_idle;
/*
function on_collision_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_collision !== on_collision_i)
	return o.on_collision.apply(this);
} */
function on_animationend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_animationend !== on_animationend_i)
	return o.on_animationend.apply(this);
}
function on_roomstart_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomstart !== on_roomstart_i)
	return o.on_roomstart.apply(this);
}
function on_roomend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomend !== on_roomend_i)
	return o.on_roomend.apply(this);
}
//} /Inherited event handles

// instance_init(this, object_index, parent_index, visible, depth, sprite, collideable, inner index)
// Universal object constructor:
function __instance_init__(_this, _oi, _p, _v, _d, _si, _c, _io) {
	_this._object_index = undefined;
	_this._object_index_ = _io;
	_this._depth = undefined;
	_this._depthn = undefined;
	_this._depthu = false;
	var_override(_this, 'depth', tu_depth_get, tu_depth_set );
	var_override(_this, 'object_index', tu_type_get, tu_idle );
	var_override(_this, 'image_single', image_single_get, image_single_set );
	var_override(_this, 'id', tu_id_get, tu_idle);
	var_override(_this, 'parent', tu_parent_get, tu_idle);
	_this._object_index = _oi;
	_this._parent_index = _p;
	_this.xstart = _this.xprevious = _this.x = 0;
	_this.ystart = _this.yprevious = _this.y = 0;
	_this.depthstart = _d;
	_this.image_angle = _this.direction = 0;
	_this.visible = _v;
	_this.image_yscale = _this.image_xscale = 1;
	_this.image_alpha = 1;
	_this.image_index = 0;
	_this.image_speed = 1;
	_this.sprite_index = _si;
	_this.speed = 0;
	_this.other = null;
	_this.collision_checking = _c;
	_this.persistent = false;
	_this.instance_active = false;
	// Instance-specific functions:
	_this.place_meeting = __place_meeting__;
	_this.move_towards_point = __move_towards_point__;
	_this.instance_destroy = __instance_destroy__;
	_this.draw_self = __draw_self__;
}
// Universal sprite constructor:
function __sprite_init__(_this, _name, _width, _height, _xofs, _yofs, _cshape, _crad, _cl, _cr, _ct, _cb, _frames) {
	_this.frames = [];
	var _frame, _fi;
	for (_fi = 0; _fi < _frames.length; _fi++) {
		_frame = new Image();
		if (_frames[_fi]) {
			tu_loading_inc();
			_frame.onload = tu_loading_dec;
			_frame.onerror = tu_loading_dec;
			_frame.src = _frames[_fi];
		}
		_this.frames.push(_frame);
	}
	_this.width = _width;
	_this.height = _height;
	_this.xoffset = _xofs;
	_this.yoffset = _yofs;
	_this.collision_shape = (_cshape == 'Circle' ? ct_circle : _cshape == 'Box' ? ct_box : 0);
	_this.collision_radius = _crad;
	_this.collision_left = _cl;
	_this.collision_right = _cr;
	_this.collision_top = _ct;
	_this.collision_bottom = _cb;
	tu_sprites.push(_this);
}
// Universal audio constructor:
function __audio_init__(_this, _name, _wav, _mp3, _ogg) {
	var _src = '';
	_this.type = 'none';
	if (tu_ogg_supported && (_ogg != '')) {
		_this.type = 'ogg';
		_src = _ogg;
	} else if (tu_mp3_supported && (_mp3 != '')) {
		_this.type = 'mp3';
		_src = _mp3;
	} else if (tu_wav_supported && (_wav != '')) {
		_this.type = 'wav';
		_src = _wav;
	}
	if (_src != '') {
		_this.audio = document.createElement('audio');
		_this.audio.setAttribute('src', _src);
	}
	tu_audios.push(_this);
}

function __background_init__(_this, _name, _file) {
	_this.image = new Image();
	tu_loading_inc();
	_this.image.onload = tu_loading_dec;
	_this.image.onerror = tu_loading_dec;
	_this.image.src = _file;
	tu_backgrounds.push(_this);
}

function __font_init__(_this, _name, _family, _size, _bold, _italic) {
	_this.family = _family;
	_this.size = _size;
	_this.bold = _bold;
	_this.italic = _italic;
	tu_fonts.push(_this);
}

// (this, name, width, height, speed, back. red, back. green, back. blue, background, back. tilex, back. tiley, back. stretch, view width, view height, view object, view hborder, view vborder)
function __room_start__(_this, _name, _rw, _rh, _rs, _br, _bg, _bb, _bi, _bx, _by, _bs, _vw, _vh, _vo, _vx, _vy) {
	_$_('tululoogame').innerHTML = "<canvas id='" + tu_canvas_id + "' width='" + _vw + "' height='" + _vh + "' style='" + tu_canvas_css + "'></canvas>";
	tu_canvas = _$_(tu_canvas_id);
	tu_context = tu_canvas.getContext('2d');
	room_current = _this;
	// generic:
	room_speed = _rs;
	room_width = _rw;
	room_height = _rh;
	// background color:
	room_background_color_red = _br;
	room_background_color_green = _bg;
	room_background_color_blue = _bb;
	// background image:
	room_background = _bi;
	room_background_x = 0;
	room_background_y = 0;
	room_background_tile_x = _bx;
	room_background_tile_y = _by;
	room_background_tile_stretch = _bs;
	// view:
	room_viewport_width = _vw;
	room_viewport_height = _vh;
	room_viewport_x = room_viewport_y = 0;
	room_viewport_object = _vo;
	room_viewport_hborder = _vx;
	room_viewport_vborder = _vy;
	// tiles:
	var _l, _b, _t, _i, _il, _tls_, i, l, d, o, a;
	_tls_ = _this.tiles; tu_tiles = []; tu_tilesi = [];
	for (_l = 0; _l < _tls_.length; _l++)
	for (_b = 1; _b < _tls_[_l].length; _b++)
	for (_t = 1; _t < _tls_[_l][_b].length; _t++)
	tile_add(_tls_[_l][_b][0], _tls_[_l][_b][_t][0], _tls_[_l][_b][_t][1], _tls_[_l][_b][_t][2], _tls_[_l][_b][_t][3], _tls_[_l][_b][_t][4], _tls_[_l][_b][_t][5], _tls_[_l][0]);
	// objects:
	tu_depth = []; tu_depthi = []; tu_depthu = []; tu_types = [];
	a = _this.objects;
	l = a.length;
	for (i = 0; i < l; i++) {
		d = a[i];
		d = d[0]; // temp.fix for rc2
		if (d.o === undefined) continue;
		o = instance_create_(d.x, d.y, d.o);
		if (d.s !== undefined) o.sprite_index = d.s;
		if (d.d !== undefined) o.direction = d.d;
		if (d.a !== undefined) o.image_angle = d.a;
		if (d.u !== undefined) o.image_xscale = d.u;
		if (d.v !== undefined) o.image_yscale = d.v;
		if (d.c !== undefined) d.c.apply(o);
	}
	// persistent objects:
	_l = tu_persist.length
	for (_t = 0; _t < _l; _t++) instance_activate(tu_persist[_t]);
	instance_foreach(function(o) {
		if (tu_persist.indexOf(o) != -1) return;
		o.on_creation();
	});
	tu_persist = [];
	//
	instance_foreach(function(o) {
		o.on_roomstart();
	});
}

function tu_preloader() {
	var _w = Math.min(400, (tu_canvas.width * 0.6) >> 0), _h = 16,
		_x = (tu_canvas.width - _w) >> 1, _y = (tu_canvas.height - _h) >> 1,
		_p = (tu_load_total - tu_loading) / tu_load_total,
		_s = "Loading resources: " + (tu_load_total - tu_loading) + "/" + (tu_load_total);
	tu_canvas.width = tu_canvas.width;
	tu_canvas.height = tu_canvas.height;
	tu_canvas.style.backgroundColor = "rgb(42, 42, 42)";
	tu_context.font = "italic 12px Verdana";
	tu_context.textAlign = "left";
	tu_context.textBaseline = "bottom";
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(192, 192, 192, 1)";
	tu_context.fillRect(_x - 1, _y - 1, _w + 2, _h + 2);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(0, 0, 0, 1)";
	tu_context.fillRect(_x, _y, _w, _h);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(255, 255, 255, 1)";
	tu_context.fillRect(_x + 2, _y + 2, (_w - 4) * _p, _h - 4);
	tu_context.fillText(_s, _x, _y - 2);
}

function tu_render_back() {
	if (room_background == null) return;
	if (room_background_tile_stretch) {
		tu_context.drawImage(room_background, 0 - room_viewport_x, 0 - room_viewport_y, room_width, room_height);
		return;
	}
	var _bw, _bh, _bx, _by, _vx, _vy, _vw, _vh, _x1, _x2, _y1, _y2, _ht, _vt;
	_bw = room_background.width;
	_bh = room_background.height;
	_bx = room_background_x;
	if (room_background_tile_x) { _bx = _bx < 0 ? _bw - _bx % _bw : _bx % _bw; }
	_by = room_background_y;
	if (room_background_tile_y) { _bx = _by < 0 ? _bh - _by % _bh : _by % _bh; }
	//
	_vx = room_viewport_x;
	_vy = room_viewport_y;
	_vw = room_viewport_width;
	_vh = room_viewport_height;
	//
	_x1 = room_background_tile_x ? Math.floor(_vx / _bw) * _bw - _bx : -_bx;
	_x2 = room_background_tile_x ? Math.floor((_vx + _vw + _bw) / _bw) * _bw : _x1 + _bw;
	_y1 = room_background_tile_y ? Math.floor(_vy / _bh) * _bh - _by : -_by;
	_y2 = room_background_tile_y ? Math.floor((_vy + _vh + _bh) / _bh) * _bh : _y1 + _bh;
	for (_ht = _x1; _ht < _x2; _ht += _bw)
	for (_vt = _y1; _vt < _y2; _vt += _bh)
	tu_context.drawImage(room_background, _ht - _vx, _vt - _vy);
}
// @1.2.6
function instance_activate(_i) {
	if (_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_add(o, _i);
	//tu_type_add(_i._object_index, _i);
	//if (_i.parent != null) tu_type_add(_i.parent, _i);
	tu_depth_add(_i._depth, _i);
	_i.instance_active = true;
}
// @1.2.6
function instance_deactivate(_i) {
	if (!_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_delete(o._object_index_, _i);
	//tu_type_delete(_i, _i._object_index_);
	//if (_i.parent != null) tu_type_delete(_i, _i.parent._object_index_);
	tu_depth_delete(_i._depth, _i);
	_i.instance_active = false;
}
// @1.2.6 Performs function for all instances
function instance_foreach(_function) {
	var _d, _l, _o;
	for (_d in tu_depth) {
		_l = tu_depth[_d];
		for (_o = 0; _o < _l.length; _o++) _function(_l[_o]);
	}
}
// @1.2.6 Performs function for all instances on specific depth
function instance_fordepth(_depth, _function) {
	var _o, _d = tu_depthc[_depth], _l;
	if (_d == null) return;
	_l = _d.length;
	for (_o = 0; _o < _l; _o++) _function(_d[_o]);
}
// @1.2.6 Actions performed on room switch
function tu_room_switchto_(_o) {
	_o.on_roomend();
	if (!_o.persistent) return;
	tu_persist.push(_o);
	instance_deactivate(_o);
}
function tu_room_switchto(_dest) {
	tu_persist = [];
	instance_foreach(tu_room_switchto_);
	room_current = _dest;
	tu_room_to_go = null;
	room_current.start();
}
// @1.0.0 Global step event
function tu_step() {
	// object step events:
	tu_trash = [];
	var tu_deptho, tu_depthl, _obj_, _objd_, _h, _v;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			// is viewport object?
			if (room_viewport_object != null && tu_viewport_inst == null && (_obj_.object_index == room_viewport_object || _obj_.parent == room_viewport_object)) {
				tu_viewport_inst = _obj_;
			}
			// step events:
			_obj_.on_step();
			// move object:
			if (_obj_.speed != 0) {
				_objd_ = _obj_.direction * tu_d2r;
				_obj_.x += _obj_.speed * Math.cos(_objd_);
				_obj_.y += _obj_.speed * Math.sin(_objd_);
			}
			// post-step events:
			/* _obj_.on_collision(); */
			_obj_.on_end_step();
			// post:
			_obj_.xprevious = _obj_.x;
			_obj_.yprevious = _obj_.y;
		}
	}
	// follow object
	if (tu_viewport_inst != null) {
		_h = min(room_viewport_hborder, room_viewport_width / 2);
		_v = min(room_viewport_vborder, room_viewport_height / 2);
		// hborder:
		if (tu_viewport_inst.x < room_viewport_x + _h) room_viewport_x = tu_viewport_inst.x - _h;
		if (tu_viewport_inst.x > room_viewport_x + room_viewport_width - _h) room_viewport_x = tu_viewport_inst.x - room_viewport_width + _h;
		// vborder:
		if (tu_viewport_inst.y < room_viewport_y + _v) room_viewport_y = tu_viewport_inst.y - _v;
		if (tu_viewport_inst.y > room_viewport_y + room_viewport_height - _v) room_viewport_y = tu_viewport_inst.y - room_viewport_height + _v;
		// limits:
		room_viewport_x = Math.max(0, Math.min(room_viewport_x, room_width - room_viewport_width)) >> 0;
		room_viewport_y = Math.max(0, Math.min(room_viewport_y, room_height - room_viewport_height)) >> 0;
	}
}

function tu_draw() {
	// clear canvas:
	if (room_background_color_show) {
		tu_canvas.width = tu_canvas.width;
		tu_canvas.height = tu_canvas.height;
		// set background color:
		tu_canvas.style.backgroundColor = "rgb(" + room_background_color_red + "," + room_background_color_green + "," + room_background_color_blue + ")";
	}
	tu_render_back();
	tile_layer_last = 0;
	var tu_depthc, tu_depthv, tu_deptho, tu_depthl, _obj_;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthv = tu_depthi[tu_depthd];
		for (; tu_tilesi[tile_layer_last] >= tu_depthv && tile_layer_last < tu_tiles.length; tile_layer_last++)
		{
			tile_lrender(tu_tiles[tile_layer_last]);
		}
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			if (_obj_.visible) _obj_.on_draw();
			_obj_.on_animationend();
		}
	}
	// render remaining tile layers:
	for (; tile_layer_last < tu_tiles.length; tile_layer_last++) {
		tile_lrender(tu_tiles[tile_layer_last]);
	}
}

function tu_prestep() {
	// clear mouse states and keypressed / keyrelesed statuses
	mouse_pressed = false;
	mouse_released = false;
	var _k, _r, _obj_;
	for (_k = 0; _k < tu_keys_pressed.length; _k++) key_pressed[tu_keys_pressed[_k]] = false;
	for (_k = 0; _k < tu_keys_released.length; _k++) key_released[tu_keys_released[_k]] = false;
	tu_keys_pressed = [];
	tu_keys_released = [];
	// remove objects from destroy stack
	for (_r = 0; _r < tu_trash.length; _r++) {
		_obj_ = tu_trash[_r];
		if (tu_modal == _obj_) tu_modal = null;
		_obj_.depth = undefined;
		tu_type_delete(_obj_, _obj_._object_index_);
		if (_obj_.parent != null) tu_type_delete(_obj_, _obj_.parent._object_index_);
		_obj_.on_destroy();
	}
}

function tu_loop() {
	// continue game with the UN-Pause key
	if (tu_paused && keyboard_check_pressed(tu_unpausekey)) tu_paused = false;
	//
	if (tu_room_to_go != null && tu_canvas == null) tu_room_switchto(tu_room_to_go);
	// render game:
	if (tu_loading == 0 && tu_canvas != null && !tu_paused) {
		// start next room, if any:
		if (tu_room_to_go != null) tu_room_switchto(tu_room_to_go);
		if (tu_modal != null) {
			tu_modal.on_step();
			if (tu_modal != null) tu_modal.on_end_step();
		} else tu_step();
		tu_depth_update();
		if(tu_nodraw)tu_nodraw=false;else{
			if (tu_modal == null || tu_modaldraw) tu_draw();
			else tu_modal.on_draw();
		}
		tu_depth_update();
		tu_prestep();
		tu_depth_update();
	} else if (tu_loading > 0) tu_preloader();
	// repeat
	setTimeout(tu_gameloop, Math.round(1000/room_speed));
	fpss ++;
}
tu_init();

/***********************************************************************
 * EXTENSIONS
 ***********************************************************************/
/* Alarms by YellowAfterlife */

function alarm_nullfunction() { }
function alarm_init(_o, _c)
{
	if (_c == undefined) _c = 8;
	_o.alarms = _c;
	_o.alarm = [];
	_o.alarm_act = [];
	for (var _i = 0; _i < _c; _i++)
	{
		_o.alarm[_i] = -1;
		_o.alarm_act[_i] = alarm_nullfunction;
	}
	_o.alarm_step = _alarm_step;
}
function _alarm_step()
{
	for (var _i = 0; _i < this.alarms; _i++)
	{
		if (this.alarm[_i] == -1) continue;
		this.alarm[_i]--;
		if (this.alarm[_i] <= 0)
		{
			this.alarm[_i] = -1;
			this.alarm_act[_i].call(this);
		}
	}
}






/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __spr_body() { 
__sprite_init__(this, spr_body, 512, 800, 265, 375, 'Box', 256, 72, 384, 512, 800, ['img/spr_body_0.png','img/spr_body_1.png','img/spr_body_2.png','img/spr_body_3.png','img/spr_body_4.png','img/spr_body_5.png','img/spr_body_6.png','img/spr_body_7.png','img/spr_body_8.png','img/spr_body_9.png']);
}; var spr_body = new __spr_body();

function __spr_armf() { 
__sprite_init__(this, spr_armf, 279, 265, 80, 88, 'Box', 139, 0, 279, 0, 265, ['img/spr_armf_0.png']);
}; var spr_armf = new __spr_armf();

function __spr_armb() { 
__sprite_init__(this, spr_armb, 279, 265, 199, 177, 'Box', 139, 0, 279, 0, 265, ['img/spr_armb_0.png']);
}; var spr_armb = new __spr_armb();

function __spr_whale() { 
__sprite_init__(this, spr_whale, 640, 376, 160, 64, 'Box', 320, 160, 512, 64, 65, ['img/spr_whale_0.png','img/spr_whale_1.png','img/spr_whale_2.png','img/spr_whale_3.png','img/spr_whale_4.png','img/spr_whale_5.png','img/spr_whale_6.png','img/spr_whale_7.png','img/spr_whale_8.png','img/spr_whale_9.png','img/spr_whale_10.png','img/spr_whale_11.png','img/spr_whale_12.png','img/spr_whale_13.png']);
}; var spr_whale = new __spr_whale();

function __spr_water() { 
__sprite_init__(this, spr_water, 800, 480, 0, 0, 'Box', 400, 0, 800, 0, 480, ['img/spr_water_0.png']);
}; var spr_water = new __spr_water();

function __spr_clouds() { 
__sprite_init__(this, spr_clouds, 480, 240, 240, 120, 'Box', 240, 0, 480, 0, 240, ['img/spr_clouds_0.png','img/spr_clouds_1.png','img/spr_clouds_2.png','img/spr_clouds_3.png']);
}; var spr_clouds = new __spr_clouds();

function __spr_food() { 
__sprite_init__(this, spr_food, 80, 80, 40, 40, 'Circle', 20, 0, 80, 0, 80, ['img/spr_food_0.png','img/spr_food_1.png','img/spr_food_2.png']);
}; var spr_food = new __spr_food();

function __spr_stache() { 
__sprite_init__(this, spr_stache, 640, 376, 160, 64, 'Box', 320, 160, 512, 64, 65, ['img/spr_stache_0.png','img/spr_stache_1.png','img/spr_stache_2.png','img/spr_stache_3.png','img/spr_stache_4.png','img/spr_stache_5.png','img/spr_stache_6.png','img/spr_stache_7.png','img/spr_stache_8.png','img/spr_stache_9.png','img/spr_stache_10.png','img/spr_stache_11.png','img/spr_stache_12.png','img/spr_stache_13.png']);
}; var spr_stache = new __spr_stache();

function __spr_saddle() { 
__sprite_init__(this, spr_saddle, 640, 376, 160, 64, 'Box', 320, 160, 512, 64, 65, ['img/spr_saddle_0.png','img/spr_saddle_1.png','img/spr_saddle_2.png','img/spr_saddle_3.png','img/spr_saddle_4.png','img/spr_saddle_5.png','img/spr_saddle_6.png','img/spr_saddle_7.png','img/spr_saddle_8.png','img/spr_saddle_9.png','img/spr_saddle_10.png','img/spr_saddle_11.png','img/spr_saddle_12.png','img/spr_saddle_13.png']);
}; var spr_saddle = new __spr_saddle();

function __spr_shark() { 
__sprite_init__(this, spr_shark, 640, 440, 160, 128, 'Box', 320, 160, 512, 128, 129, ['img/spr_shark_0.png','img/spr_shark_1.png','img/spr_shark_2.png','img/spr_shark_3.png','img/spr_shark_4.png','img/spr_shark_5.png','img/spr_shark_6.png','img/spr_shark_7.png','img/spr_shark_8.png','img/spr_shark_9.png','img/spr_shark_10.png','img/spr_shark_11.png','img/spr_shark_12.png','img/spr_shark_13.png']);
}; var spr_shark = new __spr_shark();

function __spr_dolphin() { 
__sprite_init__(this, spr_dolphin, 640, 376, 160, 64, 'Box', 320, 160, 512, 64, 65, ['img/spr_dolphin_0.png','img/spr_dolphin_1.png','img/spr_dolphin_2.png','img/spr_dolphin_3.png','img/spr_dolphin_4.png','img/spr_dolphin_5.png','img/spr_dolphin_6.png','img/spr_dolphin_7.png','img/spr_dolphin_8.png','img/spr_dolphin_9.png','img/spr_dolphin_10.png','img/spr_dolphin_11.png','img/spr_dolphin_12.png','img/spr_dolphin_13.png']);
}; var spr_dolphin = new __spr_dolphin();

function __spr_jake() { 
__sprite_init__(this, spr_jake, 640, 376, 160, 64, 'Box', 320, 160, 512, 64, 65, ['img/spr_jake_0.png','img/spr_jake_1.png','img/spr_jake_2.png','img/spr_jake_3.png','img/spr_jake_4.png','img/spr_jake_5.png','img/spr_jake_6.png','img/spr_jake_7.png','img/spr_jake_8.png','img/spr_jake_9.png','img/spr_jake_10.png','img/spr_jake_11.png','img/spr_jake_12.png','img/spr_jake_13.png']);
}; var spr_jake = new __spr_jake();

function __spr_killer() { 
__sprite_init__(this, spr_killer, 640, 376, 160, 64, 'Box', 320, 160, 512, 64, 65, ['img/spr_killer_0.png','img/spr_killer_1.png','img/spr_killer_2.png','img/spr_killer_3.png','img/spr_killer_4.png','img/spr_killer_5.png','img/spr_killer_6.png','img/spr_killer_7.png','img/spr_killer_8.png','img/spr_killer_9.png','img/spr_killer_10.png','img/spr_killer_11.png','img/spr_killer_12.png','img/spr_killer_13.png']);
}; var spr_killer = new __spr_killer();

function __spr_flowers() { 
__sprite_init__(this, spr_flowers, 171, 240, 80, 180, 'Box', 85, 48, 128, 180, 181, ['img/spr_flowers_0.png']);
}; var spr_flowers = new __spr_flowers();

function __spr_tardis() { 
__sprite_init__(this, spr_tardis, 401, 380, 96, 72, 'Box', 200, 96, 272, 72, 73, ['img/spr_tardis_0.png','img/spr_tardis_1.png','img/spr_tardis_2.png','img/spr_tardis_3.png','img/spr_tardis_4.png']);
}; var spr_tardis = new __spr_tardis();

function __spr_bison() { 
__sprite_init__(this, spr_bison, 640, 440, 160, 128, 'Box', 320, 160, 512, 128, 129, ['img/spr_bison_0.png','img/spr_bison_1.png','img/spr_bison_2.png','img/spr_bison_3.png','img/spr_bison_4.png','img/spr_bison_5.png','img/spr_bison_6.png','img/spr_bison_7.png','img/spr_bison_8.png','img/spr_bison_9.png','img/spr_bison_10.png','img/spr_bison_11.png','img/spr_bison_12.png','img/spr_bison_13.png']);
}; var spr_bison = new __spr_bison();

function __spr_counter() { 
__sprite_init__(this, spr_counter, 192, 64, 96, 0, 'Box', 96, 0, 192, 0, 64, ['img/spr_counter_0.png']);
}; var spr_counter = new __spr_counter();

function __spr_counted() { 
__sprite_init__(this, spr_counted, 192, 64, 96, 0, 'Box', 96, 0, 192, 0, 64, ['img/spr_counted_0.png','img/spr_counted_1.png']);
}; var spr_counted = new __spr_counted();

function __spr_intro() { 
__sprite_init__(this, spr_intro, 640, 320, 320, 160, 'Box', 320, 0, 640, 0, 320, ['img/spr_intro_0.png','img/spr_intro_1.png']);
}; var spr_intro = new __spr_intro();

function __spr_but() { 
__sprite_init__(this, spr_but, 320, 213, 160, 106, 'Box', 160, 32, 288, 0, 213, ['img/spr_but_0.png','img/spr_but_1.png']);
}; var spr_but = new __spr_but();

function __spr_mg() { 
__sprite_init__(this, spr_mg, 320, 213, 160, 106, 'Box', 160, 0, 320, 0, 213, ['img/spr_mg_0.png','img/spr_mg_1.png']);
}; var spr_mg = new __spr_mg();

function __spr_init() { 
__sprite_init__(this, spr_init, 800, 480, 0, 0, 'Box', 400, 0, 800, 0, 480, ['img/spr_init_0.png']);
}; var spr_init = new __spr_init();

function __spr_title() { 
__sprite_init__(this, spr_title, 800, 480, 0, 0, 'Box', 400, 0, 800, 0, 480, ['img/spr_title_0.png']);
}; var spr_title = new __spr_title();

function __spr_cursor() { 
__sprite_init__(this, spr_cursor, 240, 240, 120, 120, 'Box', 120, 0, 240, 0, 240, ['img/spr_cursor_0.png','img/spr_cursor_1.png']);
}; var spr_cursor = new __spr_cursor();

function __spr_device() { 
__sprite_init__(this, spr_device, 240, 240, 120, 120, 'Box', 120, 0, 240, 0, 240, ['img/spr_device_0.png','img/spr_device_1.png','img/spr_device_2.png']);
}; var spr_device = new __spr_device();

function __spr_jump() { 
__sprite_init__(this, spr_jump, 240, 240, 120, 120, 'Box', 120, 0, 240, 0, 240, ['img/spr_jump_0.png','img/spr_jump_1.png']);
}; var spr_jump = new __spr_jump();

function __spr_jump4() { 
__sprite_init__(this, spr_jump4, 800, 480, 0, 0, 'Box', 400, 0, 800, 0, 480, ['img/spr_jump4_0.png']);
}; var spr_jump4 = new __spr_jump4();

function __spr_lines_back() { 
__sprite_init__(this, spr_lines_back, 800, 480, 0, 0, 'Box', 400, 0, 800, 0, 480, ['img/spr_lines_back_0.png','img/spr_lines_back_1.png','img/spr_lines_back_2.png','img/spr_lines_back_3.png']);
}; var spr_lines_back = new __spr_lines_back();

function __spr_lines_front() { 
__sprite_init__(this, spr_lines_front, 800, 480, 0, 0, 'Box', 400, 0, 800, 0, 480, ['img/spr_lines_front_0.png','img/spr_lines_front_1.png','img/spr_lines_front_2.png','img/spr_lines_front_3.png']);
}; var spr_lines_front = new __spr_lines_front();

function __spr_d3d() { 
__sprite_init__(this, spr_d3d, 640, 376, 160, 64, 'Box', 320, 160, 512, 64, 65, ['img/spr_d3d_0.png','img/spr_d3d_1.png','img/spr_d3d_2.png','img/spr_d3d_3.png','img/spr_d3d_4.png','img/spr_d3d_5.png','img/spr_d3d_6.png','img/spr_d3d_7.png','img/spr_d3d_8.png','img/spr_d3d_9.png','img/spr_d3d_10.png','img/spr_d3d_11.png','img/spr_d3d_12.png','img/spr_d3d_13.png']);
}; var spr_d3d = new __spr_d3d();

function __spr_tentacles() { 
__sprite_init__(this, spr_tentacles, 1122, 1122, 561, 561, 'Box', 561, 0, 1122, 0, 1122, ['img/spr_tentacles_0.png']);
}; var spr_tentacles = new __spr_tentacles();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/
function __sound_bite1() { 
__audio_init__(this, sound_bite1, '', '', 'aud/80550__ggctuk__comic-bite-1.ogg');
}; var sound_bite1 = new __sound_bite1();

function __sound_bite2() { 
__audio_init__(this, sound_bite2, '', '', 'aud/80551__ggctuk__comic-bite-2.ogg');
}; var sound_bite2 = new __sound_bite2();

function __sound_trophy() { 
__audio_init__(this, sound_trophy, '', '', 'aud/88449__davidou__baleines.ogg');
}; var sound_trophy = new __sound_trophy();

function __sound_count() { 
__audio_init__(this, sound_count, '', '', 'aud/160603__mallement__jump-landing-in-snow01.ogg');
}; var sound_count = new __sound_count();

function __sound_jump() { 
__audio_init__(this, sound_jump, '', '', 'aud/172205__fins__jumping.ogg');
}; var sound_jump = new __sound_jump();

function __sound_gameover() { 
__audio_init__(this, sound_gameover, '', '', 'aud/173859__jivatma07__j1game-over-mono.ogg');
}; var sound_gameover = new __sound_gameover();

function __sound_ding() { 
__audio_init__(this, sound_ding, '', '', 'aud/66876__hihirex__glass-ding.ogg');
}; var sound_ding = new __sound_ding();

function __sound_ding1() { 
__audio_init__(this, sound_ding1, '', '', 'aud/127149__daphne-in-wonderland__ding.ogg');
}; var sound_ding1 = new __sound_ding1();

function __sound_ding2() { 
__audio_init__(this, sound_ding2, '', '', 'aud/144944__adam-n__ding.ogg');
}; var sound_ding2 = new __sound_ding2();

function __music_low() { 
__audio_init__(this, music_low, '', '', 'aud/music_low.ogg');
}; var music_low = new __music_low();



/***********************************************************************
 * MUSICS
 ***********************************************************************/


/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/


/***********************************************************************
 * FONTS
 ***********************************************************************/
function __font1() { 
__font_init__(this, font1, 'Courier', 64, 1, 0)}; var font1 = new __font1();



/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __obj_body() {
__instance_init__(this, obj_body, null, 1, 5, spr_body, 1, 0);
this.on_creation = function() {
with(this) {
this.image_xscale = 0.125;
this.jump = 0;
alarm_init(this);
alarm_act[0] = function() {
	this.jump = 3;
};
alarm[0] = -1;
this.acc = 1;
this.food = 0;
this.lose = 0;
global.pot = 0;
global.pot1 = 0;
global.pot2 = 0;
global.pot3 = 0;
global.pot4 = 0;
global.start = 0;
this.image_alpha = 0;
sound_play(sound_jump);
global.ding = choose(sound_ding1,sound_ding2);
sound_play(music_low);
sound_volume(sound_bite1, 1);
sound_volume(sound_bite2, 1);
hide_mouse();
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
alarm_step();
this.image_speed = (0.125 / this.image_xscale );
this.image_yscale = this.image_xscale;
if (global.start == 1){
//if (global.d3d == 0){
this.image_alpha = 1;
//}
//else
//{
//this.image_alpha = irandom(2) -1;
//};
if (place_meeting(this.x, this.y, obj_food1) || place_meeting(this.x, this.y, obj_food2) || place_meeting(this.x, this.y, obj_food3)){
	this.food = this.food +1;
	this.image_xscale = this.image_xscale + 0.005;
	};
if (this.image_xscale > 1){
	this.image_xscale = 1;
	}
	else
	{
//	this.image_xscale = this.image_xscale + 0.005;
	};
if (this.y > 640){
	this.y = 640
	};
if (this.y == 640 && this.lose == 0){
	instance_create(400,240,obj_init1);
	instance_create(400,240,obj_init2);
	instance_create(0,0,obj_init);
	instance_create(mouse_x,mouse_y,obj_cursor);
	instance_create(400,240,obj_counted);
	this.image_alpha = 0;
	instance_list(obj_armb)[0].image_alpha = 0;
	instance_list(obj_armf)[0].image_alpha = 0;
	this.lose = 1;
	};
if (this.image_xscale != 1){
if (place_meeting(this.x, this.y, obj_whale1) || place_meeting(this.x, this.y, obj_whale2) || place_meeting(this.x, this.y, obj_whale3)){
	this.y = this.yprevious;
	this.jump = 0;
	if (place_meeting(this.x, this.y, obj_whale3)){
	this.y = 336 - 345*this.image_xscale;
	};
	if (place_meeting(this.x, this.y, obj_whale2)){
	this.y = 384 - 345*this.image_xscale;
	};
	if (place_meeting(this.x, this.y, obj_whale1)){
	this.y = 432 - 345*this.image_xscale;
	};
	};
};
if (this.jump == 3 || this.jump == 0){
if (!place_meeting(this.x, this.y, obj_whale1) && !place_meeting(this.x, this.y, obj_whale2) && !place_meeting(this.x, this.y, obj_whale3)){
	this.y = this.y + 32;
	this.acc = 1;
	};
if (this.image_xscale == 1){
	this.y = this.y + 32;
	this.acc = 1;
	};
	};
if (keyboard_check_pressed(vk_space) && this.jump == 0){
	this.jump = 1;	
	alarm[0] = 8;
	sound_play(sound_jump);
	};
if (mouse_check_pressed() && this.jump == 0){
	this.jump = 1;	
	alarm[0] = 8;
	sound_play(sound_jump);
	};
if (this.jump == 1){
	move_towards_point(this.x, 64, (102 / this.acc));
	this.acc = this.acc + 1;
};
};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_body = new __obj_body();

function __obj_armf() {
__instance_init__(this, obj_armf, null, 1, 4, spr_armf, 1, 1);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.image_angle = this.image_angle - ( 36 * instance_list(obj_body)[0].image_speed);
this.x = instance_list(obj_body)[0].x;
this.y = instance_list(obj_body)[0].y;
this.image_xscale = instance_list(obj_body)[0].image_xscale;
this.image_yscale = instance_list(obj_body)[0].image_yscale;
this.image_alpha = instance_list(obj_body)[0].image_alpha;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_armf = new __obj_armf();

function __obj_armb() {
__instance_init__(this, obj_armb, null, 1, 6, spr_armb, 1, 2);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.image_angle = this.image_angle - ( 36 * instance_list(obj_body)[0].image_speed);
this.x = instance_list(obj_body)[0].x;
this.y = instance_list(obj_body)[0].y;
this.image_xscale = instance_list(obj_body)[0].image_xscale;
this.image_yscale = instance_list(obj_body)[0].image_yscale;
this.image_alpha = instance_list(obj_body)[0].image_alpha;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_armb = new __obj_armb();

function __obj_whale1() {
__instance_init__(this, obj_whale1, null, 1, 7, spr_whale, 1, 6);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.y = 432;
this.counted = 0;
this.color = irandom(100);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -16;
if (place_meeting(this.x, this.y, obj_eatmask) && this.counted == 0 && instance_list(obj_body)[0].lose == 0){
	this.counted = 1;
	global.count = global.count +1;
	global.pot = global.pot +1;
	global.pot1 = global.pot1 +1;
	global.pot2 = global.pot2 +1;
	global.pot3 = global.pot3 +1;
	global.pot4 = global.pot4 +1;
	instance_create(0,16,obj_counted);
	sound_play(sound_count);
	sound_play(global.ding);
	};
if (global.d3d == 0){
if (this.color == 1){
	this.sprite_index = spr_stache;
	};
if (this.color == 2){
	this.sprite_index = spr_shark;
	};
if (this.color > 2){
	this.sprite_index = spr_whale;
	};
	}
	else
	{
	this.sprite_index = spr_d3d;
	};
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_whale1 = new __obj_whale1();

function __obj_whale2() {
__instance_init__(this, obj_whale2, null, 1, 10, spr_whale, 1, 7);
this.on_creation = function() {
with(this) {
this.y = 384;
this.subi = 0;
alarm_init(this);
alarm_act[0] = function() {
	this.subi = this.subi + 1;
	alarm[0] = 5;
};
alarm[0] = 5;
this.counted = 0;
this.face = spr_whale;
this.color = irandom(100);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -17;
if (this.subi > 13){
	this.subi = 0;
	};
alarm_step();

if (place_meeting(this.x, this.y, obj_eatmask) && this.counted == 0 && instance_list(obj_body)[0].lose == 0){
	this.counted = 1;
	global.count = global.count +1;
	global.pot = global.pot +1;
	global.pot1 = global.pot1 +1;
	global.pot2 = global.pot2 +1;
	global.pot3 = global.pot3 +1;
	global.pot4 = global.pot4 +1;
	instance_create(0,16,obj_counted);
	sound_play(sound_count);
	sound_play(global.ding);
	};
if (global.d3d == 0){
if (this.color == 1){
	this.face = spr_stache;
	};
if (this.color == 2){
	this.face = spr_shark;
	};
if (this.color > 2){
	this.face = spr_whale;
	};
	}
	else
	{
	this.face = spr_d3d;
	};
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_ext(this.face, this.subi, this.x, this.y, 0.8, 0.8, 0, 1);
}
}
};
}; var obj_whale2 = new __obj_whale2();

function __obj_whale3() {
__instance_init__(this, obj_whale3, null, 1, 13, spr_whale, 1, 8);
this.on_creation = function() {
with(this) {
this.y = 336;
this.subi = 0;
alarm_init(this);
alarm_act[0] = function() {
	this.subi = this.subi + 1;
	alarm[0] = 5;
};
alarm[0] = 5;
this.counted = 0;
this.face = spr_whale;
this.color = irandom(100);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -18;
if (this.subi > 13){
	this.subi = 0;
	};
alarm_step();

if (place_meeting(this.x, this.y, obj_eatmask) && this.counted == 0 && instance_list(obj_body)[0].lose == 0){
	this.counted = 1;
	global.count = global.count +1;
	global.pot = global.pot +1;
	global.pot1 = global.pot1 +1;
	global.pot2 = global.pot2 +1;
	global.pot3 = global.pot3 +1;
	global.pot4 = global.pot4 +1;
	instance_create(0,16,obj_counted);
	sound_play(sound_count);
	sound_play(global.ding);
	};
if (global.d3d == 0){
if (this.color == 1){
	this.face = spr_stache;
	};
if (this.color == 2){
	this.face = spr_shark;
	};
if (this.color > 2){
	this.face = spr_whale;
	};
	}
	else
	{
	this.face = spr_d3d;
	};
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_sprite_ext(this.face, this.subi, this.x, this.y, 0.64, 0.64, 0, 1);
}
}
};
}; var obj_whale3 = new __obj_whale3();

function __obj_whale4() {
__instance_init__(this, obj_whale4, null, 1, 16, spr_whale, 1, 9);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.image_xscale = 0.512;
this.image_yscale = 0.512;
this.y = 288;
this.color = irandom(100);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -19;
if (global.d3d == 0){
if (this.color == 1){
	this.sprite_index = spr_stache;
	};
if (this.color == 2){
	this.sprite_index = spr_shark;
	};
if (this.color > 2){
	this.sprite_index = spr_whale;
	};
	}
	else
	{
	this.sprite_index = spr_d3d;
	};
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_whale4 = new __obj_whale4();

function __obj_whale5() {
__instance_init__(this, obj_whale5, null, 1, 19, spr_whale, 1, 10);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.image_xscale = 0.4096;
this.image_yscale = 0.4096;
this.y = 240;
this.color = irandom(100);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -17;
if (global.d3d == 0){
if (this.color == 1){
	this.sprite_index = spr_stache;
	};
if (this.color == 2){
	this.sprite_index = spr_shark;
	};
if (this.color > 2){
	this.sprite_index = spr_whale;
	};
	}
	else
	{
	this.sprite_index = spr_d3d;
	};
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_whale5 = new __obj_whale5();

function __obj_whale6() {
__instance_init__(this, obj_whale6, null, 1, 22, spr_whale, 0, 11);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.image_xscale = 0.4096;
this.image_yscale = 0.4096;
this.y = 192;
this.color = irandom(100);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -15;
if (global.d3d == 0){
if (this.color == 1){
	this.sprite_index = spr_stache;
	};
if (this.color == 2){
	this.sprite_index = spr_shark;
	};
if (this.color > 2){
	this.sprite_index = spr_whale;
	};
	}
	else
	{
	this.sprite_index = spr_d3d;
	};
	if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_whale6 = new __obj_whale6();

function __obj_whale7() {
__instance_init__(this, obj_whale7, null, 1, 25, spr_whale, 1, 12);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.image_xscale = 0.32768;
this.image_yscale = 0.32768;
this.y = 144;
this.color = irandom(100);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -13;
if (global.d3d == 0){
if (this.color == 1){
	this.sprite_index = spr_stache;
	};
if (this.color == 2){
	this.sprite_index = spr_shark;
	};
if (this.color > 2){
	this.sprite_index = spr_whale;
	};
	}
	else
	{
	this.sprite_index = spr_d3d;
	};
	if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_whale7 = new __obj_whale7();

function __obj_whale8() {
__instance_init__(this, obj_whale8, null, 1, 28, spr_whale, 1, 13);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.image_xscale = 0.262144;
this.image_yscale = 0.262144;
this.y = 96;
this.color = irandom(100);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -11;
if (global.d3d == 0){
if (this.color == 1){
	this.sprite_index = spr_stache;
	};
if (this.color == 2){
	this.sprite_index = spr_shark;
	};
if (this.color > 2){
	this.sprite_index = spr_whale;
	};
	}
	else
	{
	this.sprite_index = spr_d3d;
	};
	if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_whale8 = new __obj_whale8();

function __obj_spawn1() {
__instance_init__(this, obj_spawn1, null, 1, 0, null, 1, 14);
this.on_creation = function() {
with(this) {
alarm_init(this);
alarm_act[0] = function() {
	instance_create(800,240,choose(obj_whale1,obj_whale2,obj_whale3));
	alarm[0] = 32;
};
alarm[0] = -1;
alarm_act[1] = function() {
	instance_create(0, 0, obj_water1);
	instance_create(0, 0, obj_water2);
	instance_create(0, 0, obj_water3);
	instance_create(0, 0, obj_water4);
	instance_create(0, 0, obj_water5);
	instance_create(0, 0, obj_water6);
	instance_create(0, 0, obj_water7);
//	instance_create(instance_list(obj_body)[0].x,240,choose(obj_whale1,obj_whale2,obj_whale3));
};
alarm[1] = 0;
global.count = 0;
alarm_act[2] = function() {
if (global.d3d == 0){
room_background_color_blue = irandom(155) + 100;
room_background_color_red = irandom(155) + 100;
room_background_color_green = irandom(155) + 100;
alarm[2] = 128;
}
else
{
room_background_color_blue = irandom(255);
room_background_color_red = irandom(255);
room_background_color_green = irandom(255);
alarm[2] = 2;
};
};
alarm[2] = 0;
this.start = 0;
this.act = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
alarm_step();
if (global.start == 1 && this.start == 0){
	alarm[0] = 0;
	instance_create(instance_list(obj_body)[0].x,240,choose(obj_whale1,obj_whale2,obj_whale3));
	this.start = 1;
	};
if (global.d3d == 1 && this.act == 0){
	alarm[2] = 0;
	this.act = 1;
	};
if (global.d3d == 0){
	this.act = 0;
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_font(font1);
draw_set_color(250,250,250);
if (global.count < 10 && instance_list(obj_body)[0].lose == 0){
draw_text(24,64,global.count);
};
if (global.count < 10 && instance_list(obj_body)[0].lose == 1){
draw_text(400+16-96,128+64,global.count);
};
if (global.count > 10 || global.count == 10){
	if (instance_list(obj_body)[0].lose == 0){
		draw_text(16,64,global.count);
		};
	if (instance_list(obj_body)[0].lose == 1 && global.count < 100){
		draw_text(400-16-96,128+64,global.count);
		};
	if (instance_list(obj_body)[0].lose == 1 && global.count > 100){
		draw_text(400-48-96,128+64,global.count);
		};
};
}
}
};
}; var obj_spawn1 = new __obj_spawn1();

function __obj_water1() {
__instance_init__(this, obj_water1, null, 1, 9, spr_water, 1, 16);
this.on_creation = function() {
with(this) {
this.image_alpha = 0.5;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_water1 = new __obj_water1();

function __obj_water2() {
__instance_init__(this, obj_water2, null, 1, 12, spr_water, 1, 17);
this.on_creation = function() {
with(this) {
this.image_alpha = 0.5;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_water2 = new __obj_water2();

function __obj_water3() {
__instance_init__(this, obj_water3, null, 1, 15, spr_water, 1, 18);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_water3 = new __obj_water3();

function __obj_water4() {
__instance_init__(this, obj_water4, null, 1, 18, spr_water, 1, 19);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_water4 = new __obj_water4();

function __obj_water5() {
__instance_init__(this, obj_water5, null, 1, 21, spr_lines_front, 1, 20);
this.on_creation = function() {
with(this) {
this.image_speed = 0.05;
this.sprite_index = spr_water;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (global.start == 1){
	this.sprite_index = spr_lines_front;
	};
if (instance_list(obj_body)[0]){
if (instance_list(obj_body)[0].lose == 1){
	this.sprite_index = spr_water;
	};
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_water5 = new __obj_water5();

function __obj_water7() {
__instance_init__(this, obj_water7, null, 1, 27, spr_lines_back, 1, 21);
this.on_creation = function() {
with(this) {
this.image_speed = 0.05;
this.sprite_index = spr_water;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (global.start == 1){
	this.sprite_index = spr_lines_back;
	};
if (instance_list(obj_body)[0]){
if (instance_list(obj_body)[0].lose == 1){
	this.sprite_index = spr_water;
	};
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_water7 = new __obj_water7();

function __obj_water6() {
__instance_init__(this, obj_water6, null, 1, 24, spr_water, 1, 22);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_water6 = new __obj_water6();

function __obj_spawn2() {
__instance_init__(this, obj_spawn2, null, 1, 0, null, 1, 23);
this.on_creation = function() {
with(this) {
alarm_init(this);
alarm_act[0] = function() {
	instance_create(800,240,choose(obj_whale4,obj_whale5,obj_whale6));
	alarm[0] = choose(32,64,128);
};
alarm[0] = 0;
alarm_act[1] = function() {
	instance_create(800,240,choose(obj_whale7,obj_whale8));
	alarm[1] = choose(32,64,128);
};
alarm[1] = 16;
alarm_act[2] = function() {
	instance_create(800,240,obj_whale9);
	alarm[2] = choose(32,64,128);
};
alarm[2] = 32;
global.mark = 0;
global.d3d = 0;
alarm_act[3] = function() {
	global.d3d = 0;
	global.mark = 0;
};
alarm[3] = -1;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
alarm_step();
if (keyboard_check_pressed(vk_o)){
	global.d3d = 1;
	};
if (global.d3d == 1 && global.mark == 0){
	alarm[3] = 8;
	global.mark = 1;
	instance_create(400,240,obj_tentacles);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_spawn2 = new __obj_spawn2();

function __obj_cloud1() {
__instance_init__(this, obj_cloud1, null, 1, 1, spr_clouds, 1, 25);
this.on_creation = function() {
with(this) {
this.image_speed = 0;
this.y = 432;
this.image_index = irandom(4)-1;
this.image_alpha = 0.5;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -15;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_cloud1 = new __obj_cloud1();

function __obj_cloud2() {
__instance_init__(this, obj_cloud2, null, 1, 11, spr_clouds, 1, 26);
this.on_creation = function() {
with(this) {
this.y = 384;
this.image_speed = 0;
this.image_index = irandom(4)-1;
this.image_xscale = 0.8;
this.image_yscale = 0.8;
this.image_alpha = 0.75;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -16;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_cloud2 = new __obj_cloud2();

function __obj_cloud3() {
__instance_init__(this, obj_cloud3, null, 1, 14, spr_clouds, 1, 27);
this.on_creation = function() {
with(this) {
this.y = 336;
this.image_speed = 0;
this.image_index = irandom(4)-1;
this.image_xscale = 0.64;
this.image_yscale = 0.64;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -17;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_cloud3 = new __obj_cloud3();

function __obj_cloud4() {
__instance_init__(this, obj_cloud4, null, 1, 17, spr_clouds, 1, 28);
this.on_creation = function() {
with(this) {
this.y = 288;
this.image_speed = 0;
this.image_index = irandom(4)-1;
this.image_xscale = 0.512;
this.image_yscale = 0.512;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -18;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_cloud4 = new __obj_cloud4();

function __obj_cloud5() {
__instance_init__(this, obj_cloud5, null, 1, 20, spr_clouds, 1, 29);
this.on_creation = function() {
with(this) {
this.image_speed = 0;
this.y = 240;
this.image_index = irandom(4)-1;
this.image_xscale = 0.4096;
this.image_yscale = 0.4096;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -16;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_cloud5 = new __obj_cloud5();

function __obj_cloud6() {
__instance_init__(this, obj_cloud6, null, 1, 23, spr_clouds, 1, 30);
this.on_creation = function() {
with(this) {
this.image_speed = 0;
this.y = 192;
this.image_index = irandom(4)-1;
this.image_xscale = 0.32768;
this.image_yscale = 0.32768;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -14;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_cloud6 = new __obj_cloud6();

function __obj_cloud7() {
__instance_init__(this, obj_cloud7, null, 1, 26, spr_clouds, 1, 31);
this.on_creation = function() {
with(this) {
this.image_speed = 0;
this.y = 144;
this.image_index = irandom(4)-1;
this.image_xscale = 0.262144;
this.image_yscale = 0.262144;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -12;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_cloud7 = new __obj_cloud7();

function __obj_cloud8() {
__instance_init__(this, obj_cloud8, null, 1, 29, spr_clouds, 1, 32);
this.on_creation = function() {
with(this) {
this.image_speed = 0;
this.y = 96;
this.image_index = irandom(4)-1;
this.image_xscale = 0.2097152;
this.image_yscale = 0.2097152;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -10;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_cloud8 = new __obj_cloud8();

function __obj_spawn3() {
__instance_init__(this, obj_spawn3, null, 1, 0, null, 1, 33);
this.on_creation = function() {
with(this) {
alarm_init(this);
alarm_act[0] = function() {
	instance_create(800,240,choose(obj_cloud4,obj_cloud5,obj_cloud6));
	alarm[0] = choose(32,64,128);
};
alarm[0] = 0;
alarm_act[1] = function() {
	instance_create(800,240,choose(obj_cloud7,obj_cloud8));
	alarm[1] = choose(32,64,128);
};
alarm[1] = 16;
alarm_act[2] = function() {
	instance_create(800,240,choose(obj_cloud1,obj_cloud2,obj_cloud3));
	alarm[2] = choose(32,64,128);
};
alarm[2] = 32;
alarm_act[3] = function() {
	instance_create(800,240,obj_cloud9);
	alarm[3] = choose(32,64,128);
};
alarm[3] = 32;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
alarm_step();
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_spawn3 = new __obj_spawn3();

function __obj_food1() {
__instance_init__(this, obj_food1, null, 1, 6, spr_food, 1, 35);
this.on_creation = function() {
with(this) {
image_index = irandom(3)-1;
image_speed = 0;
this.y = 400;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -16;
this.image_angle = (this.image_angle + 8);
if (place_meeting(this.x, this.y, obj_eatmask) && global.start == 1){
	instance_destroy(this);
	if (!instance_list(obj_init)[0]){
	global.d3d = 1;
	};
	sound_play(choose(sound_bite1,sound_bite2));
	};
	if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_food1 = new __obj_food1();

function __obj_spawn4() {
__instance_init__(this, obj_spawn4, null, 1, 0, null, 1, 36);
this.on_creation = function() {
with(this) {
alarm_init(this);
alarm_act[0] = function() {
	instance_create(800,240,choose(obj_food1, obj_food2, obj_food3));
	alarm[0] = choose(40,60,80,120) / (4 * instance_list(obj_body)[0].image_xscale * 8);
};
alarm[0] = 120;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
alarm_step();
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
//draw_text(32,128,instance_list(obj_body)[0].food);
}
}
};
}; var obj_spawn4 = new __obj_spawn4();

function __obj_food2() {
__instance_init__(this, obj_food2, null, 1, 10, spr_food, 1, 38);
this.on_creation = function() {
with(this) {
image_index = irandom(3)-1;
image_speed = 0;
this.y = 272;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -16;
this.image_angle = (this.image_angle + 6);
if (place_meeting(this.x, this.y, obj_eatmask) && global.start == 1){
	instance_destroy(this);
	if (!instance_list(obj_init)[0]){
	global.d3d = 1;
	};
	sound_play(choose(sound_bite1,sound_bite2));
	};
	if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_food2 = new __obj_food2();

function __obj_food3() {
__instance_init__(this, obj_food3, null, 1, 13, spr_food, 1, 39);
this.on_creation = function() {
with(this) {
image_index = irandom(3)-1;
image_speed = 0;
this.y = 144;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -16;
this.image_angle = (this.image_angle + 4);
if (place_meeting(this.x, this.y, obj_eatmask) && global.start == 1){
	instance_destroy(this);
	if (!instance_list(obj_init)[0]){
	global.d3d = 1;
	};
	sound_play(choose(sound_bite1,sound_bite2));
	};
	if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_food3 = new __obj_food3();

function __obj_eatmask() {
__instance_init__(this, obj_eatmask, null, 0, 12, spr_food, 1, 40);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = instance_list(obj_body)[0].x;
this.y = instance_list(obj_body)[0].y;
this.image_xscale = 18 * instance_list(obj_body)[0].image_xscale;
this.image_yscale = 18 * instance_list(obj_body)[0].image_yscale;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_eatmask = new __obj_eatmask();

function __obj_counter() {
__instance_init__(this, obj_counter, null, 1, 1, spr_counter, 1, 42);
this.on_creation = function() {
with(this) {
this.y = 16;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (instance_list(obj_body)[0].lose == 0){
if (global.count < 10){
this.x = 0+96;
};
if (global.count > 10 || global.count == 10){
	if (global.count < 100){
	this.x = 24+96;
	};
	if (global.count > 100 || global.count == 100){
		if (global.count < 1000){
		this.x = 64+96;
		};
		if (global.count > 1000 || global.count == 1000){
		this.x = 104+96;
		};
	};
};
}
else
{
this.y = 128+16;
this.x = 400;
};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_counter = new __obj_counter();

function __obj_counted() {
__instance_init__(this, obj_counted, null, 1, 0, spr_counted, 1, 44);
this.on_creation = function() {
with(this) {
this.y = 16;
alarm_init(this);
alarm[0] = 8;
alarm_act[0] = function() {
	instance_destroy(this);
};
this.image_speed = 0.75;
this.image_alpha = 0.95;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = instance_list(obj_counter)[0].x;
this.y = instance_list(obj_counter)[0].y;
alarm_step();
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_counted = new __obj_counted();

function __obj_trophy0() {
__instance_init__(this, obj_trophy0, null, 1, 20, spr_flowers, 1, 45);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.image_xscale = 0.4096;
this.image_yscale = 0.4096;
this.y = 216;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -13;
this.image_angle = this.image_angle - 16;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_trophy0 = new __obj_trophy0();

function __obj_intro() {
__instance_init__(this, obj_intro, null, 1, 2, spr_intro, 1, 48);
this.on_creation = function() {
with(this) {
this.image_speed = 0.05;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_intro = new __obj_intro();

function __obj_spawn1_intro() {
__instance_init__(this, obj_spawn1_intro, null, 1, 0, null, 1, 50);
this.on_creation = function() {
with(this) {
alarm_init(this);
alarm_act[0] = function() {
	instance_create(0, 0, obj_water1);
	instance_create(0, 0, obj_water2);
	instance_create(0, 0, obj_water3);
	instance_create(0, 0, obj_water4);
	instance_create(0, 0, obj_water5);
	instance_create(0, 0, obj_water6);
	instance_create(0, 0, obj_water7);
};
alarm[0] = 0;
global.count = 0;
alarm_act[1] = function() {
room_background_color_blue = irandom(155) + 100;
room_background_color_red = irandom(155) + 100;
room_background_color_green = irandom(155) + 100;
alarm[1] = 128;
};
alarm[1] = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
alarm_step();
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_spawn1_intro = new __obj_spawn1_intro();

function __obj_but() {
__instance_init__(this, obj_but, null, 1, 1, spr_but, 1, 52);
this.on_creation = function() {
with(this) {
this.image_alpha = 0.8;
this.image_speed = 0.05;
this.ding = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (keyboard_check(vk_space) || mouse_check()){
	room_goto_next();
	};
if (position_meeting(mouse_x,mouse_y,this)){
	this.image_alpha = 0.95;
	if (this.ding == 0){
	this.ding = 1;
	sound_play(sound_ding);
	};
	}
	else
	{
	this.image_alpha = 0.8;
	this.ding = 0;
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_but = new __obj_but();

function __obj_init1() {
__instance_init__(this, obj_init1, null, 1, 0, spr_but, 1, 54);
this.on_creation = function() {
with(this) {
this.image_speed = 0.05;
//this.x = choose(256,544);
this.x = 256;
this.y = 320;
this.ding = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (mouse_check() && position_meeting(mouse_x,mouse_y,this)){
	room_goto(scene_1);
	};
if (position_meeting(mouse_x,mouse_y,this)){
	this.image_alpha = 0.95;
	if (this.ding == 0){
	this.ding = 1;
	sound_play(sound_ding);
	};
	}
	else
	{
	this.image_alpha = 0.8;
	this.ding = 0;
	};
this.image_yscale = this.image_xscale;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_init1 = new __obj_init1();

function __obj_init2() {
__instance_init__(this, obj_init2, null, 1, 0, spr_mg, 1, 55);
this.on_creation = function() {
with(this) {
this.image_speed = 0.05;
this.image_index = 1;
this.y = 320;
this.ding = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (mouse_check() && position_meeting(mouse_x,mouse_y,this)){
//	room_goto_next();
	window.location.href = 'https://www.facebook.com/whalerunner';
	};
if (position_meeting(mouse_x,mouse_y,this)){
	this.image_alpha = 0.95;
	if (this.ding == 0){
	this.ding = 1;
	sound_play(sound_ding);
	};
	}
	else
	{
	this.image_alpha = 0.8;
	this.ding = 0;
	};
this.image_yscale = this.image_xscale;

if (instance_list(obj_init1)[0].x == 256){
	this.x = 544;
	};
if (instance_list(obj_init1)[0].x == 544){
	this.x = 256;
	};
	
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_init2 = new __obj_init2();

function __obj_init() {
__instance_init__(this, obj_init, null, 1, 2, spr_init, 1, 56);
this.on_creation = function() {
with(this) {
this.image_alpha = 0.95;
sound_play(sound_gameover);
sound_stop(music_low);
sound_volume(sound_bite1,0);
sound_volume(sound_bite2,0);
global.d3d = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_init = new __obj_init();

function __obj_spawn5() {
__instance_init__(this, obj_spawn5, null, 1, 0, null, 1, 57);
this.on_creation = function() {
with(this) {
this.saddle = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (global.pot > 19){
	instance_create(800,240,obj_trophy0);
	sound_play(sound_trophy);
	global.pot = 0;
	};
if (global.pot1 > 39){
	instance_create(800,240,obj_trophy1);
	sound_play(sound_trophy);
	global.pot1 = 0;
	};
if (global.count == 10 && this.saddle == 0){
	instance_create(800,240,obj_trophy2);
	sound_play(sound_trophy);
	this.saddle = 1;
	};
if (global.pot2 > 29){
	instance_create(800,240,obj_trophy3);
	sound_play(sound_trophy);
	global.pot2= 0;
	};
if (global.pot3 > 49){
	instance_create(800,240,obj_trophy4);
	sound_play(sound_trophy);
	global.pot3= 0;
	};
if (global.pot4 > 99){
	instance_create(800,240,obj_trophy5);
	sound_play(sound_trophy);
	global.pot4= 0;
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_spawn5 = new __obj_spawn5();

function __obj_title() {
__instance_init__(this, obj_title, null, 1, 3, spr_title, 1, 59);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_title = new __obj_title();

function __obj_jump1() {
__instance_init__(this, obj_jump1, null, 1, 1, spr_cursor, 1, 61);
this.on_creation = function() {
with(this) {
this.image_speed = 0.1;
this.y = this.y +16;
this.x = this.x +32;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (mouse_check_pressed() || keyboard_check_pressed(vk_space)){
	instance_destroy(this);
	global.start = 1;
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_jump1 = new __obj_jump1();

function __obj_jump2() {
__instance_init__(this, obj_jump2, null, 1, 2, spr_device, 1, 62);
this.on_creation = function() {
with(this) {
this.image_speed = 0.05;
this.x = this.x +32;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (mouse_check_pressed() || keyboard_check_pressed(vk_space)){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_jump2 = new __obj_jump2();

function __obj_jump3() {
__instance_init__(this, obj_jump3, null, 1, 3, spr_jump, 1, 63);
this.on_creation = function() {
with(this) {
this.image_speed = 0.05;
this.x = this.x +32;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (mouse_check_pressed() || keyboard_check_pressed(vk_space)){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_jump3 = new __obj_jump3();

function __obj_jump4() {
__instance_init__(this, obj_jump4, null, 1, 4, null, 1, 67);
this.on_creation = function() {
with(this) {
this.x = 0;
this.y = 0;
this.sprite_index = spr_jump4;
this.image_alpha = 0.8;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (mouse_check_pressed() || keyboard_check_pressed(vk_space)){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_jump4 = new __obj_jump4();

function __obj_whale9() {
__instance_init__(this, obj_whale9, null, 1, 30, spr_whale, 1, 69);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.image_xscale = 0.2097152;
this.image_yscale = 0.2097152;
this.y = 48;
this.color = irandom(100);
this.image_alpha = 0.8;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -9;
if (global.d3d == 0){
if (this.color == 1){
	this.sprite_index = spr_stache;
	};
if (this.color == 2){
	this.sprite_index = spr_shark;
	};
if (this.color > 2){
	this.sprite_index = spr_whale;
	};
	}
	else
	{
	this.sprite_index = spr_d3d;
	};
	if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_whale9 = new __obj_whale9();

function __obj_cloud9() {
__instance_init__(this, obj_cloud9, null, 1, 31, spr_clouds, 1, 70);
this.on_creation = function() {
with(this) {
this.image_speed = 0;
this.y = 48;
this.image_index = irandom(4)-1;
this.image_xscale = 0.2097152;
this.image_yscale = 0.2097152;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -12;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_cloud9 = new __obj_cloud9();

function __obj_trophy1() {
__instance_init__(this, obj_trophy1, null, 1, 20, spr_tardis, 1, 71);
this.on_creation = function() {
with(this) {
this.image_speed = 0.6;
this.image_xscale = 0.4096;
this.image_yscale = 0.4096;
this.y = 216;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -13;
if (position_meeting(mouse_x,mouse_y,this) && mouse_check()){
	global.d3d = 1;
	};
	if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_trophy1 = new __obj_trophy1();

function __obj_trophy2() {
__instance_init__(this, obj_trophy2, null, 1, 20, spr_saddle, 1, 72);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.image_xscale = 0.4096;
this.image_yscale = 0.4096;
this.y = 216;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -13;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_trophy2 = new __obj_trophy2();

function __obj_trophy3() {
__instance_init__(this, obj_trophy3, null, 1, 20, spr_killer, 1, 73);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.image_xscale = 0.4096;
this.image_yscale = 0.4096;
this.y = 216;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -13;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_trophy3 = new __obj_trophy3();

function __obj_trophy4() {
__instance_init__(this, obj_trophy4, null, 1, 20, spr_jake, 1, 74);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.image_xscale = 0.4096;
this.image_yscale = 0.4096;
this.y = 216;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -13;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_trophy4 = new __obj_trophy4();

function __obj_trophy5() {
__instance_init__(this, obj_trophy5, null, 1, 20, spr_bison, 1, 75);
this.on_creation = function() {
with(this) {
this.image_speed = 0.2;
this.image_xscale = 0.4096;
this.image_yscale = 0.4096;
this.y = 216;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.x = this.x -13;
if (this.x < -800){
	instance_destroy(this);
	};
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_trophy5 = new __obj_trophy5();

function __obj_tentacles() {
__instance_init__(this, obj_tentacles, null, 1, 25, spr_tentacles, 1, 76);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if (global.d3d == 0){
	instance_destroy(this);
	};
this.image_angle = this.image_angle +0.5;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_tentacles = new __obj_tentacles();

function __obj_cursor() {
__instance_init__(this, obj_cursor, null, 1, 0, spr_cursor, 1, 77);
this.on_creation = function() {
with(this) {
this.image_xscale = 0.32;
this.image_yscale = 0.32;
hide_mouse();
this.image_speed = 0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
this.y = mouse_y;
this.x = mouse_x;
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var obj_cursor = new __obj_cursor();



/***********************************************************************
 * SCENES
 ***********************************************************************/
function __scene_0() { 
this.tiles = [
];
this.objects = [
[{o:obj_spawn2, x:0, y:200}],
[{o:obj_spawn3, x:0, y:400}],
[{o:obj_intro, x:300, y:300}],
[{o:obj_spawn1_intro, x:0, y:0}],
[{o:obj_but, x:500, y:350}],
[{o:obj_title, x:0, y:0}],
[{o:obj_cursor, x:140, y:280}]];
this.start = function() {
__room_start__(this, scene_0, 800, 480, 30, 0, 0, 0, null, 0, 0, 0, 800, 480, null, 50, 50);
};
}
var scene_0 = new __scene_0();
tu_scenes.push(scene_0);
function __scene_1() { 
this.tiles = [
];
this.objects = [
[{o:obj_body, x:400, y:240}],
[{o:obj_armf, x:500, y:330}],
[{o:obj_armb, x:360, y:240}],
[{o:obj_spawn1, x:20, y:20}],
[{o:obj_spawn2, x:40, y:20}],
[{o:obj_spawn3, x:60, y:20}],
[{o:obj_spawn4, x:80, y:20}],
[{o:obj_eatmask, x:40, y:60}],
[{o:obj_counter, x:0, y:220}],
[{o:obj_spawn5, x:100, y:50}],
[{o:obj_jump1, x:500, y:300}],
[{o:obj_jump2, x:500, y:300}],
[{o:obj_jump3, x:250, y:150}],
[{o:obj_jump4, x:0, y:100}]];
this.start = function() {
__room_start__(this, scene_1, 800, 480, 30, 255, 0, 0, null, 0, 0, 0, 800, 480, obj_body, 240, 240);
};
}
var scene_1 = new __scene_1();
tu_scenes.push(scene_1);
tu_room_to_go = scene_0;


/***********************************************************************
 * CUSTOM GLOBAL VARIABLES
 ***********************************************************************/


/***********************************************************************
 * CUSTOM GLOBAL FUNCTIONS
 ***********************************************************************/



tu_gameloop = tu_loop;
tu_loop();
function tu_fpssloop() {
  fps = fpss;
  fpss = 0;
}
setInterval(tu_fpssloop, 1000);