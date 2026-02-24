module.exports = {
  default: {
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: ['src/support/world.ts', 'src/support/hooks.ts', 'src/steps/*.ts'],
    format: ['progress', 'summary', 'html:reports/cucumber/index.html', 'json:reports/cucumber/report.json', 'allure-cucumberjs/reporter'],
    formatOptions: { resultsDir: "allure-results"},
    publishQuiet: true,
    parallel: 1,
    paths: ['features/**/*.feature'],
    tags: 'not @wip',
  },
};
