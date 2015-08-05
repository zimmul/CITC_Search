
var FilePatterns = {
	gruntFiles: ['Gruntfile.js', 'file_patterns.js'],

	thirdPartyJavascript: [
		'app/bower_components/jquery/dist/jquery.js',
		'app/bower_components/angular/angular.js',
		'app/bower_components/datatables/media/js/jquery.dataTables.js',
		'app/bower_components/angular-datatables/dist/angular-datatables.js',
		'app/bower_components/angular-route/angular-route.js',
		'app/bower_components/angular-resource/angular-resource.js',
		'app/bower_components/angular-loader/angular-loader.js',
		'app/bower_components/angular-mocks/angular-mocks.js',
		'app/bower_components/angular-animate/angular-animate.js',
		'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'app/bower_components/angularjs-camelCase-human/camelCaseToHuman.js',
		'app/bower_components/bootstrap/dist/js/bootstrap.js'
	],

	thirdPartyCSS: [
		'app/bower_components/datatables/media/css/jquery.dataTables.css',
		'app/bower_components/bootstrap/dist/css/bootstrap.min.css'
	],

	thirdPartyFonts: [
		'app/bower_components/bootstrap/fonts/**'
	],

	source: [
		'app/app.js',
		'app/**/*-module.js',
		'app/**/*.js',
		'!app/bower_components/**/*'
	],

	sourceHtml: [
		'app/**/*.html'
	]

};

var FilePatternsInterface = {
	javascript: {
		jshint: FilePatterns.source.concat(FilePatterns.gruntFiles, FilePatterns.specs),
		concat: FilePatterns.source,
		concatDeps: FilePatterns.thirdPartyJavascript,
		concatDepsCSS: FilePatterns.thirdPartyCSS
	},
	html: FilePatterns.sourceHtml,
	fonts: FilePatterns.thirdPartyFonts
};

module.exports.FilePatterns = FilePatternsInterface;
