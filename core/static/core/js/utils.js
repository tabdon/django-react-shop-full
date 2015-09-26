// Contains various extension and helper methods

/* Polyfils and Extension methods */

// String.prototype.format
// replaces colon prefixed words with values from mapping parameter
// e.g.
// var url = '/api/entity/:entity_id/'.format({entity_id: '134'})
// url === '/api/entity/134/';

if (!String.prototype.format) {
	String.prototype.format = function(mapping) {
		var str = this;
		for (var key in mapping) {
			if (mapping.hasOwnProperty(key)) {
				var r = new RegExp(':' + key.toString());
				str = str.replace(r, mapping[key]);
			}
		}	

		return str;
	};
}

if (!String.prototype.parseUrl) {
	String.prototype.parseUrl = function() {
	    /* http://james.padolsey.com/javascript/parsing-urls-with-the-dom/ */
	    var a = document.createElement('a');
		var url = this;
	    a.href = url;
	    return {
	        source: url,
	        protocol: a.protocol.replace(':', ''),
	        host: a.hostname,
	        port: a.port,
	        query: a.search,
	        params: (function () {
	            var ret = {},
	                seg = a.search.replace(/^\?/, '').split('&'),
	                len = seg.length, i = 0, s;
	            for (; i < len; i++) {
	                if (!seg[i]) {
	                    continue;
	                }
	                s = seg[i].split('=');
	                ret[s[0]] = s[1];
	            }
	            return ret;
	        })(),
	        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
	        hash: a.hash.replace('#', ''),
	        path: a.pathname.replace(/^([^\/])/, '/$1'),
	        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
	        segments: a.pathname.replace(/^\//, '').split('/')
	    };	
	};
};

// Array.prototype.chunk
// splits array into multi-dimensional array of N groups
// e.g.
// var groups = [1,2,3,4,5,6].chunk(2);
// groups[0] === [1,2,3];
// groups[1] === [4,5,6];

if (!Array.prototype.chunk) {
	Array.prototype.chunk = function(chunkSize) {
	    var len = this.length,out = [], i = 0;
	    while (i < len) {
	        var size = Math.ceil((len - i) / chunkSize--);
	        out.push(this.slice(i, i += size));
	    }
	    return out;
	};
}