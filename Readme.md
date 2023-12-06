# Visual Regression Testing (Golden Tests)

## Playwright Visual comparisons

### Run all tests
```
npx playwright test
```

### Update snapshots
```
npx playwright test --update-snapshots
```

### Screenshot arguements
https://playwright.dev/docs/screenshots

### Snapshot assertion
https://playwright.dev/docs/api/class-snapshotassertions

### Tutorials
* https://www.browserstack.com/guide/visual-regression-testing-using-playwright
* https://www.lambdatest.com/learning-hub/playwright-visual-regression-testing
* https://www.createit.com/blog/percy-ai-visual-regressions-playwright-example

## Percy

### Setting up Percy token

UNIX
```
export PERCY_TOKEN="web_891eff4d9e92b4c661498026a20a58e708f023c6b89ac4db889e8b95b55423dc"
```

Windows PowerShell
```
$Env:PERCY_TOKEN="web_891eff4d9e92b4c661498026a20a58e708f023c6b89ac4db889e8b95b55423dc"
```

Windows CMD
```
set PERCY_TOKEN="web_891eff4d9e92b4c661498026a20a58e708f023c6b89ac4db889e8b95b55423dc"
```

Troubleshoot
```
echo $Env:PERCY_TOKEN
```

### Setting up Percy
```
npx percy config:create
```

### Execute Single Test
```
npx percy exec -- node tests\percy.spec.ts
```

### percySnapshot() Documentation
https://www.browserstack.com/docs/percy/take-percy-snapshots/snapshots-via-scripts

## Playwright

### Debug
```
npx playwright test --debug
```

### Open Test Report
```
npx playwright show-report
```