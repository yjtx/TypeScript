///<reference path='fourslash.ts' />
///<reference path='harness.ts'/>
///<reference path='runnerbase.ts' />

class BenchmarkRunner extends RunnerBase {

    public basePath = 'tests/cases/benchmark';

    constructor() {
        super();
    }

    public initializeTests() {
        if (this.tests.length === 0) {
            this.tests = this.enumerateFiles(this.basePath, /\.ts/i);
        }

        // These testcases are based on fourslash but reference a file to invoke the command on
        // instead of containing the file in the testcase. This makes it easier to re-use the same file for
        // a couple of different scenarios and makes maintenance easier. This should be limited to 'large' 
        // files where updating the content would be time consuming

        describe('Run Benchmarks', () => {
            this.tests.forEach((file: string) => {
                file = ts.normalizeSlashes(file);
                var justName = file.replace(/^.*[\\\/]/, '');

                // Convert to relative path
                var testIndex = file.indexOf('tests/');
                if (testIndex >= 0) { file = file.substr(testIndex); }

                if (justName && !justName.match(/fourslash\.ts$/i) && !justName.match(/\.d\.ts$/i)) {
                    it('FourSlash test ' + justName + ' runs correctly', function () {
                        FourSlash.runFourSlashTest(file);
                    });
                }
            });
        });
    }
}