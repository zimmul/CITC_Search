
var FilePatterns = {
	gruntFiles: ['Gruntfile.js', 'file_patterns.js'],

	thirdPartyJavascript: [
        'src/bower_components/jquery/dist/jquery.js',
        'src/bower_components/angular/angular.js',
		'src/bower_components/datatables/media/js/jquery.dataTables.js',
		'src/bower_components/angular-datatables/dist/angular-datatables.js',
		'src/bower_components/angular-resource/angular-resource.js',
		'src/bower_components/angular-route/angular-route.js',
		'src/bower_components/angular-animate/angular-animate.js'
	],

	thirdPartyCSS: [
		'src/bower_components/datatables/media/css/jquery.dataTables.css',
		'src/bower_components/angular-block-ui/dist/angular-block-ui.css',
		'src/bower_components/dex-bootstrap-ui/globals/css/bootstrap/3.3.1/bootstrap.css',
		'src/bower_components/dex-bootstrap-ui/globals/css/core/1.0.0/core-dex.css',
		'src/bower_components/dex-bootstrap-ui/globals/css/jquery-ui/1.9.2/polaris-theme/jquery-ui-1.9.2.custom.min.css'
	],

	source: [
		'src/app/app.js',
		'src/app/**/*-module.js',
		'src/app/**/*.js'
	]

};

var FilePatternsInterface = {
	javascript: {
		jshint: FilePatterns.source.concat(FilePatterns.gruntFiles, FilePatterns.specs),
		concat: FilePatterns.source,
		concatDeps: FilePatterns.thirdPartyJavascript,
		concatDepsCSS: FilePatterns.thirdPartyCSS
	}
};

module.exports.FilePatterns = FilePatternsInterface;
