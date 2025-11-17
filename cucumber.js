module.exports = {
  default: {
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: ['src/support/world.ts', 'src/support/hooks.ts', 'src/steps/**/*.ts'],
    format: ['progress', 'html:reports/cucumber/index.html', 'json:reports/cucumber/report.json'],
    publishQuiet: true,
    parallel: 2,
    paths: ['features/**/*.feature'],
    tags: 'not @wip',
  },
};
